import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum CampaignStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETE = 'COMPLETE',
}

@Entity({ name: 'campaigns' })
export class Campaign {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  message_body!: string;

  @Column({ type: 'timestamptz' })
  scheduled_at!: Date;

  @Column({
    type: 'enum',
    enum: CampaignStatus,
    default: CampaignStatus.PENDING,
  })
  status!: CampaignStatus;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;
}
