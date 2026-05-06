const buildTimeBoundaries = (startDate, endDate, points = 7) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // validate inputs
    if (
        isNaN(start.getTime()) ||
        isNaN(end.getTime()) ||
        start > end ||
        points < 2
    ) {
        return {
            boundaries: [],
            start: null,
            end: null,
        };
    }

    // special case: same instant (same day / same timestamp)
    if (start.getTime() === end.getTime()) {
        start.setDate(start.getDate() - 1); // move back 1 day
    }

    const diff = end.getTime() - start.getTime();
    const step = diff / (points - 1);

    const boundaries = [];

    for (let i = 0; i < points; i++) {
        boundaries.push(new Date(start.getTime() + step * i));
    }

    return {
        boundaries,
        start,
        end,
    };
};

export {
    buildTimeBoundaries,
}