import { Pothole } from 'src/pothole/pothole.entity';
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { VerificationStatus } from './verification-status.enum';

@Entity()
export class Verification extends BaseEntity {
  @PrimaryColumn()
  id: string;
  @CreateDateColumn()
  date: Date;
  @Column()
  status: VerificationStatus;
  @ManyToOne((type) => Pothole, (pothole) => pothole.verifications)
  pothole: Pothole
}
