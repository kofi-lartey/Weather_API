// import mongoose from 'mongoose';
// import { normalize } from 'path';

// const conditionSchema = new mongoose.Schema({
//     text: String,
//     icon: String,
//     code: Number
// }, { _id: false });

// const currentSchema = new mongoose.Schema({
//     last_updated_epoch: Number,
//     last_updated: String,
//     temp_c: Number,
//     temp_f: Number,
//     is_day: Number,
//     condition: conditionSchema,
//     wind_mph: Number,
//     wind_kph: Number,
//     wind_degree: Number,
//     wind_dir: String,
//     pressure_mb: Number,
//     pressure_in: Number,
//     precip_mm: Number,
//     precip_in: Number,
//     humidity: Number,
//     cloud: Number,
//     feelslike_c: Number,
//     feelslike_f: Number,
//     windchill_c: Number,
//     windchill_f: Number,
//     heatindex_c: Number,
//     heatindex_f: Number,
//     dewpoint_c: Number,
//     dewpoint_f: Number,
//     vis_km: Number,
//     vis_miles: Number,
//     uv: Number,
//     gust_mph: Number,
//     gust_kph: Number
// }, { _id: false });

// const locationSchema = new mongoose.Schema({
//     name: String,
//     region: String,
//     country: String,
//     lat: Number,
//     lon: Number,
//     tz_id: String,
//     localtime_epoch: Number,
//     localtime: String
// }, { _id: false });

// const weatherSchema = new mongoose.Schema({
//     city: {
//         type: String,
//         required: true
//     },
//     location: locationSchema,
//     current: currentSchema,
//     createdAt: { type: Date, default: Date.now }
// }, { timeseries: true });

// export default mongoose.model('Weather', weatherSchema.plugin(normalize));

import mongoose from 'mongoose';
import normalize from 'normalize-mongoose';



export const weatherSchema = new mongoose.Schema({
    country: { type: String, required: true },
    city: { type: String, required: true },
    temperature: { type: Number, required: true },
    condition: { type: String, required: true },
    time: { type: String, required: true },
    icon: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

weatherSchema.plugin(normalize);
export default mongoose.model('Weather', weatherSchema);
