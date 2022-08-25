import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { VerificationStatus } from './verification-status.enum';

@Entity()
export class Verification extends BaseEntity {
  @PrimaryColumn()
  id: string;
  @CreateDateColumn()
  date: Date;
  @Column()
  status: VerificationStatus;
}
