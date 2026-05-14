import React, { useState, useEffect, useMemo } from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Typography, Box, TextField, Select, MenuItem, InputLabel, FormControl, Button, CircularProgress, Rating, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { colorTokens } from '../../theme';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../../api/apiFetch';

const AllReviewsDialog = ({ open, onClose, courseId, reviews, setReviews }) => {
    const theme = useTheme();
    const { token } = useSelector((state) => state.auth);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("newest");
    const [totalReviews, setTotalReviews] = useState(0);
    const navigate = useNavigate();

    const fetchReviews = async (pageNum, isNewSearch = false) => {
        console.log("Calling fetchReviews for allReviewsDialog")
        if (!courseId) return;
        setLoading(true);
        try {
            const data = await apiFetch({
                url: `/api/v1/courses/${courseId}/reviews`,
                params: {
                    page: pageNum,
                    limit: 20,
                    includeUserReview: false
                },
                method: "GET",
            });

            if (data.success) {
                if (isNewSearch) {
                    setReviews(data.reviews);
                } else {
                    setReviews(prev => [...prev, ...data.reviews]);
                }
                setHasMore(data.hasMore);
                setTotalReviews(data.totalReviews);
            }
        } catch (error) {
            console.error("Failed to fetch reviews", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (open) {
            if (reviews.length === 0) {
                setPage(1);
                fetchReviews(1, true);
            }
        } else {
            // setReviews([]);
            // setPage(1);
            // setSearch("");
            // setSort("newest");
        }
    }, [open]);

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchReviews(nextPage, false);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const reviewBg = theme.palette.mode === 'dark'
        ? 'rgba(107, 79, 217, 0.1)'
        : 'rgba(69, 34, 186, 0.05)';
    const reviewBorder = theme.palette.mode === 'dark'
        ? 'rgba(107, 79, 217, 0.2)'
        : 'rgba(69, 34, 186, 0.1)';

    const displayedReviews = useMemo(() => {
        console.log('reviews', reviews)
        let filtered = [...reviews];

        if (search) {
            filtered = filtered.filter(review =>
                review.userId?.name?.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (sort === "newest") {
            filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (sort === "oldest") {
            filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        } else if (sort === "rating-high") {
            filtered.sort((a, b) => {
                if (b.rating !== a.rating) return b.rating - a.rating;
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
        } else if (sort === "rating-low") {
            filtered.sort((a, b) => {
                if (a.rating !== b.rating) return a.rating - b.rating;
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
        }

        return filtered;
    }, [reviews, search, sort]);


    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: '16px', backgroundImage: 'none', backgroundColor: theme.palette.background.default, minHeight: '60vh' } }}>
            <DialogTitle sx={{ m: 0, p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" fontWeight="bold">All Reviews {totalReviews > 0 ? `(${totalReviews})` : ''}</Typography>
                <IconButton aria-label="close" onClick={onClose} sx={{ color: theme.palette.grey[500] }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ p: 3, borderColor: theme.palette.divider }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 4 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search by name..."
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
                            <MenuItem value="rating-high">Highest Rating</MenuItem>
                            <MenuItem value="rating-low">Lowest Rating</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {displayedReviews.map((review, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', md: 'row' },
                                gap: { xs: 2, md: 4 },
                                p: 3,
                                borderRadius: '12px',
                                backgroundColor: reviewBg,
                                border: `1px solid ${reviewBorder}`,
                            }}
                        >
                            <Box sx={{ minWidth: { md: '200px' }, flexShrink: 0 }}>
                                <Rating sx={{
                                    color: colorTokens.secondary.lighter
                                }} value={review.rating} readOnly size="small" />
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    by <a
                                        href={`/profile/${review.userId?._id}`}
                                        target="_blank"
                                        style={{ fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer' }}>{review.userId?.name || 'Anonymous'}</a>
                                </Typography>
                            </Box>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                    {formatDate(review.createdAt)}
                                </Typography>
                                <Typography variant="body1">
                                    {review.review}
                                </Typography>
                            </Box>
                        </Box>
                    ))}

                    {loading && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                            <CircularProgress />
                        </Box>
                    )}

                    {!loading && displayedReviews.length === 0 && reviews.length > 0 && (
                        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                            <Typography fontSize="1.2rem" color="text.secondary">
                                No reviews match your filter.
                            </Typography>
                        </Box>
                    )}

                    {!loading && reviews.length === 0 && (
                        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                            <Typography fontSize="1.2rem" color="text.secondary">
                                No reviews found.
                            </Typography>
                        </Box>
                    )}
                </Box>

                {hasMore && !loading && !search && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Button
                            variant="outlined"
                            onClick={handleLoadMore}
                            sx={{
                                color: theme.palette.mode === 'dark' ? colorTokens.white.main : colorTokens.primary[500],
                                borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.3)' : colorTokens.primary[500],
                                '&:hover': {
                                    borderColor: theme.palette.mode === 'dark' ? colorTokens.white.main : colorTokens.primary[700],
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

export default AllReviewsDialog;
