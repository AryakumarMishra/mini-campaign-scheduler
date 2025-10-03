import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { Campaign } from './entities/campaign.entity';
import { CampaignsController } from './campaigns.controller';
import { CampaignsService } from './campaigns.service';
import { CampaignProcessor } from './CampaignProcessor';

@Module({
  imports: [
    TypeOrmModule.forFeature([Campaign]),
    BullModule.registerQueue({ name: 'campaign-queue' }),
  ],
  controllers: [CampaignsController],
  providers: [CampaignsService, CampaignProcessor],
})
export class CampaignsModule {}
