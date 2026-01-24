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


const PublishStatusDialog = ({
    uploadStatus,
    setUploadStatus,
    setEditMode,
    setCourseId,
    getUser
}) => {

    const navigate = useNavigate();
    const theme = useTheme();


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
                {uploadStatus === "published" && <>Successfully Published - Waiting for Admin Approval.</>}
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
        </Dialog>
    )
}

export default PublishStatusDialog