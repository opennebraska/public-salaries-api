import { INestApplication } from '@nestjs/common';
import { Agency } from './agency.entity';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { AgencyService } from './agency.service';

describe('AgencyController (e2e)', () => {
  let app: INestApplication;
  const omahaAgency: Agency = {
    id: '1',
    name: 'Omaha',
    employeeCount: 3896,
    topPay: 216864,
    medianPay: 72320,
    year: 2020,
  };

  let agencyService = {
    findByName: (name: string) =>
      [omahaAgency].filter(agency => agency.name === name)[0],
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AgencyService)
      .useValue(agencyService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => app?.close());

  it('GET /agencies?name=Omaha', () => {
    request(app.getHttpServer())
      .get('/agencies?name=Omaha')
      .expect(200)
      .expect([omahaAgency]);
  });

  it('GET /agencies/1', () => {
    request(app.getHttpServer())
      .get('/agencies/1')
      .expect(200)
      .expect([omahaAgency]);
  });
});
