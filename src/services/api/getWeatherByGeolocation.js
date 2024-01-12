import {getWeatherData} from "@/services/api/getWeather";
import {groupAndSortData} from "@/helpers/groupAndSortData";
export function getWeatherByGeolocation(currentLocale) {
    return new Promise((resolve, reject) => {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        };

        const ACCESS_KEY = 'e719fbe98f20e247228fa919e2ad2a20';

        const getServiceUrl = () => {
            return 'http://api.ipstack.com/check';
        };
        const success = async () => {
            try {
                const url = `${getServiceUrl()}?access_key=${ACCESS_KEY}`;
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Failed to fetch location data');
                }

                const { city } = await response.json();
                const data = await getWeatherData(  {
                    q: city,
                    units: 'metric',
                    lang: currentLocale
                });

                const updatedData = {
                    code: data['city']['name'],
                    list: groupAndSortData(data.list),
                };

                resolve(updatedData);
            } catch (error) {
                console.error('Error fetching weather data:', error);
                reject(error);
            }
        };

        const error = (err) => {
            console.log(err.message);
            reject(err);
        };

        navigator.geolocation.getCurrentPosition(success, error, options);
    });
}
