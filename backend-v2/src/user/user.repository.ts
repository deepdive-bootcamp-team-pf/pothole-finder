import {
  HttpException,
  HttpStatus,
} from '@nestjs/common';
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

    const user: User = this.create({
      username,
      password: hashedPassword,
      email,
    });

    const existingUser = await this.checkUserExistence(user);

    if (existingUser == null) {
      await this.save(user);
      return user;
    }
  }

  async checkUserExistence(createUserDto: CreateUserDto): Promise<User> {
    const { email, username } = createUserDto;

    const existingEmail = await this.findOne({where:{email}})
    const existingUsername = await this.findOne({where:{username}})

    let property;

    if (existingEmail != null) {
      property = 'email';
      throw new HttpException(
        'User with the same ' + property + ' already exists.',
        HttpStatus.CONFLICT,
      );
    }

    else if (existingUsername != null) {
      property = 'username';
      throw new HttpException(
        'User with the same ' + property + ' already exists.',
        HttpStatus.CONFLICT,
      );
    }
    return;
  }
}
