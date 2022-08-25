import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { PotholeSeverity } from './pothole-status.enum';

@Entity()
export class Pothole extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @CreateDateColumn()
  date: Date
  @Column()
  description: string
  @Column({ type: 'decimal' })
  lat: string
  @Column ({ type: 'decimal' })
  lng: string
  @Column()
  severity: PotholeSeverity
}