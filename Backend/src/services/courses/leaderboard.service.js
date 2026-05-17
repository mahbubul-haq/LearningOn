function computeScore(course, avgRatingGlobal, todayKey, alpha = 0.45, m = 15) {
    const v = course.ratings.numberOfRatings || 0;
    const R =
        v === 0
            ? 0
            : course.ratings.totalRating / v;

    // Bayesian rating (quality)
    const WR =
        (v / (v + m)) * R +
        (m / (v + m)) * avgRatingGlobal;

    const recent = getLast20DaysTotalEnrollments(course, todayKey);
    const total = course.enrolledStudentsCount || 0;

    // engagement (popularity)
    const trendRatio = recent / (total + 1);

    const popularity =
        Math.log10(total + 1) +
        Math.log10(recent + 1) * 0.5 +
        trendRatio * 2;
    return alpha * WR + (1 - alpha) * popularity;
}

// course.service.js

function getLast20DaysTotalEnrollments(course, todayKey) {

    if (!course?.trendDayKeys?.length || !course?.enrollmentTrend?.length) return 0;
    let sum = 0;

    for (let i = 0; i < 20; i++) {
        if (todayKey - course.trendDayKeys[i] <= 20) {
            sum += course.enrollmentTrend[i];
        }
    }

    return sum;
}

export {
    computeScore,
    getLast20DaysTotalEnrollments
}