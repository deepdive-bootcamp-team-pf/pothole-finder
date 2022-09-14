import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CustomRepository } from 'src/database/typeorm-ex.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, email } = createUserDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      username,
      password: hashedPassword,
      email,
    });
    try {
      await this.save(user);
      return user;
    } catch (e){
      if (e.code === '23505') {
        throw new ConflictException('Username or Email already exists.')
      } else {
        throw new InternalServerErrorException()
      }
    }
  }
}
