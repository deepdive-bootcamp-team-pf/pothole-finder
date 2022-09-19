import { Module } from '@nestjs/common';
import { PotholeService } from './pothole.service';
import { PotholeController } from './pothole.controller';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';
import { PotholeRepository } from './pothole.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([PotholeRepository]), AuthModule],
  controllers: [PotholeController],
  providers: [PotholeService]
})
export class PotholeModule {}
