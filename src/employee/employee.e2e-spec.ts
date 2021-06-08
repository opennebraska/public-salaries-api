import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.entity';

describe('EmployeeController (e2e)', () => {
  let app: INestApplication;
  const georgeWashington: Employee = {
    id: '1',
    name: 'George Washington',
    jobTitle: 'Prez',
    agency: 'Executive Branch',
    totalAnnualAmount: 25000,
    originalHireDate: '4-30-1789',
  };
  let employeeService = {
    findAll: () => [georgeWashington],
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(EmployeeService)
      .useValue(employeeService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /employees', () => {
    return request(app.getHttpServer())
      .get('/employees')
      .expect(200)
      .expect([georgeWashington]);
  });
});
