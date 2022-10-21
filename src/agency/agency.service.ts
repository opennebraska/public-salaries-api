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
    const queryBuilder = this.agencyRepository.createQueryBuilder('agency');
    if (name) {
      queryBuilder.where('LOWER(agency.name) LIKE LOWER(:name)', {
        name: `%${name}%`,
      });
    }
    return queryBuilder.getMany();
  }

  async findStats(): Promise<number[]> {
    const queryBuilder = this.agencyRepository.createQueryBuilder('agency');
    const agencies = await queryBuilder.getMany();
    let totalEmployees = 0;
    const agencyCount = agencies.length;
    agencies.forEach(agency => {
      totalEmployees += agency.employeeCount;
    });
    return [agencyCount, totalEmployees];
  }
}
