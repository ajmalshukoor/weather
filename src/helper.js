export const tempFormat = function(temperature){
    return (temperature-273.15).toFixed();
}

export const timeFormat = function(suntime){
    const options = {hour12: false, hour: '2-digit', minute:'2-digit'};
    return new Date(suntime*1000).toLocaleTimeString('en-US', options)
}