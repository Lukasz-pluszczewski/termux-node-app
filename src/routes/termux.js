import termux from 'termux';

const healthRoutes = [
  {
    path: '/termux',
    handlers: {
      get: ({ body, query, params, originalUrl, protocol, xhr, get, req, db }) => {
        return new Promise((resolve, reject) => {
          if (!termux.hasTermux) {
            return resolve({
              status: 500,
              body: {
                message: 'No termux installed',
              },
            });
          }

          termux.vibrate()
            .duration(1000)
            .run()

          termux.clipboardGet()
            .run()
            .then(function (text) {
              resolve({
                body: {
                  message: 'Request success',
                  clipboard: text,
                  body,
                  query,
                  params,
                  originalUrl,
                  protocol,
                  xhr,
                },
              });
            })
        });
      },
    },
  },
];

export default healthRoutes;
