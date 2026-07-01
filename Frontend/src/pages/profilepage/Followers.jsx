import ProfileCard from "../../components/ProfileCard";
import Box from "@mui/material/Box";
import { Typography, CircularProgress, Button } from "@mui/material";
import { useState } from "react";
import { useFollowers, useFollowing } from "./hooks/useProfileConnections";
import AllConnectionsDialog from "./AllConnectionsDialog";

const Followers = ({ user, followers }) => {
    const [dialogOpen, setDialogOpen] = useState(false);

    // followers prop acts as a boolean flag (true = followers, false = following)
    const { data: followersData, isLoading: followersLoading } = useFollowers(user?._id, 1, 10, !!user?._id && followers);
    const { data: followingData, isLoading: followingLoading } = useFollowing(user?._id, 1, 10, !!user?._id && !followers);

    const isLoading = followers ? followersLoading : followingLoading;
    const dataObj = followers ? followersData : followingData;

    // We only display up to 10 initially
    const displayData = dataObj?.followers || dataObj?.following || [];
    const totalCount = dataObj?.totalCount || 0;

    return (
        <Box sx={{ width: "100%" }}>
            <Box
                sx={{
                    width: "100%",
                    display: "grid",
                    gap: "1rem",
                    py: 1, // Add padding to prevent hover effects from getting clipped
                    px: 0.5,
                    flexWrap: "wrap",
                    gridTemplateColumns: { xs: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
                }}
            >
                {isLoading && displayData.length === 0 ? (
                    <Box sx={{ display: "flex", justifyContent: "center", width: "100%", py: 2, gridColumn: "1 / -1" }}>
                        <CircularProgress size={24} />
                    </Box>
                ) : displayData.length === 0 ? (
                    <Typography
                        sx={{
                            fontSize: "0.9rem",
                            color: (theme) => theme.palette.grey.grey500,
                            gridColumn: "1 / -1",
                        }}
                    >
                        {followers ? "No followers" : "Not following anyone"}
                    </Typography>
                ) : (
                    <>
                        {displayData.slice(0, 10).map((userInfo, index) => (
                            <ProfileCard key={userInfo._id || index} userInfo={userInfo} />
                        ))}
                    </>
                )}
            </Box>

            {totalCount > 10 && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                    <Button
                        variant="text"
                        onClick={() => setDialogOpen(true)}
                        sx={{
                            color: (theme) => theme.palette.primary.main,
                            fontWeight: 600,
                            textTransform: "none",
                            fontSize: "1rem",
                            "&:hover": { textDecoration: "underline", backgroundColor: "transparent" },
                        }}
                    >
                        Show more
                    </Button>
                </Box>
            )}

            <AllConnectionsDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                userId={user?._id}
                type={followers ? 'followers' : 'following'}
            />
        </Box>
    );
};

export default Followers;
