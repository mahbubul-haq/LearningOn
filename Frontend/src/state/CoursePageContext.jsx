import { createContext, useState } from "react";

export const CoursePageContext = createContext();

export const CoursePageState = (props) => {
    const [relatedCourses, setRelatedCourses] = useState([]);
    const [relatedCoursesLoading, setRelatedCoursesLoading] = useState(false);
    const [allReviews, setAllReviews] = useState([]);
    const [allReviewsLoading, setAllReviewsLoading] = useState(false);
    const [myReview, setMyReview] = useState(null);
    const [myReviewLoading, setMyReviewLoading] = useState(false);
    const [isReviewSubmitting, setIsReviewSubmitting] = useState(false);

    const fetchRelatedCourses = async (category, courseId, token) => {

        setRelatedCoursesLoading(true);
        let encodedCategory = encodeURIComponent(category);

        try {
            let response = await fetch(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/courses?category=${encodedCategory}&courseId=${courseId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": token,
                    },
                }
            );

            let data = await response.json();

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
        setMyReviewLoading(true);
        try {
            let response = await fetch(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/courses/${courseId}/reviews/me`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": token,
                    },
                }
            );

            let data = await response.json();

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

    const fetchAllReviews = async (courseId, token) => {
        setAllReviewsLoading(true);
        try {
            let response = await fetch(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/courses/${courseId}/reviews?page=1&limit=5&includeUserReview=true`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": token,
                    },
                }
            );

            let data = await response.json();

            if (data.success) {
                setAllReviews(data.reviews);
                setMyReview(data.userReview);
            }
            else {
                setAllReviews([]);
                setMyReview(null);
            }

        } catch (err) {
            // console.error("Failed to fetch all reviews:", err);
            setAllReviews([]);
            setMyReview(null);
        } finally {
            setAllReviewsLoading(false);
        }
    };

    const handleSubmitReview = async (courseId, rating, review, token) => {
        setIsReviewSubmitting(true);
        try {
            let response = await fetch(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/courses/${courseId}/reviews`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": token,
                    },
                    body: JSON.stringify({
                        rating,
                        review,
                    }),
                }
            );

            let data = await response.json();

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
            isReviewSubmitting
        }}>
            {props.children}
        </CoursePageContext.Provider>
    );
}

