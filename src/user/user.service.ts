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

@Injectable()
export class UserService {
  private readonly users: User[] = [];

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
    const foundedUser = findEntityById<User>(id, this.users);

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
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new NotFoundException(`User with ID: ${id} not found`);
    }

    this.users.splice(userIndex, 1);
    return `User has been deleted`;
  }
}
