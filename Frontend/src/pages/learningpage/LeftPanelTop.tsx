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
            display: "flex",
            gap: "0.5rem",
            cursor: "pointer",
            alignItems: "center",
            mb: "0.5rem",
            color: (theme) => theme.palette.learningPage.textPrimary,
        }}
            onClick={() => navigate(`/course/${courseInfo._id}`)}>
            <ArrowBackIcon />
            <Typography variant='h7'>
                Course Main
            </Typography>
        </Box>

        <Typography variant='h4bold' sx={{ color: (theme) => theme.palette.learningPage.textPrimary }}>
            {courseInfo?.courseTitle}
        </Typography>
        <Box sx={{
            display: "flex",
            flexDirection: "column",
        }}>
            <FlexBetween>
                <Typography variant='h7' sx={{ color: (theme) => theme.palette.learningPage.textPrimary }}>
                    Course Progress
                </Typography>
                <Typography variant='h7' sx={{ color: (theme) => theme.palette.learningPage.textSecondary }}>
                    {Math.round(courseProgress?.progressPercentage)}%
                </Typography>
            </FlexBetween>
            <LinearProgress color="secondary" variant="determinate" value={Math.round(courseProgress?.progressPercentage)} sx={{
                borderRadius: "1000px",
                backgroundColor: (theme) => theme.palette.learningPage.divider,
                height: "6px",
            }} />
        </Box>

    </Box>
}

export default LeftPanelTop