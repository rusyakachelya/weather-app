import axios from "axios";

const APIkey = '0e0e2c39bdb37bd50226a51ba7e7bd91'
// const example = 'https://api.openweathermap.org/data/2.5/weather?q=Uman&appid=0e0e2c39bdb37bd50226a51ba7e7bd91'
// const lang = 'ua'
// const newUrl= 'https://api.openweathermap.org/data/3.0/onecall?exclude={part}&appid={API key}'
// const oldUrl= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric&lang=${lang}`
// export async function getWeatherData(city) {
//     try {
//         const response = await axios.get(
//             `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric&lang=${lang}`
//
//         );
//         return await response.data;
//     } catch (error) {
//        return console.error('Error fetching weather data:', error);
//     }
// }

const  routes = {
    weatherData: `https://api.openweathermap.org/data/2.5/weather?`,
    forecast5: `https://api.openweathermap.org/data/2.5/forecast?`,
}

export async function getWeatherData(params) {
    try {
        const url = `${routes.forecast5}${mapQueryParams(params)}&appid=${APIkey}`
        const response = await axios.get(url);
        return await response.data;
    } catch (error) {
        return console.error('Error fetching weather data:', error);
    }
}


function mapQueryParams(params) {
    const queryParams = new URLSearchParams(Object.entries(params));

    return queryParams.toString();
}


