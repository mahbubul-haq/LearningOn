import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';
import { useSelector } from 'react-redux';
import { isPurchased } from '../../utils/course';
import TopSectionLarge from './TopSectionLarge';
import TopSectionSmall from './TopSectionSmall';


const TopSection = ({
    courseInfo,
}) => {

    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const { user, token } = useSelector((state) => state.auth);

    const [purchased, setPurchased] = React.useState(
        courseInfo?.enrolledStudents?.reduce((cur, enrollMent) => {
            return cur || enrollMent.userId == user?._id;
        }, false)
    );

    React.useEffect(() => {
        //console.log(user, courseInfo);
        if (user && courseInfo) {
            setPurchased(isPurchased(user, courseInfo));
        }
    }, [user, courseInfo]);

    const enrollCourse = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_URL}/data/create-payment-sesson`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": token,
                    },
                    body: JSON.stringify({
                        courseId: courseInfo._id,
                    }),
                }
            );
            const data = await response.json();
            if (data.success) {
                window.location = data.url;
            }
            console.log(data);
        } catch (e) {
            //console.log(e);
            console.log(e);
        }
    };


  return (
    <>
        {isNonMobileScreens ? <TopSectionLarge
            courseInfo={courseInfo}
            purchased={purchased}
            enrollCourse={enrollCourse}
        /> : <TopSectionSmall
            courseInfo={courseInfo}
            purchased={purchased}
            enrollCourse={enrollCourse}
        />}
    </>
  )
}

export default TopSection