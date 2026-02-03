import React from 'react';
import { List, ListItemButton, ListItemText, Chip, Divider, Box, Typography, Stack } from '@mui/material';
import { Circle } from '@mui/icons-material';
import { STATUS_THEMES } from '../constants/dashboardConstants';

export default function CourseList({ myCourses, selectedCourse, onSelect, user, theme, getStatusKey }) {
    return (
        <List sx={{ overflowY: 'auto', p: 2, flexGrow: 1 }}>
            <ListItemButton
                selected={!selectedCourse}
                onClick={() => onSelect(null)}
                sx={{
                    borderRadius: 2,
                    mb: 1,
                    border: `1px solid ${theme.palette.divider}`,
                    '&.Mui-selected': {
                        bgcolor: theme.palette.mode === 'dark' ? 'rgba(145, 120, 230, 0.2)' : 'rgba(145, 120, 230, 0.26)',
                        border: `1px solid ${theme.palette.primary.lighter}`
                    }
                }}
            >
                <ListItemText primary="Global Overview" primaryTypographyProps={{ fontWeight: 700, color: 'text.primary' }} />
            </ListItemButton>
            <Divider sx={{ my: 1, opacity: 0 }} />
            {myCourses && myCourses.map((course) => {
                const statusKey = getStatusKey(course.courseStatus || 'draft');
                const statusTheme = STATUS_THEMES[statusKey];
                const isSelected = selectedCourse?._id === course._id;

                return (
                    <ListItemButton
                        key={course._id}
                        selected={isSelected}
                        onClick={() => onSelect(course)}
                        sx={{
                            borderRadius: 2, mb: 1.5, display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                            boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
                            p: 0,
                            overflow: 'hidden',
                            "&.Mui-selected": {
                                bgcolor: theme.palette.mode === 'dark' ? 'rgba(145, 120, 230, 0.2)' : 'rgba(146, 120, 230, 0.26)',
                                border: `1px solid ${theme.palette.primary.lighter}`
                            },
                            border: isSelected
                                ? `1px solid ${theme.palette.primary.lighter}`
                                : `1px solid ${theme.palette.divider}`
                        }}
                    >
                        <Box sx={{ width: '100%', height: 80, bgcolor: 'action.hover' }}>
                            {course.courseThumbnail && (
                                <Box
                                    component="img"
                                    src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/${course.courseThumbnail}`}
                                    alt={course.courseTitle}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                            )}
                        </Box>
                        <Box sx={{ p: 1.5, width: '100%' }}>
                            <Typography variant="body2" fontWeight="700" sx={{ mb: 1, color: 'text.primary', lineHeight: 1.3 }}>{course.courseTitle}</Typography>
                            <Stack direction="row" justifyContent="space-between" width="100%" alignItems="center">
                                <Chip label={user._id === course.owner ? "Owner" : "Instructor"} size="small" sx={{ height: 18, fontSize: '0.65rem' }} />
                                <Box sx={{ px: 1, py: 0.3, borderRadius: 1, display: 'flex', alignItems: 'center', gap: 0.5, bgcolor: statusTheme.bg }}>
                                    <Circle sx={{ fontSize: 6, color: statusTheme.color }} />
                                    <Typography sx={{ fontSize: '0.65rem', fontWeight: 800, color: statusTheme.color }}>
                                        {statusTheme.label}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>
                    </ListItemButton>
                )
            })}
        </List>
    );
}
