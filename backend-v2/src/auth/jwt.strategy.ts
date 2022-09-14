import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersRepository: UserRepository,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET_KEY'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
    });
  }

  async validate(payload: JwtPayload): Promise<User>{
    const { username } = payload;
    const user = await this.usersRepository.findOne({
      where: {
        username: username
      }
    })
    if (!user) {
      throw new UnauthorizedException()
    }
    return user;
  }
}
