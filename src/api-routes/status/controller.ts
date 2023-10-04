import { Router, Request, Response } from 'express';
import _ from "lodash";
export interface WeatherAPIData {
  coord: {
    lat: number,
    lng: number
  },
  weather: Array<{
    id: number,
    main: string,
    description: string,
    icon: string,
    icon_url: string,
  }>,
  base: string,
  main: {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number
  },
  visibility: number,
  wind: {
    speed: number,
    deg: number
  },
  clouds: {
    all: number
  },
  dt: number,
  sys: {
    type: number,
    id: number,
    message: number,
    country: string,
    sunrise: number,
    sunset: number
  },
  timezone: number,
  id: number,
  name: string,
  cod: number
}

interface Datapoint {
  shorts_weather: boolean,
  weather: WeatherAPIData,
}

const controller = () => {
  const router = Router();
  let count = 0;
  router.post('/', async (req: Request<Datapoint>, res: Response<any>) => {
    console.log(req.body);
    const { shorts_weather }: Datapoint = req.body;
    if (shorts_weather) {
      count += 1;
    } else if (!shorts_weather) {
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
