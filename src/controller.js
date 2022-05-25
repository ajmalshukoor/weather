import * as model from './model.js';
import weatherAppView from './view/weatherAppView.js';

const renderController = function(){
    setTimeout(function(){
        weatherAppView.render(model.state.weatherData);
    }, 1000);
}

const controlLiveRender = async function(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(model.loadWeather);
    }
    renderController();
}

const controlFindWeather = function(inputValue) {
    model.findGeoLocation(inputValue);
    renderController();
}

const init = function(){
    weatherAppView.addHandlerLive(controlLiveRender);
    weatherAppView.addHandlerFind(controlFindWeather);
};

init();