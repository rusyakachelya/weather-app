
export function saveWeatherData(cityName, key) {
    // Получаем текущий массив из локального хранилища
    const cityNamesArray = JSON.parse(localStorage.getItem(key)) || [];

    // Проверяем, что cityName отсутствует в массиве, чтобы избежать дублирования
    if (!cityNamesArray.includes(cityName)) {
        // Добавляем новое название города в массив
        cityNamesArray.unshift(cityName);

        // Сохраняем обновленный массив в локальное хранилище
        localStorage.setItem(key, JSON.stringify(cityNamesArray));
    }
}

export  function getWeatherData(cityName) {
    const apiKey = "0e0e2c39bdb37bd50226a51ba7e7bd91"; // Замените на свой API ключ OpenWeatherMap
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;

    // Возвращаем промис для данных о погоде для одного города
    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        });
}



export function getSavedCities(key) {
    const savedData = JSON.parse(localStorage.getItem(key)) || [];
    return savedData;
}

export function getWeatherDataForCities(cityNames) {
    // Создаем массив промисов для каждого города
    const promises = cityNames.map(cityName => getWeatherData(cityName));

    // Возвращаем промис, который разрешится массивом данных о погоде для всех городов
    return Promise.all(promises);
}
