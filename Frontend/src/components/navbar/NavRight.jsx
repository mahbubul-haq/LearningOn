import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../FlexBetween";
import { StyledButton } from "../StyledButton";
import NavRightIsUser from "./NavRightIsUser";
import { useDispatch } from "react-redux";
import { setMode } from "../../state/reduxStore/authSlice";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { colorTokens } from "../../theme";

const NavRight = ({
    handleClick,
    anchorEl,
    handleClose,
    open,
    newNotifications,
    notifications,
    updateNotifications,
    setOpenDrawer,
}) => {

    const isNonMobileScreens = useMediaQuery("(min-width: 900px)");
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useTheme();
    const navRightIsUser = (
        <NavRightIsUser
            handleClick={handleClick}
            anchorEl={anchorEl}
            handleClose={handleClose}
            open={open}
            newNotifications={newNotifications}
            notifications={notifications}
            updateNotifications={updateNotifications}
        />
    )

    return (
        <FlexBetween>
            {isNonMobileScreens ? (

                <FlexBetween gap="0.6rem">
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === "light" ? (
                            <LightMode sx={{ color: theme.palette.neutral.dark, fontSize: "25px" }} />
                        ) : (
                            <DarkMode sx={{ fontSize: "25px" }} />
                        )}
                    </IconButton>
                    {user ? (
                        <>
                            {navRightIsUser}
                        </>
                    ) : (
                        <>
                            <StyledButton
                                // variant="contained"
                                sx={{
                                    "&&": {
                                        padding: "0.3rem 1rem",
                                        fontWeight: "600",
                                    },
                                }}
                                onClick={() => {
                                    navigate("/login", {
                                        state: {
                                            isLogin: true,
                                        },
                                    });
                                }}
                            >
                                Log In
                            </StyledButton>
                            <StyledButton
                                variant="outlined"
                                sx={{
                                    marginLeft: "1rem",
                                    "&&": {
                                        padding: "0.3rem 1rem",
                                        fontWeight: "600",
                                        backgroundColor: (theme) => theme.palette.homepage.signUpBtn.bg,
                                        color: (theme) => theme.palette.homepage.signUpBtn.text,
                                        "&:hover": {
                                            backgroundColor: (theme) => theme.palette.homepage.signUpBtn.hoverBg,
                                            color: colorTokens.white.main,
                                        },
                                    },
                                }}
                                onClick={() => {
                                    navigate("/signup", {
                                        state: {
                                            isLogin: false,
                                        },
                                    });
                                }}
                            >
                                Sign Up
                            </StyledButton>
                        </>
                    )
                    }
                </FlexBetween >

            ) : (
                <IconButton
                    sx={{
                        color: (theme) => theme.palette.text.primary,
                    }}
                    onClick={() => setOpenDrawer(true)}
                >
                    <MenuIcon
                        sx={{
                            fontSize: "1.7rem",
                        }}
                    />
                </IconButton>
            )}
        </FlexBetween >
    )
}

export default NavRight