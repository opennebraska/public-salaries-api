import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';

describe('EmployeeController (e2e)', () => {
  let app: INestApplication;
  jest.setTimeout(30000);

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => app?.close());

  it('GET /employees/1', async () => {
    const expectedEmployeeOne = {
      agency: 'Abstracters Board of Examiners - Agency 66',
      id: 1,
      jobTitle: 'Director',
      name: 'Julie Rawlings Hoppe',
      originalHireDate: '2007-01-01',
      totalAnnualAmount: 15721.68,
      year: 2021,
    };

    const { body, status } = await request(app.getHttpServer()).get(
      '/employees/1',
    );

    expect({ status, body }).toEqual({
      status: 200,
      body: expectedEmployeeOne,
    });
  });

  it('GET /employees?name=Julie%20Rawlings%20Hoppe', async () => {
    const expectedHoppeEmployee = {
      agency: 'Abstracters Board of Examiners - Agency 66',
      id: 1,
      jobTitle: 'Director',
      name: 'Julie Rawlings Hoppe',
      originalHireDate: '2007-01-01',
      totalAnnualAmount: 15721.68,
      year: 2021,
    };

    const { body, status } = await request(app.getHttpServer()).get(
      '/employees?name=Julie%20Rawlings%20Hoppe',
    );

    expect({ status, body }).toEqual({
      status: 200,
      body: [expectedHoppeEmployee],
    });
  });
});
