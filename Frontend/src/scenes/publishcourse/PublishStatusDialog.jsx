import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { StyledButton } from "../../components/StyledButton";
import { useNavigate } from "react-router-dom";


const PublishStatusDialog = ({
    uploadStatus,
    setUploadStatus,
    setEditMode,
    setCourseId,
    getUser
}) => {

    const navigate = useNavigate();


    return (
        <Dialog
            open={uploadStatus === "publishing" || uploadStatus === "unpublished" || uploadStatus === "published"}
            onClose={(event, reason) => {
                if (reason !== "backdropClick") {
                    setUploadStatus("");
                }
            }}
            aria-labelledby="responsive-dialog-title"
            disableEscapeKeyDown
        >
            <DialogTitle id="responsive-dialog-title">Course Publish Status</DialogTitle>
            <DialogContent>
                {uploadStatus === "publishing" && (
                    <Box>
                        <LinearProgress />
                        <Typography>Uploading course content...</Typography>
                    </Box>
                )}
                {uploadStatus === "unpublished" && <>There was an error publishing your course.</>}
                {uploadStatus === "published" && <>Your course has been published successfully.</>}
            </DialogContent>
            <DialogActions>
                <StyledButton
                    sx={{
                        textTransform: "capitalize",
                        fontWeight: "600",

                        cursor: "pointer",
                        "&&": {
                            padding: "0.4rem 0.8rem",
                            fontWeight: "600",
                            background: "transparent",
                            color: (theme) => theme.palette.primary.dark,
                            "&:hover": {
                                color: (theme) => theme.palette.primary.darker,
                                background: (theme) => theme.palette.background.alt,
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
                            pl: "0.5rem",
                            textTransform: "uppercase",
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