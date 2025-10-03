import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Campaign, CampaignStatus } from './entities/campaign.entity';
import { CreateCampaignDto } from './dto/create-campaign.dto';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectRepository(Campaign) private readonly campaignRepo: Repository<Campaign>,
    @InjectQueue('campaign-queue') private readonly campaignQueue: Queue,
  ) {}

  async create(dto: CreateCampaignDto): Promise<Campaign> {
    const scheduledAt = new Date(dto.scheduled_at);

    const campaign = this.campaignRepo.create({
      message_body: dto.message_body,
      scheduled_at: scheduledAt,
      status: CampaignStatus.PENDING,
    });
    const saved = await this.campaignRepo.save(campaign);

    const delay = Math.max(scheduledAt.getTime() - Date.now(), 0);
    await this.campaignQueue.add('send-campaign', { campaignId: saved.id }, { delay });

    return saved;
  }

  async findAll(): Promise<Campaign[]> {
    return this.campaignRepo.find({ 
      order: { created_at: 'DESC' } 
    });
  }

  async findOne(id: string): Promise<Campaign> {
    const campaign = await this.campaignRepo.findOne({ where: { id } });
    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }
    return campaign;
  }
}
