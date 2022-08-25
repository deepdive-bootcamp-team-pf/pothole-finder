import { Injectable } from '@nestjs/common';

@Injectable()
export class VerificationService {
  create() {
    return 'This action adds a new verification';
  }

  remove(id: number) {
    return `This action removes a #${id} verification`;
  }
}
