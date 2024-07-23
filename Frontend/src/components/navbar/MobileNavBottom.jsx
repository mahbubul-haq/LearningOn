import GroupIcon from "@mui/icons-material/Group";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import LogoutIcon from "@mui/icons-material/Logout";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import useTheme from "@mui/material/styles/useTheme";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../../state";


const MobileNavBottom = ({
    setOpenDrawer,

}) => {

    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);


    return (
        <>
            <>
                <Box
                    sx={{
                        px: "1rem",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: "1.2rem",
                            cursor: "pointer",
                            "&:hover": {
                                backgroundColor: theme.palette.background.default,
                            },
                            p: "0.8rem",
                            borderRadius: "0.15rem",
                        }}
                        onClick={() => {
                            navigate("/courses");
                            setOpenDrawer(false);
                        }}
                    >
                        <LocalLibraryIcon
                            sx={{
                                fontSize: "1.2rem",
                                color: (theme) => theme.palette.grey.grey400,
                            }}
                        />
                        <Typography
                            sx={{
                                fontSize: "1rem",
                            }}
                        >
                            Courses
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: "1.2rem",
                            cursor: "pointer",
                            "&:hover": {
                                backgroundColor: theme.palette.background.default,
                            },
                            p: "0.8rem",
                            borderRadius: "0.15rem",
                            opacity: 0.3
                        }}
                        onClick={() => {
                            // navigate("/dashboard");
                            // setOpenDrawer(false);
                        }}
                    >
                        <RssFeedIcon
                            sx={{
                                fontSize: "1.2rem",
                                color: (theme) => theme.palette.grey.grey400,
                            }}
                        />
                        <Typography
                            sx={{
                                fontSize: "1rem",
                            }}
                        >
                            Blogs
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: "1.2rem",
                            cursor: "pointer",
                            "&:hover": {
                                backgroundColor: theme.palette.background.default,
                            },
                            p: "0.8rem",
                            borderRadius: "0.15rem",
                            opacity: 0.3
                        }}
                        onClick={() => {
                            // navigate("/dashboard");
                            // setOpenDrawer(false);
                        }}
                    >
                        <GroupIcon
                            sx={{
                                fontSize: "1.2rem",
                                color: (theme) => theme.palette.grey.grey400,
                            }}
                        />
                        <Typography
                            sx={{
                                fontSize: "1rem",
                            }}
                        >
                            Tutors
                        </Typography>
                    </Box>
                </Box>
                <Divider
                    sx={{
                        color: theme.palette.customDivider.main,
                        my: "1rem",
                    }}
                    light
                />
            </>
            {user && (
                <Box
                    sx={{
                        px: "1rem",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: "1.2rem",
                            cursor: "pointer",
                            "&:hover": {
                                backgroundColor: theme.palette.background.default,
                            },
                            p: "0.8rem",
                            borderRadius: "0.15rem",
                        }}
                        onClick={() => {
                            dispatch(setLogout());
                            setOpenDrawer(false);
                            //reload page

                            navigate("/");
                            // window.location.reload();
                        }}
                    >
                        <LogoutIcon
                            sx={{
                                fontSize: "1.2rem",
                                color: (theme) => theme.palette.grey.grey400,
                            }}
                        />
                        <Typography
                            sx={{
                                fontSize: "1rem",
                            }}
                        >
                            Log out
                        </Typography>
                    </Box>
                </Box>
            )}
        </>
    )
}

export default MobileNavBottom