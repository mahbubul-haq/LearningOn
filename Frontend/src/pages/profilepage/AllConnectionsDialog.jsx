import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Typography, Box, Button, CircularProgress, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { colorTokens } from '../../theme';
import ProfileCard from '../../components/ProfileCard';
import { apiFetch } from '../../api/apiFetch';

const AllConnectionsDialog = ({ open, onClose, userId, type }) => {
    const theme = useTheme();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [connections, setConnections] = useState([]);

    const fetchConnections = async (pageNum, isInitial = false) => {
        if (!userId || !type) return;
        setLoading(true);
        try {
            const endpoint = type === 'followers'
                ? `/api/v1/users/${userId}/followers`
                : `/api/v1/users/${userId}/following`;

            const data = await apiFetch({
                url: endpoint,
                params: {
                    page: pageNum,
                    limit: 10,
                },
                method: "GET",
            });

            if (data.success) {
                const newItems = type === 'followers' ? data.followers : data.following;
                
                if (isInitial) {
                    setConnections(newItems || []);
                } else {
                    setConnections(prev => [...prev, ...(newItems || [])]);
                }
                
                setHasMore(pageNum < (data.totalPages || 1));
                setTotalCount(data.totalCount || 0);
            }
        } catch (error) {
            console.error(`Failed to fetch ${type}`, error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (open) {
            setPage(1);
            fetchConnections(1, true);
        } else {
            // Clean up slightly on close, optional but good for freshness
            setTimeout(() => {
                setConnections([]);
                setPage(1);
            }, 300); // Wait for dialog close animation
        }
    }, [open, userId, type]);

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchConnections(nextPage, false);
    };

    const titleText = type === 'followers' ? 'All Followers' : 'All Following';

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: '16px', backgroundImage: 'none', backgroundColor: theme.palette.background.default, minHeight: '60vh' } }}>
            <DialogTitle sx={{ m: 0, p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" fontWeight="bold">{titleText} {totalCount > 0 ? `(${totalCount})` : ''}</Typography>
                <IconButton aria-label="close" onClick={onClose} sx={{ color: theme.palette.grey[500] }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ p: 3, borderColor: theme.palette.divider }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    
                    <Box sx={{
                        display: "grid",
                        gap: "1rem",
                        flexWrap: "wrap",
                        gridTemplateColumns: { xs: "repeat(1, 1fr)", sm: "repeat(2, 1fr)" }
                    }}>
                        {connections.map((userInfo, index) => (
                            <ProfileCard key={userInfo._id || index} userInfo={userInfo} />
                        ))}
                    </Box>

                    {loading && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                            <CircularProgress />
                        </Box>
                    )}

                    {!loading && connections.length === 0 && (
                        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                            <Typography fontSize="1.2rem" color="text.secondary">
                                {type === 'followers' ? 'No followers found.' : 'Not following anyone.'}
                            </Typography>
                        </Box>
                    )}
                </Box>

                {hasMore && !loading && (
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

export default AllConnectionsDialog;
