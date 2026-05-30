import { createContext, useState, useEffect, useRef } from "react";
import { apiFetch } from "../api/apiFetch";

export const CoursePageContext = createContext();

export const CoursePageState = (props) => {
    const [relatedCourses, setRelatedCourses] = useState([]);
    const [relatedCoursesLoading, setRelatedCoursesLoading] = useState(false);
    const [allReviews, setAllReviews] = useState([]);
    const [allReviewsLoading, setAllReviewsLoading] = useState(false);
    const [myReview, setMyReview] = useState(null);
    const [myReviewLoading, setMyReviewLoading] = useState(false);
    const [isReviewSubmitting, setIsReviewSubmitting] = useState(false);
    const [isLearningCompleted, setIsLearningCompleted] = useState(false);
    const [dynamicRating, setDynamicRating] = useState(null);
    const userReviewInAllReviews = useRef(false);
    const previousRating = useRef({ rating: 0, review: "" });

    const fetchRelatedCourses = async (category, courseId, token) => {

        setRelatedCoursesLoading(true);
        // let encodedCategory = encodeURIComponent(category);

        try {
            let data = await apiFetch({
                url: `/api/v1/courses`,
                method: 'GET',
                params: {
                    category: category,
                    courseId: courseId
                },
            });

            if (data.success) {
                setRelatedCourses([...data.courses]);
            }
            else {
                setRelatedCourses([]);
            }

        } catch (err) {
            // console.error("Failed to fetch related courses:", err);
            setRelatedCourses([]);
        } finally {
            setRelatedCoursesLoading(false);
        }
    };

    const fetchMyReview = async (courseId, token) => {
        console.log("fetch my review called")
        setMyReviewLoading(true);
        try {
            let data = await apiFetch({
                url: `/api/v1/courses/${courseId}/reviews/me`,
                method: 'GET',
            });

            if (data.success) {
                setMyReview(data.courseRating);
            }
            else {
                setMyReview(null);
            }

        } catch (err) {
            // console.error("Failed to fetch my review:", err);
            setMyReview(null);
        } finally {
            setMyReviewLoading(false);
        }
    };

    const fetchAllReviews = async (courseId, userId) => {
        setAllReviewsLoading(true);
        setIsLearningCompleted(false);
        try {
            let data = await apiFetch({
                url: `/api/v1/courses/${courseId}/reviews`,
                method: 'GET',
                params: {
                    page: 1,
                    limit: 5,
                    includeUserReview: !!userId,
                    userId: userId,
                }

            });

            if (data.success) {
                setAllReviews(data.reviews);

                setIsLearningCompleted(data.isLearningCompleted);
                if (data.userReview) {
                    userReviewInAllReviews.current = true;
                    previousRating.current = { rating: data.userReview?.rating, review: data.userReview?.review };
                } else {
                    userReviewInAllReviews.current = false;
                    previousRating.current = { rating: 0, review: "" };
                }

                setMyReview(data.userReview);
                return data.reviews;

            }
            else {
                setAllReviews([]);
                setMyReview(null);
                setIsLearningCompleted(false);
                userReviewInAllReviews.current = false;
                return [];
            }

        } catch (err) {
            // console.error("Failed to fetch all reviews:", err);
            setAllReviews([]);
            setMyReview(null);
            setIsLearningCompleted(false);
            userReviewInAllReviews.current = false;
            return [];
        } finally {
            setAllReviewsLoading(false);
        }
    };

    const getDynamicRating = (courseInfo) => {
        if (!courseInfo) {
            setDynamicRating({
                rating: 0,
                totalRating: 0,
                numberOfRatings: 0,
                reviewCountWithText: 0
            })
            return;
        }

        let totalRating = courseInfo.ratings?.totalRating;
        let numberOfRatings = courseInfo.ratings?.numberOfRatings;
        let reviewCountWithText = courseInfo.ratings?.reviewCountWithText;


        if (!userReviewInAllReviews.current && myReview) {
            if (myReview?.rating) totalRating += myReview.rating;
            if (myReview?.review) reviewCountWithText++;
            numberOfRatings++;
        }
        else if (userReviewInAllReviews.current && myReview) {
            totalRating += myReview.rating - previousRating.current.rating;
            reviewCountWithText += (!previousRating.current.review && myReview.review ? 1 :
                previousRating.current.review && !myReview.review ? -1 :
                    0)
        }

        setDynamicRating({
            rating: numberOfRatings > 0 ? Math.round(((totalRating || 0) / numberOfRatings) * 10) / 10 : 0,
            totalRating: totalRating || 0,
            numberOfRatings,
            reviewCountWithText: reviewCountWithText || 0
        });
    }

    const handleSubmitReview = async (courseId, rating, review, token) => {
        setIsReviewSubmitting(true);
        try {
            let data = await apiFetch({
                url: `/api/v1/courses/${courseId}/reviews`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    rating,
                    review,
                },
            });

            // let data = await response.json();

            if (data.success) {
                setMyReview(data.courseRating);

            }
            else {

                setMyReview(null);
            }

        } catch (err) {
            // console.error("Failed to submit review:", err);
            setMyReview(null);
        } finally {
            setIsReviewSubmitting(false);
        }
    };

    return (
        <CoursePageContext.Provider value={{
            relatedCourses,
            setRelatedCourses,
            relatedCoursesLoading,
            setRelatedCoursesLoading,
            fetchRelatedCourses,
            allReviews,
            allReviewsLoading,
            fetchAllReviews,
            myReview,
            myReviewLoading,
            fetchMyReview,
            handleSubmitReview,
            isReviewSubmitting,
            isLearningCompleted,
            getDynamicRating,
            dynamicRating,
        }}>
            {props.children}
        </CoursePageContext.Provider>
    );
}

