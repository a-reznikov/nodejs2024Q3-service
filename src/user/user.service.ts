import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { getCurrentDate } from 'src/utils/date';
import { User } from './entities/user.entity';
import { findEntityById } from 'src/helpers/findEntity';
import { removeEntityById } from 'src/helpers/removeEntity';
import { compare, hash } from 'bcrypt';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  async create(createUserDto: CreateUserDto) {
    const foundedUser = this.users.find(
      (user) => user.login === createUserDto.login,
    );

    if (foundedUser) {
      throw new ConflictException(
        `User with login ${createUserDto.login} already exists`,
      );
    }

    const currentDate = getCurrentDate();

    const hashedPassword = await hash(
      createUserDto.password,
      Number(process.env.CRYPT_SALT),
    );

    const newUser: User = {
      id: uuidv4(),
      login: createUserDto.login,
      password: hashedPassword,
      version: 1,
      createdAt: currentDate,
      updatedAt: currentDate,
    };

    this.users.push(newUser);

    return newUser;
  }

  async findAll() {
    return this.users;
  }

  async findOne(id: string) {
    const foundedUser = await findEntityById<User>('User', id, this.users);

    return foundedUser;
  }

  async findByLogin(login: string) {
    const foundedUser = this.users.find((user) => user.login === login);

    if (!foundedUser) {
      throw new NotFoundException(`User with login: ${login} not found`);
    }

    return foundedUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const foundedUser = await this.findOne(id);

    const isValidPassword = await compare(
      updateUserDto.oldPassword,
      foundedUser.password,
    );

    if (!isValidPassword) {
      throw new ForbiddenException('OldPassword is wrong');
    }

    const hashedPassword = await hash(
      updateUserDto.newPassword,
      Number(process.env.CRYPT_SALT),
    );

    foundedUser.password = hashedPassword;
    foundedUser.version += 1;
    foundedUser.updatedAt = getCurrentDate();

    return foundedUser;
  }

  async remove(id: string) {
    return await removeEntityById('User', id, this.users);
  }
}
