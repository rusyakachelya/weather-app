
export function addToLocalStorage(cityId, key) {
    const cityNamesArray = getItemsFromLocalStorage(key);

    if (!cityNamesArray.includes(cityId)) {
        cityNamesArray.unshift(cityId);
        setItemsToLocalStorage(key,cityNamesArray)
    }
}

export function getItemsFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

export function updateLocalStorage(key, array, value) {
    const updatedArray = array.filter(item => item !== value);
    setItemsToLocalStorage(key, updatedArray);
}

export function setItemsToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

