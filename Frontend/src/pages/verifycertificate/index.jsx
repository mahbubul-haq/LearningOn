import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

const VerifyCertificate = () => {
    const { certificateId } = useParams();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCertificate = async () => {
            try {
                const url = `${import.meta.env.VITE_SERVER_URL}/api/v1/certificates/verify/${certificateId}`;
                const response = await fetch(url);
                const result = await response.json();
                
                if (result.success) {
                    setData(result.certificate);
                } else {
                    setError(result.message || "Invalid certificate");
                }
            } catch (err) {
                console.error("Error fetching certificate:", err);
                setError("There was an error verifying the certificate. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        if (certificateId) {
            fetchCertificate();
        }
    }, [certificateId]);

    const containerStyle = {
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: error ? '#f3f4f6' : '#f0fdf4',
        margin: 0,
        padding: '20px',
        boxSizing: 'border-box'
    };

    const cardStyle = error ? {
        background: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
        textAlign: 'center',
        maxWidth: '400px',
        width: '100%',
        borderTop: '5px solid #ef4444'
    } : {
        background: 'white',
        padding: '50px',
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
        textAlign: 'center',
        maxWidth: '600px',
        width: '100%',
        border: '1px solid #dcfce7',
        position: 'relative',
        overflow: 'hidden'
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f9fafb' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <div style={containerStyle}>
                <div style={cardStyle}>
                    <div style={{ fontSize: '48px', color: '#ef4444', marginBottom: '20px' }}>❌</div>
                    <h1 style={{ margin: '0 0 10px', color: '#1f2937', fontSize: '24px' }}>Invalid Certificate</h1>
                    <p style={{ margin: 0, color: '#6b7280', fontSize: '16px', lineHeight: 1.5 }}>
                        {error.includes("couldn't find") ? (
                            <>We couldn't find a certificate matching the provided ID: <strong>{certificateId}</strong>.</>
                        ) : error}
                    </p>
                    <div style={{ marginTop: '30px', fontSize: '13px', color: '#9ca3af', borderTop: '1px solid #f3f4f6', paddingTop: '15px' }}>
                        Verification provided by {window.location.hostname}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                {/* Top border gradient */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '6px', background: 'linear-gradient(90deg, #10b981, #3b82f6)' }} />
                
                <div style={{ fontSize: '60px', color: '#10b981', marginBottom: '20px' }}>🏆</div>
                <h1 style={{ margin: '0 0 15px', color: '#111827', fontSize: '28px', fontWeight: 700 }}>Certificate Verified</h1>
                <div style={{ display: 'inline-block', backgroundColor: '#dcfce7', color: '#166534', padding: '6px 16px', borderRadius: '9999px', fontSize: '14px', fontWeight: 600, marginBottom: '30px', letterSpacing: '0.5px' }}>
                    ✓ OFFICIAL RECORD
                </div>
                
                <div style={{ textAlign: 'left', background: '#f9fafb', padding: '25px', borderRadius: '12px', marginTop: '10px' }}>
                    <div style={{ marginBottom: '15px', borderBottom: '1px solid #e5e7eb', paddingBottom: '15px' }}>
                        <span style={{ display: 'block', fontSize: '13px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600, marginBottom: '5px' }}>Awarded To</span>
                        <span style={{ fontSize: '18px', color: '#1f2937', fontWeight: 500 }}>{data.studentName}</span>
                    </div>
                    <div style={{ marginBottom: '15px', borderBottom: '1px solid #e5e7eb', paddingBottom: '15px' }}>
                        <span style={{ display: 'block', fontSize: '13px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600, marginBottom: '5px' }}>Course Completed</span>
                        <span style={{ fontSize: '18px', color: '#1f2937', fontWeight: 500 }}>{data.courseTitle}</span>
                    </div>
                    <div style={{ marginBottom: data.isGraded ? '15px' : '0', borderBottom: data.isGraded ? '1px solid #e5e7eb' : 'none', paddingBottom: data.isGraded ? '15px' : '0' }}>
                        <span style={{ display: 'block', fontSize: '13px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600, marginBottom: '5px' }}>Issue Date</span>
                        <span style={{ fontSize: '18px', color: '#1f2937', fontWeight: 500 }}>{data.issueDate}</span>
                    </div>
                    {data.isGraded && (
                        <div style={{ marginBottom: '0', borderBottom: 'none', paddingBottom: '0' }}>
                            <span style={{ display: 'block', fontSize: '13px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600, marginBottom: '5px' }}>Obtained Score</span>
                            <span style={{ fontSize: '18px', color: '#1f2937', fontWeight: 500 }}>{data.scorePercentage}%</span>
                        </div>
                    )}
                </div>
                
                <div style={{ marginTop: '30px', fontSize: '14px', color: '#9ca3af', fontFamily: 'monospace' }}>
                    Certificate ID: {data.certificateId}
                </div>
                <div style={{ marginTop: '20px', fontSize: '13px', color: '#9ca3af', borderTop: '1px solid #f3f4f6', paddingTop: '15px' }}>
                    Verified by {window.location.hostname}
                </div>
            </div>
        </div>
    );
};

export default VerifyCertificate;
