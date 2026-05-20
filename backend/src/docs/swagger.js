const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PrimeTrade Task Manager API',
      version: '1.0.0',
      description: 'Backend APIs for PrimeTrade internship assignment'
    },
    servers: [
      {
        url: 'http://localhost:5000/api/v1'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./src/docs/swaggerPaths.js']
};

const specs = swaggerJsDoc(options);

module.exports = { swaggerUi, specs };
