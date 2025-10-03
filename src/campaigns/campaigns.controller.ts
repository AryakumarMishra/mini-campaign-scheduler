import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { CampaignsService } from './campaigns.service';
import { Campaign } from './entities/campaign.entity';

@ApiTags('campaigns')
@Controller('campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Post()
  async create(@Body() dto: CreateCampaignDto) {
    return this.campaignsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all campaigns' })
  async findAll(): Promise<Campaign[]> {
    return this.campaignsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a campaign by ID' })
  async findOne(@Param('id') id: string): Promise<Campaign> {
    const campaign = await this.campaignsService.findOne(id);
    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }
    return campaign;
  }
}
