import clientsRoutes from 'modules/Clients/swagger.json';
import userRoutes from 'modules/Users/swagger.json';

const SwaggerList = {
  swagger: '2.0',
  info: {
    description: 'eCommerce Gustho',
    version: '1.0.0',
    title: 'Swagger Gustho',
    termsOfService: 'http://swagger.io/terms/',
    contact: {
      email: 'gusto.dev',
    },
    license: {
      name: 'Apache 2.0',
      url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },
  host: process.env.NODE_BASE_URL,
  basePath: '/api',
  schemes: ['https', 'http'],
  paths: {
    '/auth/login': {
      post: {
        summary: 'Auth',
        description: '',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: '',
            required: true,
            schema: {
              type: 'object',
              properties: {
                mail: {
                  type: 'string',
                  format: 'string',
                },
                password: {
                  type: 'string',
                  format: 'string',
                },
              },
            },
          },
        ],
        responses: {
          '200': {
            description: 'Success',
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                  format: 'string',
                },
              },
            },
          },
          '401': {
            description: 'Mail or password not match',
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  format: 'string',
                },
              },
            },
          },
        },
        security: [
          {
            api_key: [],
          },
        ],
      },
    },
    ...clientsRoutes,
    ...userRoutes,
  },
  securityDefinitions: {
    Authorization: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
  externalDocs: {
    description: 'Find out more about Swagger',
    url: 'http://swagger.io',
  },
};

export default SwaggerList;
