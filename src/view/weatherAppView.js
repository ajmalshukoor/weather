import {tempFormat,timeFormat} from '../helper.js';

class WeatherAppView{
    _parentElement = document.querySelector('.content');
    _data;

    render(data){
        if(!data) return 
        this._data = data;
        console.log(this._data.temp)
        const markup = this._generateMarkup();
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }

    addHandlerLive(handler){
        this._parentElement.previousElementSibling.addEventListener('click', handler);
    }
    
    addHandlerRender(handler){
        window.addEventListener('load', handler);
    }

    _generateMarkup(){
        return `
        <div class="container">
        <div>
            <header>
                <h1 class="place">${this._data.city}, ${this._data.countryCode}</h1>
                <p class="date">Monday 29 August</p>
            </header>
        </div>
        <div class="contend">
            <div class="weather__temp">
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="80" height="80" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512">
                    <path fill="none" stroke="white" stroke-linejoin="round" stroke-width="32" d="M90.61 306.85A16.07 16.07 0 0 0 104 293.6C116.09 220.17 169.63 176 232 176c57.93 0 96.62 37.75 112.2 77.74a15.84 15.84 0 0 0 12.2 9.87c50 8.15 91.6 41.54 91.6 99.59c0 59.4-48.6 100.8-108 100.8H106c-49.5 0-90-24.7-90-79.2c0-48.47 38.67-72.22 74.61-77.95Z"/><path fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M384.8 271.4a80 80 0 1 0-123.55-92M464 208h32M336 48v32M222.86 94.86l22.63 22.63m203.65-22.63l-22.63 22.63"/>
                </svg>
                <!-- <svg class="icon" width="128" height="88" viewBox="0 0 128 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M85 87.75H26.5C19.125 87.75 12.77 86.2207 8.1175 83.3281C2.8075 80.0234 0 75.123 0 69.1562C0 63.9492 2.52 59.4297 7.285 56.0879C11.095 53.416 16.3275 51.5547 22.035 50.8457C22.05 50.8457 22.055 50.8457 22.0575 50.8359C23.6675 43.2188 28.015 36.7559 34.635 32.1484C41.0752 27.686 49.3918 25.2306 58 25.25C65.5575 25.25 72.62 27.084 78.4275 30.5566C83.5046 33.6356 87.4227 37.7291 89.7675 42.4043C97.12 43.3457 103.448 45.7461 108.065 49.3457C113.25 53.3965 116 58.7871 116 64.9375C116 71.3535 112.718 77.2168 106.75 81.4453C101.028 85.5117 93.3 87.75 85 87.75ZM95.375 36.9473C99.373 37.7448 103.2 38.995 106.735 40.6582C108.365 36.9154 108.438 32.8659 106.945 29.0884C105.452 25.311 102.469 21.9988 98.4223 19.6253C94.3754 17.2518 89.4717 15.9384 84.4121 15.8727C79.3524 15.8071 74.3956 16.9926 70.25 19.2598C69.775 19.5202 69.3133 19.7936 68.865 20.0801C74.0977 21.1489 79.0045 23.0235 83.2975 25.5937C88.3365 28.6436 92.459 32.519 95.375 36.9473V36.9473ZM112 31.5H128V37.75H112V31.5ZM80 0.25H88V12.75H80V0.25ZM63.8375 19.3184L66.95 16.8867L55.795 8.16992L50.1375 12.5898L58.43 19.0684H58.58C60.3374 19.0677 62.0932 19.1512 63.8375 19.3184V19.3184ZM101.051 16.8848L112.207 8.16894L117.864 12.5883L106.708 21.3043L101.051 16.8848Z" fill="white"/>
                </svg> -->
                <div class="temp__temp">
                    <p class="temp-temp main">${tempFormat(this._data.temp)}°</p>
                    <p class="temp-climate sub">Feels like ${tempFormat(this._data.feelsLike)}°C</p>
                </div>
            </div> 
    
            <div class="weather__others">
                <svg class="seperator" width="2" height="188" viewBox="0 0 2 188" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.75 0H0.25V188H1.75V0Z" fill="white"/>
                </svg>
                <ul class="others_1">
                    <li class="main first">${tempFormat(this._data.tempMax)}°</li>
                    <li class="sub">High</li>
                    <li class="main second">${tempFormat(this._data.tempMin)}°</li>
                    <li class="sub">low</li>
                </ul>
                <ul class="others_2">
                    <li class="main first">${(this._data.windSpeed*3.6).toFixed()} km/h</li>
                    <li class="sub">Wind</li>
                    <li class="main second">${this._data.humidity}%</li>
                    <li class="sub">Humidity</li>
                </ul>
                <ul class="others_3">
                    <li class="main first">${timeFormat(this._data.sunrise)}</li>
                    <li class="sub">Sunrise</li>
                    <li class="main second">${timeFormat(this._data.sunset)}</li>
                    <li class="sub">Sunset</li>
                </ul>
                </div>
            </div>`
    }
}

export default new WeatherAppView()