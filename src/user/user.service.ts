import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    return `Create user with ${createUserDto}`;
  }

  findAll() {
    return [];
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
