import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import ProfileTop from "./ProfileTop";
import { useContext } from "react";
import { GlobalContext } from "../../state/GlobalContext";
import ProfileLeft from "./ProfileLeft";
import ProfileRight from "./ProfileRight";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";
import { ProfilePageContext } from "../../state/ProfilePageContext";
import FlexBetween from "../../components/FlexBetween";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const ProfilePage = () => {
    const { userId } = useParams();
    const { userById, getUserById, setOpenedItem } = useContext(GlobalContext);
    const isNonMobileScreens = useMediaQuery("(min-width: 900px)");
    const isMobileScreens = useMediaQuery("(max-width: 600px)");
    const { setOpenedTab,
        editProfileStatus,
        setEditProfileStatus,
        setProfileInfoChanged,
    } = useContext(ProfilePageContext);
    const theme = useTheme();

    const getQualifications = () => {
        let qualifications = [];

        if (userById?.learning?.length > 0) {
            qualifications.push("Student");
        }
        if (userById?.courses?.length > 0) {
            qualifications.push("Instructor");
        }
        if (userById?.tutoring?.length > 0) {
            qualifications.push("Tutor");
        }
        if (userById?.blogs?.length > 0) {
            qualifications.push("Blogger");
        }

        if (qualifications.length === 0) {
            qualifications.push("Student");
        }
        return qualifications.join(", ");
    };

    useEffect(() => {
        getUserById(userId);
        setOpenedTab("profile");
    }, [userId]);

    useEffect(() => {
        if (editProfileStatus === "editing") {
            setProfileInfoChanged(true);
        }
        console.log(userById);
    }, [userById]);

    useEffect(() => {
        setOpenedItem("profile");
        setProfileInfoChanged(false);
        setEditProfileStatus("");

    }, []);

    const location = useLocation();
    const navigate = useNavigate();
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const stripeConnect = query.get("stripe_connect");
        const error = query.get("error");

        if (stripeConnect === "success") {
            setSnackbar({
                open: true,
                message: "Stripe account connected successfully!",
                severity: "success"
            });
            // Clear params
            navigate(location.pathname, { replace: true });
        } else if (stripeConnect === "failed") {
            setSnackbar({
                open: true,
                message: error || "Failed to connect Stripe account.",
                severity: "error"
            });
            navigate(location.pathname, { replace: true });
        }
    }, [location.search, navigate]);

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Box
            sx={{

                width: "100%",
                minHeight: "600px",
                paddingBottom: "2rem",
                overflow: "hidden",
                minWidth: "300px",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "2000px",
                    mx: "auto",
                    padding: isNonMobileScreens ? "2rem 64px" : "1rem 24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "2rem",
                }}
            >
                <Box
                    sx={{
                        ...theme.palette.glassSheet,
                        // overflow: "hidden", // Allow profile image to protrude
                        borderRadius: "16px",
                        marginBottom: isNonMobileScreens ? "3.5rem" : "0", // Add spacing for desktop protrusion (overlaps otherwise)
                    }}
                >
                    <ProfileTop userInfo={userById} />
                </Box>

                {/* Mobile Name Block Removed - Integrated into ProfileTop */}


                <Box
                    sx={{
                        display: "flex",
                        flexDirection: isNonMobileScreens ? "row" : "column",
                        gap: "2rem",
                        alignItems: "flex-start", // align to top
                    }}
                >
                    {isNonMobileScreens && (
                        <Box
                            sx={{
                                width: "25%",
                                minWidth: "250px",
                                ...theme.palette.glassSheet,
                                overflow: "hidden",
                                padding: "0",
                            }}
                        >
                            <ProfileLeft userInfo={userById} />
                        </Box>
                    )}
                    <Box
                        sx={{
                            flex: 1,
                            width: isNonMobileScreens ? "auto" : "100%",
                            ...theme.palette.glassSheet,
                            padding: { xs: "1rem", sm: "2rem" },
                        }}
                    >
                        <ProfileRight userInfo={userById} />
                    </Box>
                </Box>
            </Box>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ProfilePage;
