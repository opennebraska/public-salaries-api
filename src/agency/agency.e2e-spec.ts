import { INestApplication } from '@nestjs/common';
import { Agency } from './agency.entity';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';

describe('AgencyController (e2e)', () => {
  let app: INestApplication;
  const transportationAgency: Agency = {
    id: 65,
    name: 'Transportation - Agency 27',
    employeeCount: 2464,
    topOvertime: 30385,
    topSalary: 160000,
    topPay: 160000,
    medianPay: 44571,
    totalSalary: 118213331,
    totalOvertime: 5030164,
    totalPay: 123243495,
    year: 2021,
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => app?.close());

  it('GET /agencies?name=Transportation', async () => {
    const { status, body } = await request(app.getHttpServer()).get(
      '/agencies?name=Transportation',
    );

    expect({ status, body }).toEqual({
      status: 200,
      body: [transportationAgency],
    });
  });

  it('GET /agencies/65', () => {
    return request(app.getHttpServer())
      .get('/agencies/65')
      .expect(200)
      .expect(transportationAgency);
  });

  it('GET /agencies/stats', () => {
    return request(app.getHttpServer())
      .get('/agencies/stats')
      .expect(200)
      .expect([68, 22334]);
  });
});
