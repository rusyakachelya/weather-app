import axios from "axios";
import {mapQueryParams} from "@/services/api/getWeather";

const apiKey = '0e0e2c39bdb37bd50226a51ba7e7bd91';
const routes = {
    direct: '/direct?'
}
const getServiceUrl = () => {
    return 'https://api.openweathermap.org/geo/1.0'
}


export async function getCitySuggestions(query, currentLocale) {


    const url = `${getServiceUrl()}${routes.direct}${mapQueryParams(  {
        q: query,
        limit: 5,
        appid: apiKey,
        lang: currentLocale
    })}&appid=${apiKey} `;

    try {
        const response = await axios.get(url);
        return response.data.map(city => {
            return {
                city: city.name,
                country: city.country,
                state: city.state || ''
            }
        });
    } catch (error) {
        console.error('Error fetching city suggestions:', error);
        return [];
    }
}