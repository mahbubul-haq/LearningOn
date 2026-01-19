import React, { useState } from 'react';
import {
    Box,
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Stepper,
    Step,
    StepLabel,
    StepConnector,
    Chip,
    IconButton,
    useTheme,
    ThemeProvider,
    createTheme,
    CssBaseline,
    alpha
} from '@mui/material';
import {
    // ArrowForward,F
    Save,
    Plus,
    X,
    Moon,
    Sun,
    ChevronLeft
} from 'lucide-react';

// --- 1. Your Brand Colors ---
const BRAND = {
    primary: {
        main: "#4522ba",
        light: "#6b4fd9",
        lighter: "#9178e6",
        dark: "#2f1880",
        darker: "#1f0f55",
    },
    secondary: {
        main: "#c2215f",
        light: "#d94d85",
        lighter: "#e879aa",
        dark: "#8f1844",
        darker: "#5f0f2d",
    },
};

// --- 2. Custom Stepper Connector & Icon ---
// We override MUI styles to make the stepper look like a gradient progress bar
const stepStyles = (mode, activeStep) => ({
    '& .MuiStepLabel-label': {
        color: mode === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
        fontWeight: 500,
        '&.Mui-active': {
            color: mode === 'dark' ? '#fff' : BRAND.primary.main,
            fontWeight: 700,
        },
        '&.Mui-completed': {
            color: BRAND.secondary.main,
        },
    },
    '& .MuiStepIcon-root': {
        color: mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
        '&.Mui-active': {
            color: BRAND.primary.main,
        },
        '&.Mui-completed': {
            color: BRAND.secondary.main,
        },
    },
});

