import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    CircularProgress
} from '@mui/material';
import { StyledButton } from './StyledButton';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';

const StripeConnectModal = ({ open, onClose }) => {
    const theme = useTheme();
    const token = useSelector((state) => state.auth.token);
    const [loading, setLoading] = useState(false);

    const handleConnect = async () => {
        setLoading(true);
        try {
            // We ask the backend for the OAuth Link. 
            // The backend handles state generation (encoding userId) and constructing the URL.
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/data/stripe/onboarding`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
                body: JSON.stringify({})
            });

            const data = await response.json();

            if (data.success && data.url) {
                // Redirect user to Stripe
                window.location.href = data.url;
            } else {
                console.error('Failed to get connection link', data);
                alert(data.message || "Failed to initiate Stripe connection");
                setLoading(false);
            }
        } catch (error) {
            console.error('Error connecting to Stripe:', error);
            alert("An error occurred. Please try again.");
            setLoading(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={loading ? null : onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    backgroundColor: theme.palette.mode === 'dark' ? "rgba(30, 30, 35, 0.95)" : "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(20px)",
                    borderRadius: "16px",
                    border: theme.palette.mode === 'dark' ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(255, 255, 255, 0.5)",
                    boxShadow: theme.palette.mode === 'dark' ? "0 8px 32px rgba(0, 0, 0, 0.4)" : "0 8px 32px rgba(31, 38, 135, 0.15)",
                }
            }}
        >
            <DialogTitle sx={{ textAlign: 'center', fontWeight: 600, pb: 1 }}>
                Connect with Stripe
            </DialogTitle>
            <DialogContent>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
                    You will be redirected to Stripe to connect your account.
                </Typography>
            </DialogContent>
            <DialogActions sx={{ p: 3, justifyContent: 'center' }}>
                <StyledButton
                    onClick={handleConnect}
                    disabled={loading}
                    sx={{
                        width: '100%',
                        py: 1.2,
                        "&&": {
                            background: (theme) => theme.palette.primary.main,
                            color: "white"
                        }
                    }}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Connect with Stripe'}
                </StyledButton>
            </DialogActions>
        </Dialog>
    );
};

export default StripeConnectModal;
