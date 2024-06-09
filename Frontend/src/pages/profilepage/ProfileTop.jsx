import React from "react";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import BreadCrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import FlexBetween from "../../components/FlexBetween";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../../components/StyledButton";
import { useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ProfilePageContext } from "../../state/ProfilePageContext";
import { GlobalContext } from "../../state/GlobalContext";

const ProfileTop = ({ userInfo }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const isMobileScreens = useMediaQuery("(max-width: 600px)");
    const { follow, followingDone, setFollowingDone } = React.useContext(ProfilePageContext);
    const { getUserById, getUser } = React.useContext(GlobalContext);

    const getQualifications = () => {
        let qualifications = [];

        if (userInfo?.learning?.length > 0) {
            qualifications.push("Student");
        }
        if (userInfo?.courses?.length > 0) {
            qualifications.push("Instructor");
        }
        if (userInfo?.tutoring?.length > 0) {
            qualifications.push("Tutor");
        }
        if (userInfo?.blogs?.length > 0) {
            qualifications.push("Blogger");
        }

        if (qualifications.length === 0) {
            qualifications.push("Student");
        }
        return qualifications.join(", ");
    };

    React.useEffect(() => {
        if (followingDone) {
            getUserById(userInfo?._id);
            getUser();
            setFollowingDone(false);
        }
    }, [followingDone]);

    return (
        <Box
            sx={{
                width: "100%",
                padding: isNonMobileScreens ? "2rem 5rem 0rem 5rem" : isMobileScreens ? "1rem 1rem 0 1rem" : "2rem 2rem 0rem 2rem",
                backgroundColor: theme.palette.background.bottom,
                backgroundImage: `linear-gradient(to bottom, ${theme.palette.background.top}, ${theme.palette.background.bottom})`,
            }}
        >
            <BreadCrumbs
                sx={{
                    color: theme.palette.grey.grey300,
                    "& .MuiBreadcrumbs-separator": {
                        color: theme.palette.grey.grey300,
                    },
                }}
                aria-label="breadcrumb"
            >
                <FlexBetween
                    sx={{
                        cursor: "pointer",

                        gap: "0.5rem",
                        "&:hover": {
                            textDecoration: "underline",
                        },
                    }}
                    onClick={() => navigate("/")}
                >
                    <HomeIcon sx={{ fontSize: "1.2rem" }} />
                    <Typography sx={{ fontSize: "1rem" }}>Home</Typography>
                </FlexBetween>
                <Typography sx={{ fontSize: "1rem" }}>Users</Typography>
                <Typography sx={{ fontSize: "1rem" }}>Profile</Typography>
                <Typography
                    sx={{
                        fontSize: "1rem",
                        cursor: "pointer",
                        color: theme.palette.grey.grey600,
                        "&:hover": {
                            textDecoration: "underline",
                        },
                    }}
                    onClick={() => navigate("/profile/" + userInfo?._id)}
                >
                    {userInfo?.name}
                </Typography>
            </BreadCrumbs>

            <Box
                sx={{
                    marginTop: isNonMobileScreens ? "-2rem" : isMobileScreens ? "1rem" : "-1rem",
                    display: "flex",
                    justifyContent: isMobileScreens ? "space-between" : "flex-start",
                    alignItems: "flex-end",
                    width: "100%",
                    // border: "1px solid #ccc",
                }}
            >
                <img
                    src={userInfo?.picturePath ? `${import.meta.env.VITE_SERVER_URL}/images/${userInfo?.picturePath}` : "/images/dummyPerson.jpeg"}
                    style={{
                        width: isNonMobileScreens ? "180px" : isMobileScreens ? "120px" : "130px",
                        height: isNonMobileScreens ? "180px" : isMobileScreens ? "120px" : "130px",
                        objectFit: "cover",
                        borderRadius: "50%",
                        // thumbnail
                        boxShadow: "0 0 0 5px rgba(0, 0, 0, 0.2)",
                        transform: isMobileScreens ? "translateY(20%)" : "translateY(40%)",
                    }}
                    alt="profile"
                />
                <FlexBetween
                    sx={{
                        marginLeft: "2rem",
                        mb: isNonMobileScreens ? "1rem" : "0.5rem",
                        flexGrow: 1,
                        "&&": {
                            justifyContent: isMobileScreens ? "flex-end": "space-between",
                        },
                        alignItems: "flex-end",
                    }}
                >
                    {!isMobileScreens && (
                        <FlexBetween
                            sx={{
                                "&&": {
                                    flexDirection: "column",
                                    gap: "0.5rem",
                                    alignItems: "flex-start",
                                },
                            }}
                        >
                            <Typography sx={{ fontSize: isNonMobileScreens ? "1.5rem" : "1.2rem", fontWeight: "bold" }}>{userInfo?.name}</Typography>
                            <Typography sx={{ fontSize: "1rem" }}>{getQualifications()}</Typography>
                        </FlexBetween>
                    )}
                    <StyledButton
                        sx={{
                            "&&": {
                                px: isMobileScreens ? "1rem" : "2rem",
                            },
                        }}
                        onClick={() => {
                            if (userInfo?._id == user?._id) {
                                navigate("/profile/edit");
                            } else {
                                setFollowingDone(false);
                                follow(userInfo?._id);
                            }
                        }}
                    >
                        {userInfo?._id == user?._id
                            ? "Edit Profile"
                            : userInfo?.followers.length > 0 &&
                              userInfo?.followers?.reduce((prev, cur) => {
                                  if (cur._id == user?._id) {
                                      return true;
                                  }
                                  return prev || false;
                              })
                            ? "Unfollow"
                            : "Follow"}
                    </StyledButton>
                </FlexBetween>
            </Box>
        </Box>
    );
};

export default ProfileTop;
