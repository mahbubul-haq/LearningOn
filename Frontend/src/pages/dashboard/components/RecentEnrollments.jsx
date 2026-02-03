import React from 'react';
import { Box, Paper, Typography, Button, Stack, Avatar } from '@mui/material';

export default function RecentEnrollments({ recentEnrollments, glassSx, theme }) {
    return (
        <Paper sx={{ ...glassSx, p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight="700" color="text.primary">Recent Enrollments</Typography>
                <Button size="small" sx={{ textTransform: 'none', fontWeight: 700 }}>View All</Button>
            </Box>
            <Stack spacing={2}>
                {recentEnrollments.slice(0, 10).map((student, i) => (
                    <Box key={student.userId || i} sx={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        p: 2, borderRadius: 3, bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.4)',
                        transition: '0.2s', '&:hover': { bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'white' }
                    }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Avatar src={student.userImage || `https://i.pravatar.cc/150?u=${i}`} sx={{ border: `2px solid ${theme.palette.primary.lighter}` }} />
                            <Box>
                                <Typography variant="subtitle2" fontWeight="800" color="text.primary">{student.userName || "Not Found"}</Typography>
                                <Typography variant="caption" color="text.secondary">Enrolled in: {student.courseTitle || 'Title Not Available'}</Typography>
                            </Box>
                        </Stack>
                        <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="subtitle2" fontWeight="800" color="text.primary">${student.paidAmount || 0}</Typography>
                            <Typography variant="caption" color="text.secondary">{new Date(student.enrolledOn).toLocaleDateString()}</Typography>
                        </Box>
                    </Box>
                ))}
                {(!recentEnrollments || recentEnrollments.length === 0) && (
                    <Typography variant="body2" color="text.secondary" textAlign="center">No enrollments yet.</Typography>
                )}
            </Stack>
        </Paper>
    );
}
