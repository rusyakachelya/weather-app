import axios from "axios";

const APIkey = '0e0e2c39bdb37bd50226a51ba7e7bd91'

const  routes = {
    weatherData: `/weather?`,
    forecast5: `/forecast?`,
}

const getServiceUrl = () =>  {
    return 'https://api.openweathermap.org/data/2.5'
}

export async function getWeatherData(params) {
    try {
        const url = `${getServiceUrl()}${routes.forecast5}${mapQueryParams(params)}&appid=${APIkey}`
        const response = await axios.get(url);
        return await response.data;
    } catch (error) {
        return console.error('Error fetching weather data:', error);
    }
}


export function mapQueryParams(params) {
    const queryParams = new URLSearchParams(Object.entries(params));
    return queryParams.toString();
}


