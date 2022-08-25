import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TypeOrmExModule } from './database/typeorm-ex.module';
import { PotholeModule } from './pothole/pothole.module';
import { PotholeRepository } from './pothole/pothole.repository';
import { VerificationModule } from './verification/verification.module';

@Module({
  imports: [
    AuthModule,
    PotholeModule,
    VerificationModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('MYSQL_HOST'),
        port: configService.get('MYSQL_PORT'),
        username: configService.get('MYSQL_USER'),
        password: configService.get('MYSQL_PASSWORD'),
        database: configService.get('MYSQL_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    TypeOrmExModule.forCustomRepository([PotholeRepository]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
