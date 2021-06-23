import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Agency } from './agency.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AgencyService {
  constructor(
    @InjectRepository(Agency) private agencyRepository: Repository<Agency>,
  ) {}

  findById(id: string): Promise<Agency> {
    return this.agencyRepository.findOne(id);
  }

  findByName(name?: string): Promise<Agency[]> {
    let queryBuilder = this.agencyRepository.createQueryBuilder('agency');
    if (name) {
      queryBuilder.where('LOWER(agency.name) LIKE LOWER(:name)', { name });
    }
    return queryBuilder.getMany();
  }
}
