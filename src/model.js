import {API_URL, API_KEY} from './config.js';

export const state = {
    weatherData:{},
    coords:{},
};

export const createWeatherObject = function(data){
    const weatherData = data;
    console.log(weatherData)
    return {
        city: weatherData.name,
        countryCode: weatherData.sys.country,
        coord: weatherData.coord,
        humidity: weatherData.main.humidity,
        temp: weatherData.main.temp,
        tempMax: weatherData.main.temp_max,
        tempMin: weatherData.main.temp_min,
        feelsLike: weatherData.main.feels_like,
        windSpeed: weatherData.wind.speed,
        sunrise: weatherData.sys.sunrise,
        sunset: weatherData.sys.sunset,
        curWeatherDesc: weatherData.weather[0].description,
        curClimate: weatherData.weather[0].main,
    }
}

export const loadWeather = async function(pos){
    console.log(pos);
    const {latitude, longitude} = pos.coords;
    try{
        const res = await fetch(`${API_URL}lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
        const data = await res.json();
        state.weatherData = createWeatherObject(data);
        if(!res.ok) throw new Error(`${data} (${res.status})`)
        state.coords = {lat: latitude, lon: longitude};
    }
    catch (err){
        console.error(err);
    }
}
// export const getCoords = function(pos){
//     const {latitude, longitude} = pos.coords;
// }

// export const currentPosition = function(){
//     if(navigator.geolocation){
//          navigator.geolocation.getCurrentPosition( await loadWeather, () => alert('Could not get your position.'));
//     }
// }






