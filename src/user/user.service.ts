import {
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

@Injectable()
export class UserService {
  private readonly users: User[] = [
    {
      id: '966ee829-b617-4ce7-a081-9febe03a082e',
      login: 'string',
      password: 'string',
      version: 1,
      createdAt: 1732557982319,
      updatedAt: 1732557982319,
    },
  ];

  async create(createUserDto: CreateUserDto) {
    const currentDate = getCurrentDate();

    const newUser: User = {
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
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

    if (foundedUser.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException('OldPassword is wrong');
    }

    foundedUser.password = updateUserDto.newPassword;
    foundedUser.version += 1;
    foundedUser.updatedAt = getCurrentDate();

    return foundedUser;
  }

  async remove(id: string) {
    return await removeEntityById('User', id, this.users);
  }
}
