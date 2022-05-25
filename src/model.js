import {API_URL, API_KEY, GEOCODE_API_URL} from './config.js';

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
    const {latitude, longitude} = pos.coords;
    try{
        const res = await fetch(`${API_URL}lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
        const data = await res.json();
        state.weatherData = createWeatherObject(data);
        
        if(!res.ok) throw new Error(`${data} (${res.status})`)
    }
    catch (err){
        console.error(err);
    }
}

export const findGeoLocation = async function(place){
    try{
        const res = await fetch(`${GEOCODE_API_URL}${place[0]},${place[1]},${place[2]}&limit=3&appid=${API_KEY}`);
        const data = await res.json();
        if(!res.ok) throw new Error(`${data} (${res.status})`);
        const {lat:latitude, lon:longitude} = data[0];
        state.coords = {latitude: latitude, longitude: longitude};
        loadWeather(state);
    }
    catch(err){
        console.log(err);
    }
}

// findGeoLocation(['London', 'CA', 'US', 5]);
// export const getCoords = function(pos){
//     const {latitude, longitude} = pos.coords;
// }

// export const currentPosition = function(){
//     if(navigator.geolocation){
//          navigator.geolocation.getCurrentPosition( await loadWeather, () => alert('Could not get your position.'));
//     }
// }






