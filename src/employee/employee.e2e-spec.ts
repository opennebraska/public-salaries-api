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
    findById: (id: string) =>
      [georgeWashington].filter(employee => employee.id === id)[0],
    findByName: (name: string) =>
      [georgeWashington].filter(employee => employee.name === name)[0],
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

  it('GET /employees/1', () => {
    return request(app.getHttpServer())
      .get('/employees/1')
      .expect(200)
      .expect(georgeWashington);
  });

  it('GET /employees?name=George%20Washington', () => {
    return request(app.getHttpServer())
      .get('/employees?name=George%20Washington')
      .expect(200)
      .expect([georgeWashington]);
  });
});
