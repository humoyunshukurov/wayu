import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { DataSource } from 'typeorm';
import { createTestApp } from './utils/test-app';
import { teardownTestApp } from './utils/teardown';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let dataSource: DataSource;

  beforeAll(async () => {
    ({ app, dataSource } = await createTestApp());
  });

  afterAll(async () => await teardownTestApp(app, dataSource));

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(404);
  });
});
