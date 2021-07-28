import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Agency } from './agency.entity';
import { Employee } from '../employee/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AgencyService {
  constructor(
    @InjectRepository(Agency) private agencyRepository: Repository<Agency>,
    @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
  ) {}

  findById(id: string): Promise<Agency> {
    return this.agencyRepository.findOne(id);
  }

  findByName(name?: string): Promise<Agency[]> {
    let queryBuilder = this.agencyRepository.createQueryBuilder('agency');
    if (name) {
      queryBuilder.where('LOWER(agency.name) LIKE LOWER(:name)', {
        name: `%${name}%`,
      });
    }
    return queryBuilder.getMany();
  }

  findStats(): Promise<number[]> {
    //const agencyCount = this.agencyRepository.count();
    //const employeeCount = this.employeeRepository.count();
    //return [ agencyCount, employeeCount ];
    return [ 17,8 ];
  }
}
