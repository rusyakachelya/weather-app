import {getWeatherData} from "@/services/api/getWeather";

export function getWeatherDataForCities(cityIds, currentLocale ) {
    const promises = cityIds.map(cityId => getWeatherData({
        id: cityId,
        units: 'metric',
        lang: currentLocale
    }));

    return Promise.all(promises);
}

