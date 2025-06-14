import express from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { weatherData } from './routers/weather_rotes.js';


const app = express();

app.use(express.json());

app.use(cors());

dotenv.config();

app.use("/api/v1",weatherData)

const PORT = process.env.PORT || 5000;

export const apikey = process.env.Weather_API_Key;

const MONGOURI = process.env.MONGO_URI;

mongoose.connect(MONGOURI)
.then(()=>{
    console.log(`connected successfully`);
    app.listen(PORT,()=>{
        console.log(`server is running on Port ${PORT}`);
    })
}).catch((error)=>{
    console.log(error,"check your connection")
})

