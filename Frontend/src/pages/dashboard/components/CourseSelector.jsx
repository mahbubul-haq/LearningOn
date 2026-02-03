import React from 'react';
import { Box, Paper, Typography, Button, Drawer, IconButton, useTheme } from '@mui/material';
import { Close } from '@mui/icons-material';
import CourseList from './CourseList';
import { useSelector } from 'react-redux';

export default function CourseSelector({ myCourses, selectedCourse, onSelect, drawerOpen, setDrawerOpen, getStatusKey }) {
    const theme = useTheme();
    const user = useSelector((state) => state.auth.user);

    const glassSx = {
        ...theme.palette.glassCard,
        overflow: 'hidden'
    };

    return (
        <>
            {/* Desktop View */}
            <Paper sx={{
                ...glassSx,
                height: { md: 'calc(100vh - 180px)' },
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'column'
            }}>
                <Box sx={{ p: 3, borderBottom: `1px solid ${theme.palette.divider}` }}>
                    <Typography variant="h6" fontWeight="700" color="text.primary">Select Course</Typography>
                </Box>
                <CourseList
                    myCourses={myCourses}
                    selectedCourse={selectedCourse}
                    onSelect={onSelect}
                    user={user}
                    theme={theme}
                    getStatusKey={getStatusKey}
                />
            </Paper>

            {/* Mobile View - Drawer Trigger */}
            <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 3 }}>
                <Paper sx={{ ...glassSx, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                        <Typography variant="caption" color="text.secondary">Currently Viewing</Typography>
                        <Typography variant="subtitle1" fontWeight="800">
                            {selectedCourse ? selectedCourse.courseTitle : "Global Overview"}
                        </Typography>
                    </Box>
                    <Button variant="outlined" onClick={() => setDrawerOpen(true)} size="small" sx={{ borderRadius: 2 }}>
                        Change
                    </Button>
                </Paper>
                <Drawer
                    anchor="left"
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                    PaperProps={{
                        sx: {
                            width: '85%',
                            maxWidth: 320,
                            bgcolor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#ffffff',
                            backgroundImage: 'none'
                        }
                    }}
                >
                    <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${theme.palette.divider}` }}>
                        <Typography variant="h6" fontWeight="700">Select Course</Typography>
                        <IconButton onClick={() => setDrawerOpen(false)}><Close /></IconButton>
                    </Box>
                    <CourseList
                        myCourses={myCourses}
                        selectedCourse={selectedCourse}
                        onSelect={(c) => {
                            onSelect(c);
                            setDrawerOpen(false);
                        }}
                        user={user}
                        theme={theme}
                        getStatusKey={getStatusKey}
                    />
                </Drawer>
            </Box>
        </>
    );
}
