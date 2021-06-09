import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  findById(id: string): Promise<Employee> {
    return this.employeeRepository.findOne(id);
  }

  findByName(name: string): Promise<Employee[]> {
    let queryBuilder = this.employeeRepository.createQueryBuilder('employee');

    if (name) {
      queryBuilder.where('LOWER(employee.name) LIKE LOWER(:name)', { name });
    }
    return queryBuilder.getMany();
  }
}
