import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import FlexBetween from "../../components/FlexBetween";
import { ProfilePageContext } from "../../state/ProfilePageContext";
import Followers from "./Followers";
import ProfileCourses from "./ProfileCourses";
import Wallet from "./Wallet";

const ProfileRight = ({ userInfo }) => {
    const { openedTab } = useContext(ProfilePageContext);
    const user = useSelector((state) => state.auth.user);
    const isMobileScreens = useMediaQuery("(max-width: 600px)");

    useEffect(() => {
        console.log(openedTab);
        console.log(user);
    }, [openedTab]);

    return (
        <Box
            sx={{
                padding: "0rem",
                pb: "3rem",
                // border: "2px solid red",
            }}
        >
            {userInfo?._id === user?._id && (
                <Box id="profile-wallet">
                    <Wallet userInfo={userInfo} />
                    <Divider
                        light
                        sx={{
                            color: (theme) => theme.palette.grey.grey400,
                            mt: "1rem",
                        }}
                    />
                </Box>
            )}

            {/* {userInfo?.about && ( */}
            <Box>
                <Typography
                    id="profile-about"
                    sx={{
                        fontWeight: "600",
                        fontSize: "1.2rem",
                        // mb: "1rem",
                        mt: "0.5rem",
                        padding: isMobileScreens ? "1rem 0" : "1rem 2rem",
                    }}
                >
                    About
                </Typography>
                <Typography
                    sx={{
                        fontSize: "0.9rem",
                        lineHeight: "1.5rem",
                        overflowWrap: "anywhere",
                        padding: isMobileScreens ? "0rem" : "0rem 2rem",
                    }}
                >
                    {userInfo?.about ? (
                        <>
                            {" "}
                            {userInfo?.about.split("\n").map((item, key) => {
                                return (
                                    <span key={key}>
                                        {item}
                                        <br />
                                    </span>
                                );
                            })}
                        </>
                    ) : (
                        "No description provided by the user"
                    )}
                </Typography>
                <Divider
                    light
                    sx={{
                        color: (theme) => theme.palette.grey.grey400,
                        mt: "2rem",
                        mb: "1rem",
                    }}
                />
            </Box>

            <Box>
                <FlexBetween
                    sx={{
                        mt: "0rem",
                        mb: "1rem",
                        padding: isMobileScreens ? "1rem 0" : "1rem 2rem",
                    }}
                >
                    <Typography
                        id="profile-courses"
                        sx={{
                            fontWeight: "600",
                            fontSize: "1.2rem",
                            // mb: "1rem",
                        }}
                    >
                        Courses
                    </Typography>
                    <FlexBetween
                        sx={{
                            gap: "0.5rem",
                            cursor: "pointer",
                            color: (theme) => theme.palette.grey.grey500,
                            "&:hover": {
                                color: (theme) => theme.palette.grey.grey700,
                            },
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "0.9rem",

                                fontWeight: "600",
                            }}
                        >
                            Courses
                        </Typography>
                        <OpenInNewIcon
                            sx={{
                                fontSize: "1.2rem",
                            }}
                        />
                    </FlexBetween>
                </FlexBetween>
                <Box
                    sx={{
                        padding: isMobileScreens ? "0rem" : "0rem 2rem",
                    }}
                >
                    <ProfileCourses userCourses={userInfo?.courses} />
                </Box>
                <Divider
                    light
                    sx={{
                        color: (theme) => theme.palette.grey.grey400,
                        mt: "2rem",
                        mb: "1rem",
                    }}
                />
            </Box>

            <Box sx={{}}>
                <Typography
                    id="profile-followers"
                    sx={{
                        fontWeight: "600",
                        fontSize: "1.2rem",
                        // mb: "1rem",
                        mt: "0.5rem",
                        padding: isMobileScreens ? "1rem 0" : "1rem 2rem",
                    }}
                >
                    Followers
                </Typography>
                <Box
                    sx={{
                        margin: isMobileScreens ? "0rem" : "0rem 2rem",
                        maxHeight: "600px",
                        overflowY: "auto",
                    }}
                >
                    <Followers user={userInfo} followers={true} />
                </Box>
                <Divider
                    light
                    sx={{
                        color: (theme) => theme.palette.grey.grey400,
                        mt: "2rem",
                        mb: "1rem",
                    }}
                />
            </Box>

            <Box>
                <Typography
                    id="profile-following"
                    sx={{
                        fontWeight: "600",
                        fontSize: "1.2rem",
                        // mb: "1rem",
                        mt: "0.5rem",
                        padding: isMobileScreens ? "1rem 0" : "1rem 2rem",
                    }}
                >
                    Following
                </Typography>
                <Box
                    sx={{
                        margin: isMobileScreens ? "0rem" : "0rem 2rem",
                        maxHeight: "600px",
                        overflowY: "auto",
                    }}
                >
                    <Followers user={userInfo} followers={false} />
                </Box>
            </Box>

            {/* {openedTab === "profile" && <BasicProfile userInfo={userInfo} />} */}
        </Box>
    );
};

export default ProfileRight;
