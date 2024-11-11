import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { getCurrentDate } from 'src/utils/date';
import { User } from './entities/user.entity';

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

    this.users.push({
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: currentDate,
      updatedAt: currentDate,
    });

    return newUser;
  }

  async findAll() {
    return this.users;
  }

  findOne(id: number) {
    return `Find user by ID. User #${id}`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `Update user by ID. User #${id}, data: ${updateUserDto}`;
  }

  remove(id: number) {
    return `Delete user by ID. User #${id}`;
  }
}
