import { Controller, Get, Query } from '@nestjs/common';
import { AgencyService } from './agency.service';
import { Agency } from './agency.entity';

@Controller('agencies')
export class AgencyController {
  constructor(private readonly agencyService: AgencyService) {}

  @Get()
  async findByName(@Query('name') name: string): Promise<Agency[]> {
    return this.agencyService.findByName(name);
  }
}
