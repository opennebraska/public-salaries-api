import { Controller, Get } from '@nestjs/common';
import { AgencyService } from './agency.service';
import { AgencyEntity } from './agency.entity';

@Controller('agencies')
export class AgencyController {
  constructor(private readonly agencyService: AgencyService) {}

  @Get()
  async findAll(): Promise<AgencyEntity[]> {
    return this.agencyService.findAll();
  }
}
