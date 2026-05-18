import React, { useState } from 'react';
import { Box, Paper, Typography, Button, Stack, Avatar } from '@mui/material';
import AllEnrollmentsDialog from './AllEnrollmentsDialog';

export default function RecentEnrollments({ recentEnrollments, hasNextEnrollmentsPage, fetchNextEnrollmentsPage, isFetchingEnrollments, glassSx, theme }) {
    const [openDialog, setOpenDialog] = useState(false);



    return (
        <Paper sx={{ ...glassSx, p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight="700" color="text.primary">Recent Enrollments</Typography>
            </Box>
            <Stack spacing={2}>
                {recentEnrollments.slice(0, 10).map((enrollment, i) => {
                    const userName = enrollment.userId?.name || 'Unknown';
                    const picturePath = enrollment.userId?.picturePath;
                    const avatarSrc = picturePath
                        ? `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/${picturePath}`
                        : `https://i.pravatar.cc/150?u=${i}`;
                    const paidAmount = enrollment.paymentId?.paidAmount || 0;
                    const enrolledOn = enrollment.createdAt ? new Date(enrollment.createdAt).toLocaleDateString() : 'N/A';

                    return (
                        <Box key={enrollment._id || i} sx={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            p: 2, borderRadius: 3, bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.4)',
                            transition: '0.2s', '&:hover': { bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'white' }
                        }}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Avatar src={avatarSrc} sx={{ border: `2px solid ${theme.palette.primary.lighter}` }} />
                                <Box>
                                    <Typography component="a" href={`/profile/${enrollment?.userId?._id}`} target='_blank' sx={{ cursor: 'pointer', display: 'block', textDecoration: 'none', color: theme.palette.primary.main, fontWeight: 'bold' }} variant="subtitle2" fontWeight="800" color="text.primary">{userName}</Typography>
                                    <Typography variant="caption" color="text.secondary">Enrolled in: {enrollment?.courseId?.courseTitle || 'Title Not Available'}</Typography>
                                </Box>
                            </Stack>
                            <Box sx={{ textAlign: 'right' }}>
                                <Typography variant="subtitle2" fontWeight="800" color="text.primary">${paidAmount}</Typography>
                                <Typography variant="caption" color="text.secondary">{enrolledOn}</Typography>
                            </Box>
                        </Box>
                    );
                })}
                {(!recentEnrollments || recentEnrollments.length === 0) && (
                    <Typography variant="body2" color="text.secondary" textAlign="center">No enrollments yet.</Typography>
                )}

                {(recentEnrollments?.length > 10 || hasNextEnrollmentsPage) && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                        <Button
                            variant="outlined"
                            onClick={() => setOpenDialog(true)}
                            sx={{ textTransform: 'none', fontWeight: 'bold' }}
                        >
                            View All
                        </Button>
                    </Box>
                )}
            </Stack>

            <AllEnrollmentsDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                enrollments={recentEnrollments}
                hasNextPage={hasNextEnrollmentsPage}
                fetchNextPage={fetchNextEnrollmentsPage}
                isFetching={isFetchingEnrollments}
            />
        </Paper>
    );
}
