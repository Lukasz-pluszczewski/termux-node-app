import termux from 'termux';

const healthRoutes = [
  {
    path: '/health',
    handlers: {
      get: ({ body, query, params, originalUrl, protocol, xhr, get, req, db }) => {
        return {
          body: {
            status: 'healthy',
            termuxStatus: termux.hasTermux,
          },
        };
      },
    },
  },
];

export default healthRoutes;
