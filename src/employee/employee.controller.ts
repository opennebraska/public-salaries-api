import { Controller, Get, Param, Query } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.entity';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  async findAll(): Promise<Employee[]> {
    return this.employeeService.findAll();
  }

  @Get('/:id')
  async find(@Param('id') id: string): Promise<Employee> {
    return this.employeeService.findById(id);
  }

  @Get()
  async findByName(@Query('name') name: string): Promise<Employee[]> {
    return this.employeeService.findByName(name);
  }
}
