import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campaign, CampaignStatus } from './entities/campaign.entity';

@Processor('campaign-queue')
export class CampaignProcessor {
  constructor(
    @InjectRepository(Campaign) private readonly campaignRepo: Repository<Campaign>,
  ) {}

  @Process('send-campaign')
  async handleSendCampaign(job: Job<{ campaignId: string }>) {
    const { campaignId } = job.data;
    // eslint-disable-next-line no-console
    console.log(`Processing campaign with ID: ${campaignId}`);

    const campaign = await this.campaignRepo.findOne({ where: { id: campaignId } });
    if (!campaign) {
      // eslint-disable-next-line no-console
      console.warn(`Campaign ${campaignId} not found. Skipping.`);
      return;
    }

    campaign.status = CampaignStatus.PROCESSING;
    await this.campaignRepo.save(campaign);

    // Simulate work
    // eslint-disable-next-line no-console
    console.log('Simulating sending campaign messages...');
    await new Promise((resolve) => setTimeout(resolve, 5000));

    campaign.status = CampaignStatus.COMPLETE;
    await this.campaignRepo.save(campaign);

    // eslint-disable-next-line no-console
    console.log(`Campaign ${campaignId} completed.`);
  }
}
