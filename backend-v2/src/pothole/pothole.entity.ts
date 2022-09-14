import { IsEnum } from 'class-validator';
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { PotholeSeverity } from './pothole-severity.enum';

@Entity()
export class Pothole extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @CreateDateColumn()
  date: Date
  @Column()
  description: string
  @Column({ type: 'decimal', precision: 7, scale: 4 })
  lat: number
  @Column ({ type: 'decimal', precision: 7, scale: 4 })
  lng: number
  @IsEnum(PotholeSeverity)@Column()
  severity: PotholeSeverity
}