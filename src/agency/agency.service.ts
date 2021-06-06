import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AgencyEntity } from './agency.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AgencyService {
  constructor(
    @InjectRepository(AgencyEntity)
    private agencyRepository: Repository<AgencyEntity>,
  ) {}

  findAll(): Promise<AgencyEntity[]> {
    return this.agencyRepository.find();
  }
}
