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
            .run();

          Promise.all([
            termux.smsInbox()
              .date()
              .showNumbers()
              .run(),
            termux.clipboardGet()
              .run(),
          ])
            .then(([smses, clipboard]) => {
              resolve({
                body: {
                  message: 'Request success',
                  clipboard,
                  smses,
                  body,
                  query,
                  params,
                  originalUrl,
                  protocol,
                  xhr,
                },
              });
            })
            .catch(reject);
        });
      },
    },
  },
];

export default healthRoutes;
