const request = require('supertest');
const app = require('../app');

describe('Auth API', () => {
  it('should fail with validation error for invalid register payload', async () => {
    const response = await request(app).post('/api/v1/auth/register').send({
      name: 'A',
      email: 'invalid-email',
      password: '123'
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it('should fail with validation error for missing login payload', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({});
    expect(response.statusCode).toBe(400);
  });
});
