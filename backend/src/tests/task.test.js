const request = require('supertest');
const app = require('../app');

describe('Task API', () => {
  it('should block unauthenticated task list access', async () => {
    const response = await request(app).get('/api/v1/tasks');
    expect(response.statusCode).toBe(401);
  });
});
