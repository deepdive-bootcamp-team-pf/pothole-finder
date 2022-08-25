import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PotholeModule } from './pothole/pothole.module';
import { VerificationModule } from './verification/verification.module';

@Module({
  imports: [AuthModule, PotholeModule, VerificationModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
