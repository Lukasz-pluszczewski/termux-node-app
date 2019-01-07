import health from './health';
import example from './example';
import termux from './termux';

const routes = [
  ...health,
  ...example,
  ...termux,
];

export default routes;
