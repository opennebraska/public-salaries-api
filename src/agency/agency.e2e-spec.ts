import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { AgencyService } from './agency.service';

describe('AgencyController (e2e)', () => {
  let app: INestApplication;
  let agencyService = { findAll: () => ['fakeAgency'] };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AgencyService)
      .useValue(agencyService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /agencies', () => {
    return request(app.getHttpServer())
      .get('/agencies')
      .expect(200)
      .expect(['fakeAgency']);
  });
});
