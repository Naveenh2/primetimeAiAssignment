const app = require('./app');
const env = require('./config/env');
const prisma = require('./config/prisma');

async function bootstrap() {
  try {
    await prisma.$connect();
    app.listen(env.port, () => {
      console.log(`Backend running on http://localhost:${env.port}`);
      console.log(`Swagger docs at http://localhost:${env.port}/api/v1/docs`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

bootstrap();
