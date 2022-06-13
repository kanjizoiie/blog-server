import { Router, Request, Response } from 'express';
import _ from "lodash";

interface Datapoint {
  shorts_weather: boolean
}

const controller = () => {
  const router = Router();
  let count = 0;
  router.post('/', async (req: Request<Datapoint>, res: Response<any>) => {
    const data: Datapoint = req.body;
    if (data.shorts_weather) {
      count += 1;
    } else if (!data.shorts_weather) {
      count -= 1;
    }
    res.send({ status: count });
  });

  router.get('/', async (req, res) => {
    res.send({ status: count });
  });

  return router;
};

export default controller;
