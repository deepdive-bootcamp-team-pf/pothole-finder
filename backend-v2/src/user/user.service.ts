import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  getUsers(): Promise<User[]> {
    return this.userRepository.getUsers();
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID:${id} not found.`);
    }

    return { id: user.id, email: user.email, username: user.username };
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    const { username, password } = updateUserDto;

    if (!user) {
      throw new NotFoundException(`User ${id} not found.`);
    }

    user.username = username;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;

    await this.userRepository.save(user);

    return user;
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID:${id} not found.`);
    }

    await this.userRepository.delete({
      id,
    });

    return 'User deleted.';
  }
}
