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

  it('GET /employees?name=David%20Hunter gets employee with name listed', async () => {
    const expectedEmployee = {
      agency: 'Accountability & Disclosure Commission - Agency 87',
      id: expect.any(Number),
      jobTitle: 'Accountability & Disclosure Deputy Director',
      name: 'David Hunter',
      originalHireDate: '2000-07-17',
      overtime: 0,
      salary: 69224.48,
      totalAnnualAmount: 69224.48,
      year: 2021,
    };

    const { body, status } = await request(app.getHttpServer()).get(
      '/employees?name=David%20Hunter',
    );

    expect({ status, body }).toEqual({
      status: 200,
      body: [expectedEmployee],
    });
  });

  it(`GET /employees?name=Psychiatrist should return employees with this job title`, async () => {
    const { body, status } = await request(app.getHttpServer()).get(
        `/employees?name=Psychiatrist`,
    );
    expect({ status, body }).toEqual({
      status: 200,
      body: [
        {
          "agency": "Health & Human Services - Agency 25",
          "id": 4710,
          "jobTitle": "Psychiatrist",
          "name": "Amy Barker",
          "originalHireDate": "2020-04-01",
          "overtime": 0,
          "salary": 322167.04,
          "totalAnnualAmount": 322167.04,
          "year": 2021
        },
        {
          "agency": "Health & Human Services - Agency 25",
          "id": 6324,
          "jobTitle": "Psychiatrist",
          "name": "Klaus Hartmann",
          "originalHireDate": "1975-10-01",
          "overtime": 0,
          "salary": 306835.36,
          "totalAnnualAmount": 306835.36,
          "year": 2021
        },
        {
          "agency": "Health & Human Services - Agency 25",
          "id": 7050,
          "jobTitle": "Psychiatrist",
          "name": "Ramoncito Ocampo",
          "originalHireDate": "2016-04-04",
          "overtime": 0,
          "salary": 329576,
          "totalAnnualAmount": 329576,
          "year": 2021
        },
      ],
    });
  });

  it(`GET /employees/top-earners should return the 3 highest earners`, async () => {
    const { body, status } = await request(app.getHttpServer()).get(
      `/employees/top-earners?limit=3`,
    );
    expect({ status, body }).toEqual({
      status: 200,
      body: [
        {
          agency: 'Health & Human Services - Agency 25',
          id: expect.any(Number),
          jobTitle: 'Executive Medical Officer',
          name: 'Janine B Fromm',
          originalHireDate: '2019-07-22',
          overtime: 0,
          salary: 399994.4,
          totalAnnualAmount: 399994.4,
          year: 2021,
        },
        {
          agency: 'Health & Human Services - Agency 25',
          id: expect.any(Number),
          jobTitle: 'Chief Clinical Officer for Adult Facilities',
          name: 'Roger Donovick',
          originalHireDate: '2014-05-19',
          overtime: 0,
          salary: 350001.6,
          totalAnnualAmount: 350001.6,
          year: 2021,
        },
        {
          agency: 'Health & Human Services - Agency 25',
          id: expect.any(Number),
          jobTitle: 'Psychiatrist',
          name: 'Ramoncito Ocampo',
          originalHireDate: '2016-04-04',
          overtime: 0,
          salary: 329576,
          totalAnnualAmount: 329576,
          year: 2021,
        },
      ],
    });
  });

  it(`GET /employees/top-earners should return the 2 highest earners from Transportation`, async () => {
    const { body, status } = await request(app.getHttpServer()).get(
      `/employees/top-earners?agency=transportation&limit=2`,
    );
    const expectedEmployees = [
      {
        agency: 'Transportation - Agency 27',
        id: expect.any(Number),
        jobTitle: 'Director',
        name: 'John Selmer',
        originalHireDate: '2021-03-15',
        overtime: 0,
        salary: 159999.84,
        totalAnnualAmount: 159999.84,
        year: 2021,
      },
      {
        agency: 'Transportation - Agency 27',
        id: expect.any(Number),
        jobTitle: 'Director',
        name: 'Kyle E Schneweis',
        originalHireDate: '2015-06-08',
        overtime: 0,
        salary: 158905.76,
        totalAnnualAmount: 158905.76,
        year: 2021,
      },
    ];
    expect({ status, body }).toEqual({
      status: 200,
      body: expectedEmployees,
    });
  });
});
