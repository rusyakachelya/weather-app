
export function getDayOfWeek(inputDate, locale) {
    const dateObject = new Date(inputDate);
    const dayOptions = { weekday: 'long' };
    const dayOfWeek = new Intl.DateTimeFormat(locale, dayOptions).format(dateObject);
    return dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
}

export function getDayOfMonth(inputDate) {
    const dateObject = new Date(inputDate);
    const dayOfMonth = dateObject.getDate();
    return dayOfMonth;
}

export function getMonthInfo(inputDate, locale) {
    const dateObject = new Date(inputDate);

    const monthOptions = { month: 'long', day: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat(locale, monthOptions).format(dateObject);

    const [day, monthName] = formattedDate.split(' ');
    console.log(locale)

    if (locale === 'en-US') {
        return day ;
    }

    return monthName;
}



