import {
    Box,
    Typography,
    AppBar,
    Toolbar,
    IconButton,
    Badge,
} from "@mui/material";
import FlexBetween from "./FlexBetween.jsx";
import { StyledButton, StyledBox1 } from "./StyledButton.jsx";
import { useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";

const Navbar = () => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const isMobileScreens = useMediaQuery("(max-width: 600px)");
    const user = useSelector((state) => state.user);

    return (
        <Box
            sx={{
                flexGrow: 1,
                padding: 0,
                // very light gray boxShadow

                backgroundColor: "white",
            }}
        >
            <AppBar
                sx={{
                    // border: "1px solid green",
                    position: "sticky",
                    top: 0,
                    backgroundColor: "transparent",
                    boxShadow: (theme) =>
                        `0px 4px 8px 0px ${theme.palette.nav.boxShadow}`,
                    padding: isNonMobileScreens
                        ? "0.5rem 1.5rem"
                        : "0rem 1.3rem",
                }}
            >
                <Toolbar
                    sx={{
                        padding: 0,
                        // border: "1px solid red",
                    }}
                >
                    <FlexBetween
                        sx={{
                            flexGrow: 1,
                        }}
                    >
                        <FlexBetween gap="7rem">
                            <Box>
                                <Typography
                                    variant="h2"
                                    component="div"
                                    sx={{
                                        fontWeight: "600",
                                        fontSize: isNonMobileScreens
                                            ? "2rem"
                                            : "1rem",
                                    }}
                                >
                                    LearningOn
                                </Typography>
                            </Box>
                            {isNonMobileScreens && (
                                <FlexBetween
                                    gap="2rem"
                                    sx={{
                                        fontSize: "1.2rem",
                                        color: (theme) =>
                                            theme.palette.text.primary,
                                    }}
                                >
                                    <StyledBox1>
                                        Courses
                                        <ExpandMoreIcon
                                            sx={{
                                                fontSize: "1.5rem",
                                            }}
                                        />
                                    </StyledBox1>
                                    <StyledBox1>
                                        Blogs
                                        <ExpandMoreIcon
                                            sx={{
                                                fontSize: "1.5rem",
                                            }}
                                        />
                                    </StyledBox1>
                                    <StyledBox1>
                                        Tutors
                                        <ExpandMoreIcon
                                            sx={{
                                                fontSize: "1.5rem",
                                            }}
                                        />
                                    </StyledBox1>
                                </FlexBetween>
                            )}
                        </FlexBetween>
                        <FlexBetween>
                            {isNonMobileScreens ? (
                                <>
                                    <FlexBetween gap="0.6rem">
                                        {user ? (
                                            <>
                                                <Badge
                                                    badgeContent={4}
                                                    color="secondary"
                                                >
                                                    <IconButton
                                                        sx={{
                                                            color: (theme) =>
                                                                theme.palette
                                                                    .text
                                                                    .primary,
                                                        }}
                                                    >
                                                        <NotificationsIcon
                                                            sx={{
                                                                fontSize:
                                                                    "1.7rem",
                                                            }}
                                                        />
                                                    </IconButton>
                                                </Badge>
                                                <IconButton
                                                    sx={{
                                                        color: (theme) =>
                                                            theme.palette.text
                                                                .primary,
                                                    }}
                                                >
                                                    <AccountCircleIcon
                                                        sx={{
                                                            fontSize: "1.7rem",
                                                        }}
                                                    />
                                                </IconButton>
                                            </>
                                        ) : (
                                            <>
                                                <StyledButton
                                                    variant="contained"
                                                    sx={{
                                                        "&&": {
                                                            padding:
                                                                "0.3rem 1rem",
                                                            fontWeight: "600",
                                                        },
                                                    }}
                                                    onClick={() => {
                                                        // navigate("/login", {
                                                        //     state: {
                                                        //         isLogin: true,
                                                        //     },
                                                        // });
                                                    }}
                                                >
                                                    Log In
                                                </StyledButton>
                                                <StyledButton
                                                    variant="outlined"
                                                    sx={{
                                                        marginLeft: "1rem",

                                                        "&&": {
                                                            padding:
                                                                "0.3rem 1rem",
                                                            fontWeight: "600",
                                                            backgroundColor:
                                                                "transparent",
                                                            "&:hover": {
                                                                backgroundColor:
                                                                    "transparent",
                                                            },
                                                        },
                                                    }}
                                                    onClick={() => {
                                                        // navigate("/signup", {
                                                        //     state: {
                                                        //         isLogin: false,
                                                        //     },
                                                        // });
                                                    }}
                                                >
                                                    Sign Up
                                                </StyledButton>
                                            </>
                                        )}
                                    </FlexBetween>
                                </>
                            ) : (
                                <IconButton
                                    sx={{
                                        color: (theme) =>
                                            theme.palette.text.primary,
                                    }}
                                >
                                    <MenuIcon
                                        sx={{
                                            fontSize: "1.7rem",
                                        }}
                                    />
                                </IconButton>
                            )}
                        </FlexBetween>
                    </FlexBetween>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;
