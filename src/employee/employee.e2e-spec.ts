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

  it('GET /employees/1 gets employee with name masked', async () => {
    const expectedEmployeeOne = {
      agency: 'Abstracters Board of Examiners - Agency 66',
      id: 1,
      jobTitle: 'Director',
      name: '(Name withheld)',
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

  it('GET /employees/1 gets employee', async () => {
    const expectedEmployeeOne = {
      id: 7664,
      name: 'Janine B Fromm',
      jobTitle: 'Medical Services Director',
      agency: 'Health & Human Services - Agency 25',
      totalAnnualAmount: 399994.4,
      year: 2021,
      originalHireDate: '2019-07-22',
    };

    const { body, status } = await request(app.getHttpServer()).get(
      '/employees/7664',
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
      name: '(Name withheld)',
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

  it(`GET /employees/top-earners should return the 3 highest earners`, async () => {
    const { body, status } = await request(app.getHttpServer()).get(
      `/employees/top-earners?limit=3`,
    );
    const expectedEmployees = [
      {
        agency: 'Health & Human Services - Agency 25',
        id: 7664,
        jobTitle: 'Medical Services Director',
        name: 'Janine B Fromm',
        originalHireDate: '2019-07-22',
        totalAnnualAmount: 399994.4,
        year: 2021,
      },
      {
        agency: 'Health & Human Services - Agency 25',
        id: 9528,
        jobTitle: 'Psychiatric Director',
        name: 'Roger Donovick',
        originalHireDate: '2014-05-19',
        totalAnnualAmount: 350001.6,
        year: 2021,
      },
      {
        agency: 'Health & Human Services - Agency 25',
        id: 9403,
        jobTitle: 'Psychiatrist',
        name: 'Ramoncito Ocampo',
        originalHireDate: '2016-04-04',
        totalAnnualAmount: 329576,
        year: 2021,
      },
    ];
    expect({ status, body }).toEqual({
      status: 200,
      body: expectedEmployees,
    });
  });

  it(`GET /employees/top-earners should return the 2 highest earners from Transportation`, async () => {
    const { body, status } = await request(app.getHttpServer()).get(
      `/employees/top-earners?agency=transportation&limit=2`,
    );
    const expectedEmployees = [
      {
        agency: 'Transportation - Agency 27',
        id: 15832,
        jobTitle: 'Director',
        name: 'John Selmer',
        originalHireDate: '2021-03-15',
        totalAnnualAmount: 159999.84,
        year: 2021,
      },
      {
        agency: 'Transportation - Agency 27',
        id: 16318,
        jobTitle: 'Discretionary Non-Classified',
        name: 'Mostafa Jamshidi',
        originalHireDate: '1984-07-11',
        totalAnnualAmount: 155970.88,
        year: 2021,
      },
    ];
    expect({ status, body }).toEqual({
      status: 200,
      body: expectedEmployees,
    });
  });
});
