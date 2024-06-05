import FlexBetween from "../FlexBetween";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { StyledButton } from "../StyledButton";
import MenuIcon from "@mui/icons-material/Menu";
import NavRightIsUser from "./NavRightIsUser";

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

    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
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
                                        backgroundColor: "transparent",
                                        "&:hover": {
                                            backgroundColor: (theme) => theme.palette.primary.main,
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