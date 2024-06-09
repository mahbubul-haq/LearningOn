import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import { useContext } from "react";
import { ProfilePageContext } from "../../state/ProfilePageContext";
import { useSelector } from "react-redux";
import FlexBetween from "../../components/FlexBetween";
import Typography from "@mui/material/Typography";
import { StyledButton } from "../../components/StyledButton";
import { Divider } from "@mui/material";
import { useDispatch } from "react-redux";
import { setLogout } from "../../state";
import { useNavigate } from "react-router-dom";

const ProfileLeft = ({ userInfo }) => {
    const theme = useTheme();
    const { openedTab, setOpenedTab } = useContext(ProfilePageContext);
    const { user } = useSelector((state) => state);
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
                    padding: "0.5rem 1rem",
                    backgroundColor: theme.palette.background.light200,
                }}
            >
                <MenuList
                    sx={{
                        "& .MuiMenuItem-root": {
                            color: theme.palette.grey.grey700,
                            fontSize: "1rem",
                            // fontWeight: "600",
                            padding: "0.7em 1rem",
                            "&:hover": {
                                backgroundColor: theme.palette.background.light300,
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
                                backgroundColor: openedTab === "wallet" ? theme.palette.background.light300 : "transparent",
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
                            backgroundColor: openedTab === "profile" ? theme.palette.background.light300 : "transparent",
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
                            backgroundColor: openedTab === "courses" ? theme.palette.background.light300 : "transparent",
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
                            backgroundColor: openedTab === "blogs" ? theme.palette.background.light300 : "transparent",
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
                            backgroundColor: openedTab === "tutoring" ? theme.palette.background.light300 : "transparent",
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
                            backgroundColor: openedTab === "followers" ? theme.palette.background.light300 : "transparent",
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
                            backgroundColor: openedTab === "following" ? theme.palette.background.light300 : "transparent",
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
                                    width: "100%",
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
