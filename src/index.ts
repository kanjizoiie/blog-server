import express from 'express';
import routes from './api-routes/route';
import cors from 'cors';



const application = (port: number, host: string) => {
  const app: express.Express = express();
  app.use(express.json());
  app.use(cors({
    origin: 'http://localhost:5000/'
  }));
  routes(app);
  return app.listen(port, host, () => {
    console.log(`Started on: http://${host}:${port}`);
  });
};

application(3502, "localhost");
