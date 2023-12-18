export function groupAndSortData(dataArray) {
    const groupedData = {};

    // Group data by day
    dataArray.forEach((data) => {
        const date = new Date(data.dt_txt);
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

        if (!groupedData[dayOfWeek]) {
            groupedData[dayOfWeek] = [];
        }

        groupedData[dayOfWeek].push(data);
    });

    // Sort data within each day by time
    for (const day in groupedData) {
        groupedData[day].sort((a, b) => {
            const timeA = new Date(a.dt_txt).getTime();
            const timeB = new Date(b.dt_txt).getTime();
            return timeA - timeB;
        });
    }

    // Sort days of the week
    const sortedGroupedData = Object.keys(groupedData)
        .sort((a, b) => {
            const days = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',];
            return days.indexOf(a) - days.indexOf(b);
        })
        .reduce((acc, key) => {
            acc[key] = groupedData[key];
            return acc;
        }, {});
    return sortedGroupedData;
}