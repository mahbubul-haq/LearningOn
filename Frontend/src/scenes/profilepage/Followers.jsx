import ProfileCard from "../../components/ProfileCard";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Typography } from "@mui/material";

const Followers = ({ user, followers }) => {
    const isMobileScreens = useMediaQuery("(max-width: 600px)");
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    return (
        <Box
            sx={{
                width: "100%",
                display: "grid",
                gap: "1rem",
                flexWrap: "wrap",
                gridTemplateColumns: isNonMobileScreens ? "repeat(2, 1fr)" : isMobileScreens ? "repeat(1, 1fr)" : "repeat(2, 1fr)",
            }}
        >
            {followers ? (
                <>
                    {user?.followers?.length === 0 && (
                        <Typography
                            sx={{
                                fontSize: "0.9rem",

                                // fontWeight: "600",
                                // textAlign: "center",
                                color: (theme) => theme.palette.grey.grey500,
                                width: "100%",
                            }}
                        >
                            No followers
                        </Typography>
                    )}
                    {user?.followers?.map((userInfo, uIndex) => (
                        <ProfileCard key={uIndex} userInfo={userInfo} />
                    ))}
                </>
            ) : (
                <>
                    {user?.following?.length === 0 && (
                        <Typography
                            sx={{
                                fontSize: "0.9rem",

                                // fontWeight: "600",
                                // textAlign: "center",
                                color: (theme) => theme.palette.grey.grey500,
                                width: "100%",
                            }}
                        >
                            Not following anyone
                        </Typography>
                    )}
                    {user?.following?.map((userInfo, uIndex) => (
                        <ProfileCard key={uIndex} userInfo={userInfo} />
                    ))}
                </>
            )}
        </Box>
    );
};

export default Followers;
