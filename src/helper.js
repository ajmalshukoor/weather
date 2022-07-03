export const tempFormat = function(temperature){
    return (temperature-273.15).toFixed();
}

export const timeFormat = function(suntime){
    const options = {hour12: false, hour: '2-digit', minute:'2-digit'};
    return new Date(suntime*1000).toLocaleTimeString('en-US', options)
}

export const getDays = function (){
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date();
    const dateFormat = String(date).split(' ');
    const day = date.getDay();
    console.log(date, day)

    return `${days[day]}, ${dateFormat[1]} ${dateFormat[2]} ${dateFormat[3]}`
}