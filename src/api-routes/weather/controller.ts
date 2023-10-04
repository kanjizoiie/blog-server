import { Router, Request, Response } from 'express';
import _ from "lodash";
import WeatherAPI from './WeatherAPI';

interface GeoPoint {
  lat: number;
  lng: number;
};

interface WeatherEndpointPayload {
  geocode: string;
  position: GeoPoint;
}

const controller = () => {
  const router = Router();
  const api = new WeatherAPI('10456d4dfb4a90729790ada8bf436fd1');

  router.get('/', async (req: Request<WeatherEndpointPayload>, res: Response<any>) => {
    const { geocode, position } = req.body;
    res.send(await api.getWeatherAtGeocode("sundsvall"));
  });
  return router;
};

export default controller;
