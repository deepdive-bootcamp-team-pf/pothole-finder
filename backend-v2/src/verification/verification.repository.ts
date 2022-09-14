import { v4 as UUID } from 'uuid';
import { Repository } from 'typeorm';
import { CustomRepository } from '../database/typeorm-ex.decorator';
import { VerificationStatus } from './verification-status.enum';
import { Verification } from './verification.entity';

@CustomRepository(Verification)
export class VerificationsRepository extends Repository<Verification> {
  async createverification(): Promise<Verification> {
    const verification = this.create({
      id: UUID(),
      status: VerificationStatus.VERIFIED,
    });

    await this.save(verification);
    return verification;
  }
}
