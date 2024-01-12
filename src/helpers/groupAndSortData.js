export  function groupAndSortData(dataArray) {
    const groupedData = {};

    dataArray.forEach((data) => {
        const date = new Date(data.dt_txt);
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

        if (!groupedData[dayOfWeek]) {
            groupedData[dayOfWeek] = [];
        }

        groupedData[dayOfWeek].push(data);
    });

    for (const day in groupedData) {
        groupedData[day].sort((a, b) => {
            const timeA = new Date(a.dt_txt).getTime();
            const timeB = new Date(b.dt_txt).getTime();
            return timeA - timeB;
        });
    }
    const result = Object.fromEntries(
        Object.keys(groupedData).slice(0, 5).map(day => [day, groupedData[day]])
    );

    return result;

}