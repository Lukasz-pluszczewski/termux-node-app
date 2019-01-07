import checkPassword from 'middleware/checkPassword';
import config from './config';
import routes from 'routes';

import termuxService from 'services/termuxService';
import simpleExpress from 'services/simpleExpress';

(async function() {
  termuxService.watchSms();

  simpleExpress({
    port: config.port,
    routes,
    globalMiddlewares: [
      checkPassword(config.password),
    ],
  })
    .then(app => console.log(`Started on port ${app.server.address().port}`))
    .catch(error => console.error('Error', error));
})();
