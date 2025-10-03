import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateCampaignDto {
  @ApiProperty({ description: 'Message content', example: 'Hello subscribers!' })
  @IsString()
  @IsNotEmpty()
  message_body!: string;

  @ApiProperty({
    description: 'ISO date-time string when campaign should run',
    example: '2025-10-04T08:30:00.000Z',
  })
  @IsDateString()
  scheduled_at!: string;
}
