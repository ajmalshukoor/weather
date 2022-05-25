export const tempFormat = function(temperature){
    return (temperature-273.15).toFixed();
}

export const timeFormat = function(suntime){
    const options = {hour12: false, hour: '2-digit', minute:'2-digit'};
    return new Date(suntime*1000).toLocaleTimeString('en-US', options)
}

export const getDay = function (){
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const date = new Date();
    const dateFormat = String(date).split(' ');
    const day = date.getDay();
    return `${days[day - 1]}, ${dateFormat[1]} ${dateFormat[2]} ${dateFormat[3]}`
}