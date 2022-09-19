import { Injectable } from '@nestjs/common';
import { VerificationsRepository } from './verification.repository';

@Injectable()
export class VerificationService {
  constructor(private verificationsRepository: VerificationsRepository) {}
  getVerifications(){
    return
  }

  verify() {
    return 'This action adds a new verification';
  }

  unverify(id: number) {
    return `This action removes a #${id} verification`;
  }
}
