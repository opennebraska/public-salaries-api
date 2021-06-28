import { Controller, Get, Param, Query } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeQueryDto } from './EmployeeQueryDto';
import { EmployeeResponse } from './employee.response';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('/top-earners')
  async findTopEarners(
    @Query('agency') agency: string,
    @Query('limit') limit: number,
  ): Promise<EmployeeResponse[]> {
    const employees = await this.employeeService.findTopEarners(agency, limit);
    return employees.map(employee => new EmployeeResponse(employee));
  }

  @Get('/:id')
  async find(@Param('id') id: string): Promise<EmployeeResponse> {
    return new EmployeeResponse(await this.employeeService.findById(id));
  }

  @Get()
  async findByName(
    @Query() queryDto: EmployeeQueryDto,
  ): Promise<EmployeeResponse[]> {
    const employees = await this.employeeService.findByName(queryDto);
    return employees.map(employee => new EmployeeResponse(employee));
  }
}