export default function PlayGround() {
    const [mode, setMode] = useState('light'); // 'light' or 'dark'
    const [skills, setSkills] = useState(["React Native", "UI Design"]);
    const [newSkill, setNewSkill] = useState("");

    // Create MUI Theme based on mode
    const theme = createTheme({
        palette: {
            mode,
            primary: { main: BRAND.primary.main },
            secondary: { main: BRAND.secondary.main },
            background: {
                default: mode === 'dark' ? BRAND.primary.darker : '#f8f9fa',
                paper: mode === 'dark' ? BRAND.primary.dark : '#ffffff',
            },
        },
        typography: { fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif' },
        components: {
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        borderRadius: 12, // Rounded inputs
                        backgroundColor: mode === 'dark' ? alpha('#000', 0.2) : alpha('#fff', 0.5),
                        backdropFilter: 'blur(10px)',
                        transition: 'all 0.3s ease',
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: mode === 'dark' ? BRAND.secondary.light : BRAND.primary.light,
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: mode === 'dark' ? BRAND.secondary.main : BRAND.primary.main,
                            borderWidth: 2,
                        },
                    },
                    notchedOutline: {
                        borderColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                    }
                },
            },
        },
    });

    // Handle adding skills
    const handleAddSkill = () => {
        if (newSkill && !skills.includes(newSkill)) {
            setSkills([...skills, newSkill]);
            setNewSkill("");
        }
    };

    const handleDeleteSkill = (skillToDelete) => {
        setSkills((chips) => chips.filter((chip) => chip !== skillToDelete));
    };

    // --- 3. Dynamic Mesh Background ---
    const meshBackground = mode === 'dark'
        ? `
        radial-gradient(circle at 15% 15%, ${alpha(BRAND.primary.dark, 0.8)} 0%, transparent 50%),
        radial-gradient(circle at 85% 85%, ${alpha(BRAND.secondary.dark, 0.6)} 0%, transparent 50%),
        radial-gradient(at 50% 50%, ${BRAND.primary.darker} 0%, #000 100%)
      `
        : `
        radial-gradient(circle at 0% 0%, ${alpha(BRAND.primary.lighter, 0.4)} 0%, transparent 60%),
        radial-gradient(circle at 100% 100%, ${alpha(BRAND.secondary.lighter, 0.4)} 0%, transparent 60%),
        linear-gradient(135deg, #fdfdfd 0%, #f3f4f6 100%)
      `;

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            {/* GLOBAL CONTAINER with MESH BACKGROUND */}
            <Box sx={{
                minHeight: '100vh',
                width: '100%',
                background: meshBackground,
                transition: 'background 0.5s ease',
                pb: 8
            }}>

                {/* --- Header / Nav --- */}
                <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button startIcon={<ChevronLeft />} sx={{ color: 'text.secondary', fontWeight: 600 }}>
                        Back to Dashboard
                    </Button>
                    <IconButton
                        onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
                        sx={{
                            bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.8)',
                            backdropFilter: 'blur(8px)',
                            boxShadow: 2
                        }}
                    >
                        {mode === 'dark' ? <Sun size={20} color="#fbbf24" /> : <Moon size={20} color="#4522ba" />}
                    </IconButton>
                </Box>

                <Container maxWidth="md">

                    {/* --- Stepper --- */}
                    <Box sx={{ mb: 6, px: 2 }}>
                        <Stepper activeStep={0} alternativeLabel connector={<StepConnector sx={{ '& .MuiStepConnector-line': { borderColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' } }} />}>
                            {['Basic Info', 'Course Media', 'More Info', 'Curriculum'].map((label) => (
                                <Step key={label} sx={stepStyles(mode, 0)}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>

                    {/* --- GLASS CARD --- */}
                    <Paper
                        elevation={0}
                        sx={{
                            p: 5,
                            borderRadius: 4,
                            // Glassmorphism Styles
                            background: mode === 'dark'
                                ? alpha(BRAND.primary.darker, 0.4) // Dark Glass
                                : alpha('#ffffff', 0.65),         // Light Glass
                            backdropFilter: 'blur(24px)',
                            border: '1px solid',
                            borderColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.4)',
                            boxShadow: mode === 'dark'
                                ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                                : '0 20px 40px -12px rgba(69, 34, 186, 0.15)',
                        }}
                    >
                        {/* 1. Category */}
                        <Box mb={4}>
                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700, letterSpacing: 1, color: 'text.secondary', fontSize: '0.75rem' }}>
                                CATEGORY OF THE COURSE
                            </Typography>
                            <FormControl fullWidth>
                                <InputLabel id="cat-label">Choose a category</InputLabel>
                                <Select labelId="cat-label" label="Choose a category" defaultValue="">
                                    <MenuItem value="dev">Development</MenuItem>
                                    <MenuItem value="design">Design</MenuItem>
                                    <MenuItem value="business">Business</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        {/* 2. Title */}
                        <Box mb={4}>
                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700, letterSpacing: 1, color: 'text.secondary', fontSize: '0.75rem' }}>
                                COURSE TITLE
                            </Typography>
                            <TextField
                                fullWidth
                                placeholder="Give a nice title for your course"
                                variant="outlined"
                            />
                        </Box>

                        {/* 3. Description */}
                        <Box mb={4}>
                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700, letterSpacing: 1, color: 'text.secondary', fontSize: '0.75rem' }}>
                                COURSE DESCRIPTION
                            </Typography>
                            <Typography variant="caption" display="block" sx={{ mb: 2, color: 'text.secondary' }}>
                                What will students learn? What are the requirements?
                            </Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={6}
                                placeholder="Write description here..."
                                variant="outlined"
                            />
                        </Box>

                        {/* 4. Skill Tags */}
                        <Box mb={4}>
                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700, letterSpacing: 1, color: 'text.secondary', fontSize: '0.75rem' }}>
                                SKILL TAGS
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                                {skills.map((skill) => (
                                    <Chip
                                        key={skill}
                                        label={skill}
                                        onDelete={() => handleDeleteSkill(skill)}
                                        deleteIcon={<X size={14} />}
                                        sx={{
                                            backgroundColor: alpha(BRAND.primary.main, 0.1),
                                            color: BRAND.primary.main,
                                            fontWeight: 600,
                                            border: `1px solid ${alpha(BRAND.primary.main, 0.2)}`
                                        }}
                                    />
                                ))}
                            </Box>

                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <TextField
                                    size="small"
                                    placeholder="Type a skill..."
                                    value={newSkill}
                                    onChange={(e) => setNewSkill(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                                    sx={{ flexGrow: 1 }}
                                />
                                <Button
                                    variant="outlined"
                                    startIcon={<Plus size={18} />}
                                    onClick={handleAddSkill}
                                    sx={{
                                        borderColor: mode === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)',
                                        color: 'text.primary',
                                        '&:hover': { borderColor: BRAND.primary.main, color: BRAND.primary.main }
                                    }}
                                >
                                    Add
                                </Button>
                            </Box>
                        </Box>

                        {/* 5. Footer Actions */}
                        <Box sx={{ mt: 6, pt: 4, borderTop: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Button
                                startIcon={<Save size={18} />}
                                sx={{ color: 'text.secondary', fontWeight: 600, px: 3 }}
                            >
                                Save Progress
                            </Button>

                            <Button
                                variant="contained"
                                // endIcon={<ArrowForward size={18} />}
                                sx={{
                                    borderRadius: '50px',
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                    textTransform: 'none',
                                    // Gradient Button
                                    background: `linear-gradient(90deg, ${BRAND.primary.main} 0%, ${BRAND.primary.light} 100%)`,
                                    boxShadow: `0 10px 20px -5px ${alpha(BRAND.primary.main, 0.4)}`,
                                    '&:hover': {
                                        background: `linear-gradient(90deg, ${BRAND.primary.dark} 0%, ${BRAND.primary.main} 100%)`,
                                        boxShadow: `0 15px 25px -5px ${alpha(BRAND.primary.main, 0.5)}`,
                                    }
                                }}
                            >
                                Next Step
                            </Button>
                        </Box>

                    </Paper>
                </Container>
            </Box>
        </ThemeProvider>
    );
}