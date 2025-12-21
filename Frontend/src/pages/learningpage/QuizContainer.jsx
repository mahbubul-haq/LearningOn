import React, { useState } from 'react';
import {
  Box, Card, Typography, Button, Stack,
  RadioGroup, FormControlLabel, Radio, Chip, Container, CssBaseline
} from '@mui/material';

const ResponsiveGlassCard = ({ id, question, options, correctAnswer }) => {
  const [status, setStatus] = useState('unanswered');
  const [selected, setSelected] = useState('');

  const handleSubmit = () => {
    if (!selected) return;
    setStatus(selected === correctAnswer ? 'correct' : 'incorrect');
  };

  const isCorrect = status === 'correct';
  const isIncorrect = status === 'incorrect';

  // Your Primary Brand Colors
  const brandGreen = '#2ed573';
  const brandDarkGreen = '#1b9b51';

  return (
    <Card
      elevation={0}
      sx={{
        mb: 4,
        borderRadius: '20px',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(15px) saturate(160%)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: isCorrect ? `0 0 30px ${brandGreen}33` : '0 10px 30px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
      }}
    >
      <Box p={{ xs: 2.5, sm: 4 }}> {/* Smaller padding for small phones */}
        <Stack direction="row" justifyContent="space-between" mb={2}>
          <Typography variant="overline" sx={{ color: brandGreen, fontWeight: 900 }}>
            Question {id}
          </Typography>
          {status !== 'unanswered' && (
            <Chip
              label={isCorrect ? "CORRECT" : "TRY AGAIN"}
              size="small"
              sx={{ bgcolor: isCorrect ? brandGreen : '#ff4757', color: '#fff', fontWeight: 800 }}
            />
          )}
        </Stack>

        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600, mb: 3, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
          {question}
        </Typography>

        <RadioGroup value={selected} onChange={(e) => setSelected(e.target.value)}>
          <Stack spacing={1.5}>
            {options.map((option) => (
              <Box
                key={option}
                sx={{
                  borderRadius: '12px',
                  background: selected === option ? 'rgba(46, 213, 115, 0.15)' : 'rgba(255,255,255,0.05)',
                  border: '1px solid',
                  borderColor: selected === option ? brandGreen : 'rgba(255,255,255,0.1)',
                  transition: '0.2s',
                }}
              >
                <FormControlLabel
                  value={option}
                  control={<Radio sx={{ color: 'rgba(255,255,255,0.3)', '&.Mui-checked': { color: brandGreen } }} />}
                  label={<Typography sx={{ color: '#fff', fontSize: '0.95rem' }}>{option}</Typography>}
                  sx={{ width: '100%', m: 0, p: 1 }}
                />
              </Box>
            ))}
          </Stack>
        </RadioGroup>

        {/* --- RESPONSIVE ACTION AREA --- */}
        <Box
          sx={{
            display: 'flex',
            // Switches to vertical on screens < 600px (or your specific 400px breakpoint)
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'flex-end',
            alignItems: { xs: 'stretch', sm: 'center' },
            mt: 4,
            gap: 2
          }}
        >
          {isIncorrect && (
            <Typography
              variant="body2"
              sx={{
                color: '#ff6b81',
                fontWeight: 700,
                textAlign: { xs: 'center', sm: 'right' },
                order: { xs: 2, sm: 1 } // Put text below button on mobile if preferred, or keep 1 for above
              }}
            >
              Incorrect. Try again for 0.75 pts.
            </Typography>
          )}

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={isCorrect || !selected}
            sx={{
              borderRadius: '12px',
              px: 4,
              py: 1.5,
              fontWeight: 800,
              bgcolor: brandGreen,
              order: { xs: 1, sm: 2 }, // Button first on mobile, then feedback below it
              '&:hover': { bgcolor: brandDarkGreen },
              '&.Mui-disabled': { bgcolor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)' }
            }}
          >
            {isIncorrect ? 'RE-SUBMIT' : 'SUBMIT ANSWER'}
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default function GreenGlassQuiz() {
  return (
    <Box sx={{
      minHeight: '100vh',
      background: '#0a1a12', // Deep forest green background
      backgroundImage: 'radial-gradient(circle at 50% 0%, #1b4d3e 0%, #0a1a12 100%)',
      py: { xs: 4, sm: 10 }
    }}>
      <Container maxWidth="sm"> {/* "md" to "sm" for a tighter vertical laptop look */}
        <Box textAlign="center" mb={6}>
          <Typography variant="h4" sx={{ color: '#fff', fontWeight: 900, mb: 1 }}>
            Daily Quiz
          </Typography>
          <Typography sx={{ color: '#2ed573', fontWeight: 600, opacity: 0.8 }}>
            Lesson 1.1 Status
          </Typography>
        </Box>

        <ResponsiveGlassCard
          id="1"
          question="Which green energy source is most reliable for constant baseline power?"
          options={["Solar", "Wind", "Geothermal", "Tidal"]}
          correctAnswer="Geothermal"
        />
      </Container>
    </Box>
  );
}