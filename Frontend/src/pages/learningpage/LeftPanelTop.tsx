import React from 'react'
import { colorTokens } from '../../theme';
import { Box, Typography } from '@mui/material'
import FlexBetween from '../../components/FlexBetween'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate } from 'react-router-dom';
import useTheme from "@mui/material/styles/useTheme";
type Props = {
    courseInfo: any;// not typed due to courseInfo is not typed in parent component
    courseProgress: any;
}
const LeftPanelTop = ({ courseInfo, courseProgress }: Props) => {
    const theme = useTheme();
    const navigate = useNavigate();
    return <Box
        sx={{
            position: "sticky",
            top: "0rem",
            display: "flex",
            flexDirection: "column",
            p: "1rem",
            gap: "0.5rem",
        }}
    >
        <Box sx={{
            display: "inline-flex",
            gap: "0.5rem",
            cursor: "pointer",
            alignItems: "center",
            mb: "0.8rem",
            color: (theme) => theme.palette.learningPage.textPrimary,
            backgroundColor: (theme) => theme.palette.learningPage.cardBg,
            border: (theme) => `1px solid ${theme.palette.learningPage.glassBorder}`,
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            width: "fit-content",
            transition: "all 0.3s ease",
            "&:hover": {
                backgroundColor: (theme) => theme.palette.primary.main,
                color: (theme) => theme.palette.common.white,
                transform: "translateX(-2px)",
                boxShadow: (theme) => theme.palette.learningPage.glassShadow,
            }
        }}
            onClick={() => navigate(`/course/${courseInfo._id}`)}>
            <ArrowBackIcon sx={{ fontSize: "1.2rem" }} />
            <Typography variant='body1' sx={{ fontWeight: "600" }}>
                Course Main
            </Typography>
        </Box>

        <Typography variant='h3' sx={{
            color: (theme) => theme.palette.learningPage.textPrimary,
            fontWeight: "700",
            fontSize: "1.6rem",
            lineHeight: "1.3",
            mb: "0.5rem"
        }}>
            {courseInfo?.courseTitle}
        </Typography>
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem"
        }}>
            <FlexBetween>
                <Typography variant='body2' sx={{ color: (theme) => theme.palette.learningPage.textSecondary, fontWeight: 500 }}>
                    Course Progress
                </Typography>
                <Typography variant='body2' sx={{ color: (theme) => theme.palette.learningPage.textPrimary, fontWeight: 700 }}>
                    {Math.round(courseProgress?.progressPercentage)}%
                </Typography>
            </FlexBetween>
            <LinearProgress color="secondary" variant="determinate" value={Math.round(courseProgress?.progressPercentage)} sx={{
                borderRadius: "1000px",
                backgroundColor: (theme) => theme.palette.learningPage.divider,
                height: "8px",
                "& .MuiLinearProgress-bar": {
                    borderRadius: "1000px",
                    background: (theme) => `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
                }
            }} />
        </Box>

    </Box>
}

export default LeftPanelTop