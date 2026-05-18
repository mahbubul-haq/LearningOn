import React, { useState, useMemo } from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Typography, Box, TextField, Select, MenuItem, InputLabel, FormControl, Button, CircularProgress, Avatar, useTheme, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AllEnrollmentsDialog = ({ open, onClose, enrollments, hasNextPage, fetchNextPage, isFetching }) => {
    const theme = useTheme();
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("newest");

    const enrollmentBg = theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.05)'
        : 'rgba(255, 255, 255, 0.4)';
    
    const enrollmentHoverBg = theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.1)'
        : 'rgba(255, 255, 255, 0.8)';

    const displayedEnrollments = useMemo(() => {
        let filtered = [...enrollments];

        if (search) {
            const searchLower = search.toLowerCase();
            filtered = filtered.filter(enrollment =>
                enrollment.userId?.name?.toLowerCase().includes(searchLower) ||
                enrollment.courseId?.courseTitle?.toLowerCase().includes(searchLower)
            );
        }

        if (sort === "newest") {
            filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (sort === "oldest") {
            filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        } else if (sort === "amount-high") {
            filtered.sort((a, b) => (b.paymentId?.paidAmount || 0) - (a.paymentId?.paidAmount || 0));
        } else if (sort === "amount-low") {
            filtered.sort((a, b) => (a.paymentId?.paidAmount || 0) - (b.paymentId?.paidAmount || 0));
        }

        return filtered;
    }, [enrollments, search, sort]);

    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            maxWidth="md" 
            fullWidth 
            PaperProps={{ 
                sx: { 
                    borderRadius: '16px', 
                    backgroundImage: 'none', 
                    backgroundColor: theme.palette.background.default, 
                    minHeight: '60vh' 
                } 
            }}
        >
            <DialogTitle sx={{ m: 0, p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5" fontWeight="bold">All Enrollments {enrollments.length > 0 ? `(${enrollments.length})` : ''}</Typography>
                <IconButton aria-label="close" onClick={onClose} sx={{ color: theme.palette.grey[500] }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            
            <DialogContent dividers sx={{ p: 3, borderColor: theme.palette.divider }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 4 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search by student name or course title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        size="small"
                        sx={{
                            backgroundColor: theme.palette.background.paper,
                            borderRadius: '8px',
                            '& .MuiOutlinedInput-root': { borderRadius: '8px' }
                        }}
                    />
                    <FormControl size="small" sx={{ minWidth: 200 }}>
                        <InputLabel>Sort By</InputLabel>
                        <Select
                            value={sort}
                            label="Sort By"
                            onChange={(e) => setSort(e.target.value)}
                            sx={{
                                backgroundColor: theme.palette.background.paper,
                                borderRadius: '8px',
                            }}
                        >
                            <MenuItem value="newest">Newest First</MenuItem>
                            <MenuItem value="oldest">Oldest First</MenuItem>
                            <MenuItem value="amount-high">Highest Amount</MenuItem>
                            <MenuItem value="amount-low">Lowest Amount</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Stack spacing={2} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {displayedEnrollments.map((enrollment, i) => {
                        const userName = enrollment.userId?.name || 'Unknown';
                        const picturePath = enrollment.userId?.picturePath;
                        const avatarSrc = picturePath
                            ? `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/${picturePath}`
                            : `https://i.pravatar.cc/150?u=${i}`;
                        const paidAmount = enrollment.paymentId?.paidAmount || 0;
                        const enrolledOn = enrollment.createdAt ? new Date(enrollment.createdAt).toLocaleDateString() : 'N/A';

                        return (
                            <Box 
                                key={enrollment._id || i} 
                                sx={{
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center',
                                    p: 2, 
                                    borderRadius: 3, 
                                    bgcolor: enrollmentBg,
                                    transition: '0.2s', 
                                    '&:hover': { bgcolor: enrollmentHoverBg }
                                }}
                            >
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Avatar src={avatarSrc} sx={{ border: `2px solid ${theme.palette.primary.lighter || '#ccc'}` }} />
                                    <Box>
                                        <Typography 
                                            component="a" 
                                            href={`/profile/${enrollment?.userId?._id}`} 
                                            target='_blank' 
                                            sx={{ 
                                                cursor: 'pointer', 
                                                display: 'block', 
                                                textDecoration: 'none', 
                                                color: theme.palette.primary.main, 
                                                fontWeight: 'bold' 
                                            }} 
                                            variant="subtitle2" 
                                            fontWeight="800"
                                        >
                                            {userName}
                                        </Typography>
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

                    {isFetching && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                            <CircularProgress />
                        </Box>
                    )}

                    {!isFetching && displayedEnrollments.length === 0 && enrollments.length > 0 && (
                        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                            <Typography fontSize="1.2rem" color="text.secondary">
                                No enrollments match your filter.
                            </Typography>
                        </Box>
                    )}

                    {!isFetching && enrollments.length === 0 && (
                        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                            <Typography fontSize="1.2rem" color="text.secondary">
                                No enrollments found.
                            </Typography>
                        </Box>
                    )}
                </Stack>

                {hasNextPage && !isFetching && !search && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Button
                            variant="outlined"
                            onClick={() => fetchNextPage()}
                            sx={{
                                color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.main,
                                borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.3)' : theme.palette.primary.main,
                                '&:hover': {
                                    borderColor: theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.dark,
                                    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                                },
                                textTransform: 'none',
                                px: 4,
                                py: 1,
                                borderRadius: '8px',
                                fontWeight: 'bold',
                            }}
                        >
                            Load More
                        </Button>
                    </Box>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default AllEnrollmentsDialog;
