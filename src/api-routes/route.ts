import { Application, Router } from 'express';
import controller from './qr/controller';

const routes = (app: Application) => {
  app.use('/api', controller());
};

export default routes;
