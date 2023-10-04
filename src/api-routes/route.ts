import { Application, Router } from 'express';
import statusController from './status/controller';
import weatherController from './weather/controller';

const routes = (app: Application) => {
  app.use('/api', statusController());
  app.use('/weather', weatherController());
};

export default routes;
