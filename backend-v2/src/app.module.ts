import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TypeOrmExModule } from './database/typeorm-ex.module';
import { PotholeModule } from './pothole/pothole.module';
import { PotholeRepository } from './pothole/pothole.repository';
import { UserModule } from './user/user.module';
import { UserRepository } from './user/user.repository';
import { VerificationModule } from './verification/verification.module';

@Module({
  imports: [
    AuthModule,
    PotholeModule,
    UserModule,
    VerificationModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['../dev.env'],
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    TypeOrmExModule.forCustomRepository([PotholeRepository, UserRepository]),
  ],
})
export class AppModule {}
