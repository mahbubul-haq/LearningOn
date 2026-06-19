import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';
import { useSelector } from 'react-redux';
import TopSectionLarge from './TopSectionLarge';
import TopSectionSmall from './TopSectionSmall';
import { apiFetch } from '../../api/apiFetch';
import { useEnrollmentStatus } from './hooks/CoursePageHooks';

const TopSection = ({
    courseInfo,
}) => {

    const isNonMobileScreens = useMediaQuery("(min-width: 900px)");

    const { user, token } = useSelector((state) => state.auth);

    const { data: enrollmentStatus } = useEnrollmentStatus(courseInfo?._id, user, token);
    console.log("enrollmentStatus", enrollmentStatus);

    const enrollCourse = async () => {
        try {
            console.log("Enrolling in course:", courseInfo._id);
            const data = await apiFetch({
                url: `/data/create-payment-sesson`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    courseId: courseInfo._id,
                },
            });
            console.log("Payment session response:", data);

            if (data.success) {
                console.log("Redirecting to Stripe checkout:", data.url);
                window.location = data.url;
            } else {
                // Show error message to user
                console.error("Payment session creation failed:", data.message);
                alert(data.message || "Unable to process payment. Please try again later.");
            }
        } catch (e) {
            console.error("Error enrolling in course:", e);
            alert("An error occurred while processing your enrollment. Please try again.");
        }
    };


    return (
        <>
            {isNonMobileScreens ? <TopSectionLarge
                courseInfo={courseInfo}
                enrollCourse={enrollCourse}
                enrollmentStatus={enrollmentStatus}
                user={user}
            /> : <TopSectionSmall
                courseInfo={courseInfo}
                enrollCourse={enrollCourse}
                enrollmentStatus={enrollmentStatus}
                user={user}
            />}
        </>
    )
}

export default TopSection