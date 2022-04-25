import * as model from './model.js';
import weatherAppView from './view/weatherAppView.js';

const controlLiveRender = function(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(model.loadWeather);
    }
    // await model.loadWeather(44, 79);
    setTimeout(function(){
        weatherAppView.render(model.state.weatherData);
    }, 1000)
}

const init = function(){
    weatherAppView.addHandlerLive(controlLiveRender);
};

init();