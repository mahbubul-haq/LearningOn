import React from "react";
import Box from "@mui/material/Box";
import FlexBetween from "./FlexBetween";
import Typography from "@mui/material/Typography";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useSelector } from "react-redux";
import { ProfilePageContext } from "../state/ProfilePageContext";
import { useNavigate } from "react-router-dom";

const ProfileCard = ({ userInfo }) => {
    const user = useSelector((state) => state.user);
    const { follow, setFollowingDone } = React.useContext(ProfilePageContext);
    const navigate = useNavigate();

    const isFollowing = () => {
        if (user?.following?.length > 0) {
            return user?.following?.reduce((prev, cur) => {
                if (cur._id === userInfo?._id) {
                    return true;
                } else {
                    return prev;
                }
            });
        } else {
            return false;
        }
    };

    return (
        <Box
            sx={{
                width: "100%",
                padding: "1rem",
                borderRadius: "0.5rem",
                backgroundColor: "white",
            }}
        >
            <FlexBetween>
                <FlexBetween
                    sx={{
                        gap: "1rem",
                    }}
                >
                    <img
                        src={`${import.meta.env.VITE_SERVER_URL}/images/${userInfo?.picturePath}`}
                        alt="profile"
                        style={{
                            width: "3rem",
                            height: "3rem",
                            borderRadius: "50%",
                            objectFit: "cover",
                        }}
                    />
                    <Typography
                        sx={{
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            cursor: "pointer",
                            "&:hover": {
                                textDecoration: "underline",
                            },
                        }}
                        onClick={() => {
                            navigate(`/profile/${userInfo?._id}`);
                        }}
                    >
                        {userInfo?.name}
                    </Typography>
                </FlexBetween>
                <FlexBetween
                    title={isFollowing() ? "Unfollow" : "Follow"}
                    sx={{
                        color: (theme) => theme.palette.grey.grey400,
                        cursor: "pointer",
                        "&:hover": {
                            color: (theme) => theme.palette.grey.grey600,
                        },
                        gap: "0.5rem",
                    }}
                    onClick={() => {
                        setFollowingDone(false);
                        follow(userInfo?._id);
                    }}
                >
                    {/* {!isMobileScreens && <Typography sx={{ fontSize: "0.9rem" }}>{isFollowing() ? "Unfollow" : "Follow"}</Typography>} */}
                    {isFollowing ? (
                        <PersonRemoveIcon
                            sx={{
                                fontSize: "1.4rem",
                            }}
                        />
                    ) : (
                        <PersonAddAlt1Icon
                            sx={{
                                fontSize: "1.4rem",
                            }}
                        />
                    )}
                </FlexBetween>
            </FlexBetween>
        </Box>
    );
};

export default ProfileCard;
