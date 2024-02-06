import request from 'supertest';
import express, { Express } from 'express';
import { businessRouter } from '../src/index.js';

describe('GET /account/overview/:accountid', () => {
  let app: Express;

  beforeEach(() => {
    app = express();
    app.use(businessRouter);
  });

  it('should respond with a 200 status', async () => {
    const response = await request(app).get(`/ping`);
    expect(response.statusCode).toBe(200);
  });

});