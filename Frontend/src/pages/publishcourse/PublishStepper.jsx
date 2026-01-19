import { Box, Stepper, Step, StepLabel, StepConnector, useMediaQuery } from "@mui/material";
import { useContext } from "react";
import { CreateCourseContext } from "../../state/CreateCourse";

const steps = [
    { label: "Basic Info", value: "basic info" },
    { label: "Course Media", value: "course media" },
    { label: "More Info", value: "more info" },
    { label: "Curriculum", value: "course content" },
];

const PublishStepper = ({ mode, brand }) => {
    const { inputSection, setInputSection } = useContext(CreateCourseContext);
    const isMobile = useMediaQuery("(max-width: 900px)");

    const activeIndex = steps.findIndex(step => step.value === inputSection);

    // Custom Styles for Stepper
    const stepStyles = (isActive, isCompleted) => ({
        '& .MuiStepLabel-label': {
            color: mode === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
            fontWeight: 500,
            cursor: 'pointer', // Make clickable
            '&.Mui-active': {
                color: mode === 'dark' ? '#fff' : brand.primary.main,
                fontWeight: 700,
            },
            '&.Mui-completed': {
                color: brand.secondary.main,
            },
        },
        '& .MuiStepIcon-root': {
            color: mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
            cursor: 'pointer', // Make clickable
            '&.Mui-active': {
                color: brand.primary.main,
            },
            '&.Mui-completed': {
                color: brand.secondary.main,
            },
        },
    });

    return (
        <Box sx={{ width: "100%" }}>
            <Stepper
                activeStep={activeIndex}
                alternativeLabel
                connector={<StepConnector sx={{ '& .MuiStepConnector-line': { borderColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' } }} />}
            >
                {steps.map((step, index) => {
                    const isActive = index === activeIndex;
                    const isCompleted = index < activeIndex; // Although Stepper handles this, explicit check not needed for style overrides usually, but good for custom logic if any

                    return (
                        <Step
                            key={step.label}
                            completed={isCompleted}
                            sx={stepStyles(isActive, isCompleted)}
                            onClick={() => setInputSection(step.value)} // Enable clicking on steps
                        >
                            <StepLabel>{step.label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
        </Box>
    );
};

export default PublishStepper;
