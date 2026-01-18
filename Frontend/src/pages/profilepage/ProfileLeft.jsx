import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import useTheme from "@mui/material/styles/useTheme";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import { StyledButton } from "../../components/StyledButton";
import { ProfilePageContext } from "../../state/ProfilePageContext";
import { setLogout } from "../../state/reduxStore/authSlice";

const ProfileLeft = ({ userInfo }) => {
    const theme = useTheme();
    const { openedTab, setOpenedTab } = useContext(ProfilePageContext);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                // backgroundColor: theme.palette
                width: "100%",
            }}
        >
            <Box
                sx={{
                    padding: "0.5rem 0", // Removed h-padding as parent has it, or keep minimal
                }}
            >
                <MenuList
                    sx={{
                        "& .MuiMenuItem-root": {
                            color: theme.palette.text.secondary,
                            fontSize: "1rem",
                            borderRadius: "8px", // Add radius
                            margin: "0.2rem 1rem", // Add spacing
                            padding: "0.7em 1rem",
                            transition: "all 0.2s ease",
                            "&:hover": {
                                backgroundColor: theme.palette.action.hover || "rgba(255, 255, 255, 0.05)",
                                color: theme.palette.text.primary,
                            },
                        },
                    }}
                >
                    {userInfo?._id == user?._id && (
                        <MenuItem
                            component="a"
                            href="#profile-wallet"
                            onClick={() => {
                                setOpenedTab("wallet");
                            }}
                            sx={{
                                backgroundColor: openedTab === "wallet" ? "rgba(69, 34, 186, 0.1)" : "transparent",
                                color: openedTab === "wallet" ? theme.palette.primary.main : "inherit",
                            }}
                        >
                            <FlexBetween
                                sx={{
                                    width: "100%",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "1rem",
                                        fontWeight: openedTab === "wallet" ? "600" : "400",
                                    }}
                                >
                                    Wallet
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "1rem",
                                        fontWeight: "600",
                                    }}
                                >
                                    $ {userInfo?.wallet || "0"}
                                </Typography>
                            </FlexBetween>
                        </MenuItem>
                    )}

                    <MenuItem
                        component="a"
                        href="#profile-about"
                        onClick={() => {
                            setOpenedTab("profile");
                        }}
                        sx={{
                            fontWeight: openedTab === "profile" ? "600" : "400",
                            backgroundColor: openedTab === "profile" ? "rgba(69, 34, 186, 0.1)" : "transparent",
                            color: openedTab === "profile" ? theme.palette.primary.main : "inherit",
                        }}
                    >
                        About
                    </MenuItem>

                    <MenuItem
                        component="a"
                        href="#profile-courses"
                        onClick={() => {
                            setOpenedTab("courses");
                        }}
                        sx={{
                            fontWeight: openedTab === "courses" ? "600" : "400",
                            backgroundColor: openedTab === "courses" ? "rgba(69, 34, 186, 0.1)" : "transparent",
                            color: openedTab === "courses" ? theme.palette.primary.main : "inherit",
                        }}
                    >
                        <FlexBetween
                            sx={{
                                width: "100%",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "1rem",
                                    fontWeight: openedTab === "courses" ? "600" : "400",
                                }}
                            >
                                Courses
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "1rem",
                                    fontWeight: "600",
                                }}
                            >
                                {userInfo?.courses?.reduce((acc, course) => acc + (course.courseStatus == "draft" ? 0 : 1), 0) || "0"}
                            </Typography>
                        </FlexBetween>
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            setOpenedTab("blogs");
                        }}
                        sx={{
                            fontWeight: openedTab === "blogs" ? "600" : "400",
                            backgroundColor: openedTab === "blogs" ? "rgba(69, 34, 186, 0.1)" : "transparent",
                            color: openedTab === "blogs" ? theme.palette.primary.main : "inherit",
                        }}
                    >
                        <FlexBetween
                            sx={{
                                width: "100%",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "1rem",
                                    fontWeight: openedTab === "blogs" ? "600" : "400",
                                }}
                            >
                                Blogs
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "1rem",
                                    fontWeight: "600",
                                }}
                            >
                                {userInfo?.blogs?.length || "0"}
                            </Typography>
                        </FlexBetween>
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            setOpenedTab("tutoring");
                        }}
                        sx={{
                            fontWeight: openedTab === "tutoring" ? "600" : "400",
                            backgroundColor: openedTab === "tutoring" ? "rgba(69, 34, 186, 0.1)" : "transparent",
                            color: openedTab === "tutoring" ? theme.palette.primary.main : "inherit",
                        }}
                    >
                        <FlexBetween
                            sx={{
                                width: "100%",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "1rem",
                                    fontWeight: openedTab === "tutoring" ? "600" : "400",
                                }}
                            >
                                Tutoring
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "1rem",
                                    fontWeight: "600",
                                }}
                            >
                                {userInfo?.tutoring?.length || "0"}
                            </Typography>
                        </FlexBetween>
                    </MenuItem>
                    <MenuItem
                        component="a"
                        href="#profile-followers"
                        onClick={() => {
                            setOpenedTab("followers");
                        }}
                        sx={{
                            fontWeight: openedTab === "followers" ? "600" : "400",
                            backgroundColor: openedTab === "followers" ? "rgba(69, 34, 186, 0.1)" : "transparent",
                            color: openedTab === "followers" ? theme.palette.primary.main : "inherit",
                        }}
                    >
                        <FlexBetween
                            sx={{
                                width: "100%",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "1rem",
                                    fontWeight: openedTab === "followers" ? "600" : "400",
                                }}
                            >
                                Followers
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "1rem",
                                    fontWeight: "600",
                                }}
                            >
                                {userInfo?.followers?.length || "0"}
                            </Typography>
                        </FlexBetween>
                    </MenuItem>
                    <MenuItem
                        component="a"
                        href="#profile-following"
                        onClick={() => {
                            setOpenedTab("following");
                        }}
                        sx={{
                            fontWeight: openedTab === "following" ? "600" : "400",
                            backgroundColor: openedTab === "following" ? "rgba(69, 34, 186, 0.1)" : "transparent",
                            color: openedTab === "following" ? theme.palette.primary.main : "inherit",
                        }}
                    >
                        <FlexBetween
                            sx={{
                                width: "100%",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "1rem",
                                    fontWeight: openedTab === "following" ? "600" : "400",
                                }}
                            >
                                Following
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "1rem",
                                    fontWeight: "600",
                                }}
                            >
                                {userInfo?.following?.length || "0"}
                            </Typography>
                        </FlexBetween>
                    </MenuItem>
                </MenuList>
                {userInfo?._id == user?._id && (
                    <>
                        <Divider
                            sx={{
                                mt: "0.5rem",
                            }}
                        />

                        <StyledButton
                            sx={{
                                mt: "1rem",
                                mb: "0.5rem",
                                "&&": {
                                    width: "90%",
                                    mx: "auto",
                                    display: "block",
                                    backgroundColor: theme.palette.grey.grey200,
                                    "&:hover": {
                                        backgroundColor: theme.palette.grey.grey300,
                                    },
                                },
                            }}
                            onClick={() => {
                                dispatch(setLogout());
                                navigate("/");
                            }}
                        >
                            Log out
                        </StyledButton>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default ProfileLeft;
