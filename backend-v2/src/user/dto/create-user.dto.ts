import { IsEmail, IsNotEmpty } from 'class-validator';
import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials.dto';

export class CreateUserDto extends AuthCredentialsDto {
  @IsNotEmpty() @IsEmail() email: string;
}
