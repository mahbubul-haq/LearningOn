import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../../components/StyledButton";
import { alpha, useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { useState } from "react";
import StripeConnectModal from "../../components/StripeConnectModal";


const PublishStatusDialog = ({
    uploadStatus,
    setUploadStatus,
    setEditMode,
    setCourseId,
    getUser
}) => {

    const navigate = useNavigate();
    const theme = useTheme();
    const user = useSelector((state) => state.auth.user);
    const [stripeModalOpen, setStripeModalOpen] = useState(false);


    return (
        <Dialog
            open={uploadStatus === "publishing" || uploadStatus === "unpublished" || uploadStatus === "published"}
            onClose={(event, reason) => {
                if (reason !== "backdropClick") {
                    setUploadStatus("");
                }
            }}
            PaperProps={{
                sx: {
                    backgroundColor: (theme) => theme.palette.mode === 'dark' ? "rgba(30, 30, 35, 0.8)" : "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(20px)",
                    borderRadius: "16px",
                    border: (theme) => theme.palette.mode === 'dark' ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(255, 255, 255, 0.5)",
                    boxShadow: (theme) => theme.palette.mode === 'dark' ? "0 8px 32px rgba(0, 0, 0, 0.4)" : "0 8px 32px rgba(31, 38, 135, 0.15)",
                }
            }}
            aria-labelledby="responsive-dialog-title"
            disableEscapeKeyDown
        >
            <DialogTitle id="responsive-dialog-title" sx={{ textAlign: 'center', fontWeight: 700, pt: 3 }}>
                Course Publish Status
            </DialogTitle>
            <DialogContent>
                {uploadStatus === "publishing" && (
                    <Box>
                        <LinearProgress />
                        <Typography>Uploading course content...</Typography>
                    </Box>
                )}
                {uploadStatus === "unpublished" && <>There was an error publishing your course.</>}
                {uploadStatus === "published" && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                        <Typography>Successfully Published - Waiting for Admin Approval.</Typography>
                        {!user?.stripeAccountId && (
                            <Box sx={{
                                p: 2,
                                border: `1px solid ${theme.palette.divider}`,
                                borderRadius: 2,
                                bgcolor: alpha(theme.palette.primary.main, 0.05),
                                width: '100%'
                            }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                    Start Earning
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    Connect your Stripe account to receive payments from this course.
                                </Typography>
                                <StyledButton
                                    onClick={() => setStripeModalOpen(true)}
                                    sx={{
                                        width: '100%',
                                        "&&": {
                                            background: theme.palette.primary.main,
                                            color: "white",
                                            "&:hover": {
                                                background: theme.palette.primary.dark,
                                            }
                                        }
                                    }}
                                >
                                    Connect Stripe
                                </StyledButton>
                            </Box>
                        )}
                    </Box>
                )}
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <StyledButton
                    sx={{
                        "&&": {
                            padding: "0.5rem 1.2rem",
                            borderRadius: "8px",
                            fontWeight: "600",
                            background: "transparent",
                            color: (theme) => theme.palette.primary.main,
                            border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
                            "&:hover": {
                                color: (theme) => theme.palette.primary.main,
                                background: (theme) => alpha(theme.palette.primary.main, 0.1),
                                border: (theme) => `1px solid ${theme.palette.primary.main}`,
                                boxShadow: "none",
                            },
                        },
                    }}
                    onClick={() => {
                        if (uploadStatus === "published") {
                            navigate("/dashboard");
                            setUploadStatus("");
                            setEditMode("");
                            setCourseId("");
                            getUser();
                        } else {
                            setUploadStatus("");
                        }
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: "600",
                            px: "0.5rem",
                            textTransform: "uppercase",
                            fontSize: "0.9rem",
                        }}
                    >
                        {uploadStatus === "published" ? "Go to dashboard" : "Close"}
                    </Typography>
                </StyledButton>
            </DialogActions>

            <StripeConnectModal
                open={stripeModalOpen}
                onClose={() => setStripeModalOpen(false)}
            />
        </Dialog>
    )
}

export default PublishStatusDialog