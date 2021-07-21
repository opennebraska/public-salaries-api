import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { Repository } from 'typeorm';
import { EmployeeQueryDto } from './EmployeeQueryDto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  findById(id: string): Promise<Employee> {
    return this.employeeRepository.findOne(id);
  }

  findByName(queryDto: EmployeeQueryDto): Promise<Employee[]> {
    let queryBuilder = this.employeeRepository.createQueryBuilder('employee');
    const { name, agency } = queryDto;
    if (name) {
      queryBuilder.where('LOWER(employee.name) LIKE LOWER(:name) AND employee.totalAnnualAmount > 50000', { name });
    }
    if (agency) {
      queryBuilder.where('LOWER(employee.agency) LIKE LOWER(:agency)', {
        agency,
      });
    }
    return queryBuilder.getMany();
  }

  findTopEarners(agency: string, numberOfEarners = 10): Promise<Employee[]> {
    let queryBuilder = this.employeeRepository.createQueryBuilder('employee');
    if (agency) {
      queryBuilder.where('LOWER(employee.agency) LIKE LOWER(:agency)', {
        agency: `%${agency}%`,
      });
    }
    return queryBuilder
      .orderBy('employee.totalAnnualAmount', 'DESC')
      .limit(numberOfEarners)
      .getMany();
  }
}
