// import axios from "axios";


// export const getweather = async(req, res) => {
//     const city = req.query.city;
//     const apikey = process.env.Weather_API_Key;

//     try {
//         const res = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}&aqi=no`)

//         const weatherTime = new Date((response.data.dt + response.data.timezone) * 1000);
//         const localTime = weatherTime.toLocaleString();  // Use toLocaleTimeString() if you only want time

//         const weatherInfo = {
//             country: response.data.sys.country,
//             city: response.data.name,
//             temperature: response.data.main.temp,
//             condition: response.data.weather[0].description,
//             time: localTime,
//             icon: response.data.weather[0].icon
//         };

//         const newWeatherInfo = new Weather(weatherInfo);
//         await newWeatherInfo.save()
//         res.status(200).json(newWeatherInfo,{'Current Weather':weatherInfo});

//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

import axios from "axios";
import { apikey } from "../index.js";
import Weather from "../modules/weather_modules.js";
import { error } from "console";


export const getweather = async (req, res) => {
  const City = req.query.city;

  if (City !== req.query.city) {
    return res.status(400).json({ error: "City is required, Check your spelling e.g., ?city=Accra" });
  }

  try {
    // Step 1: Check if the city's weather is already saved in your database (case-insensitive)
    const storedWeather = await Weather.findOne({
      city: { $regex: new RegExp(`^${City}$`, 'i') }
    });

    if (storedWeather) {
      return res.status(200).json({
        source: "database",
        message: "Weather info fetched from local database",
        weather: storedWeather
      });
    }

    // Step 2: If not found in DB, fetch from external API
    const response = await axios.get("http://api.weatherapi.com/v1/current.json", {
      params: {
        key: apikey,
        q: City,
        aqi: "no"
      }
    });

    const data = response.data;

    const weatherInfo = {
      country: data.location.country,
      city: data.location.name,
      temperature: data.current.temp_c,
      condition: data.current.condition.text,
      time: data.location.localtime,
      icon: data.current.condition.icon
    };


    // Step 3: Save fetched weather to DB
    const newWeather = new Weather(weatherInfo);
    await newWeather.save();

    // if (newWeather == storedWeather){
    //     return res.status(400).json({error:`weather data already exist`,storedWeather})
    // }else{
        
    // }

    // Step 4: Return the fetched and saved result
    res.status(200).json({
      source: "external API",
      message: "Weather fetched from external API and saved to DB",
      weather: newWeather
    });

  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to fetch or save weather data" });
  }
};







