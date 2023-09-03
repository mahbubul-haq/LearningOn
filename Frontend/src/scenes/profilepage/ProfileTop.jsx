import React from "react";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import BreadCrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import FlexBetween from "../../components/FlexBetween";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../../components/StyledButton";
import { useSelector } from "react-redux"

const ProfileTop = ({ userInfo }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);

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



    return (
        <Box
            sx={{
                width: "100%",
                padding: "2rem 5rem 0rem 5rem",
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
                    marginTop: "-2rem",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-end",
                }}
            >
                <img
                    src={
                        userInfo?.picturePath
                            ? `${import.meta.env.VITE_REACT_APP_URL}/images/${
                                  userInfo?.picturePath
                              }`
                            : "/images/dummyPerson.jpeg"
                    }
                    style={{
                        width: "180px",
                        height: "180px",
                        objectFit: "cover",
                        borderRadius: "50%",
                        // thumbnail
                        boxShadow: "0 0 0 5px rgba(0, 0, 0, 0.2)",
                        transform: "translateY(40%)",
                    }}
                    alt="profile"
                />
                <FlexBetween
                    sx={{
                        marginLeft: "2rem",
                        mb: "1rem",
                        flexGrow: 1,
                        alignItems: "flex-end",
                    }}
                >
                    <FlexBetween
                        sx={{
                            "&&": {
                                flexDirection: "column",
                                gap: "0.5rem",
                                alignItems: "flex-start",
                            },
                        }}
                    >
                        <Typography
                            sx={{ fontSize: "1.5rem", fontWeight: "bold" }}
                        >
                            {userInfo?.name}
                        </Typography>
                        <Typography sx={{ fontSize: "1rem" }}>
                            {getQualifications()}
                        </Typography>
                    </FlexBetween>
                    <StyledButton
                        sx={{
                            "&&": {
                                px: "2rem",
                            },
                        }}
                    >
                        {userInfo?._id == user?._id ? "Edit Profile" : "Follow"}
                    </StyledButton>
                </FlexBetween>
            </Box>
        </Box>
    );
};

export default ProfileTop;
