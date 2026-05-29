
const useCoursePageReviews = () => {
    const { allReviews, allReviewsLoading, fetchAllReviews } = useContext(CoursePageContext);
    return { allReviews, allReviewsLoading, fetchAllReviews };
}