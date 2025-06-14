import { Router } from "express";
import { getweather } from "../controllers/weather_contollers.js";



export const weatherData = Router();

weatherData.get('/weather', getweather)