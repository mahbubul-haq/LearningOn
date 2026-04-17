import React, { useState } from 'react';
import {
  Box, Card, Typography, Button, Stack,
  RadioGroup, FormControlLabel, Radio, Chip, Container
} from '@mui/material';
import { colorTokens } from '../../theme';

const ResponsiveGlassCard = ({ id, question, options, correctAnswer }) => {
  const [status, setStatus] = useState('unanswered');
  const [selected, setSelected] = useState('');

  const handleSubmit = () => {
    if (!selected) return;
    setStatus(selected === correctAnswer ? 'correct' : 'incorrect');
  };

  const isCorrect = status === 'correct';
  const isIncorrect = status === 'incorrect';

  return (
    <Card
      elevation={0}
      sx={{
        mb: 4,
        borderRadius: '20px',
        backgroundColor: (theme) => theme.palette.learningPage.leftPanelBg,
        backdropFilter: 'blur(20px)',
        border: (theme) => `1px solid ${theme.palette.learningPage.divider}`,
        boxShadow: (theme) => theme.palette.homepage.cardShadow,
        transition: 'all 0.3s ease',
      }}
    >
      <Box p={{ xs: 2.5, sm: 4 }}>
        <Stack direction="row" justifyContent="space-between" mb={2}>
          <Typography variant="overline" sx={{ color: (theme) => theme.palette.secondary.main, fontWeight: 900 }}>
            Question {id}
          </Typography>
          {status !== 'unanswered' && (
            <Chip
              label={isCorrect ? "CORRECT" : "TRY AGAIN"}
              size="small"
              sx={{ bgcolor: isCorrect ? (theme) => theme.palette.success.main : (theme) => theme.palette.error.main, color: colorTokens.white.pure, fontWeight: 800 }}
            />
          )}
        </Stack>

        <Typography variant="h6" sx={{ color: (theme) => theme.palette.learningPage.textPrimary, fontWeight: 600, mb: 3, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
          {question}
        </Typography>

        <RadioGroup value={selected} onChange={(e) => setSelected(e.target.value)}>
          <Stack spacing={1.5}>
            {options.map((option) => (
              <Box
                key={option}
                sx={{
                  borderRadius: '12px',
                  backgroundColor: selected === option ? (theme) => theme.palette.learningPage.lessonActive : (theme) => theme.palette.learningPage.cardBg,
                  border: '1px solid',
                  borderColor: selected === option ? (theme) => theme.palette.secondary.main : (theme) => theme.palette.learningPage.divider,
                  transition: '0.2s',
                  '&:hover': {
                    backgroundColor: (theme) => theme.palette.learningPage.lessonHover,
                  }
                }}
              >
                <FormControlLabel
                  value={option}
                  control={<Radio sx={{ color: (theme) => theme.palette.learningPage.divider, '&.Mui-checked': { color: (theme) => theme.palette.secondary.main } }} />}
                  label={<Typography sx={{ color: (theme) => theme.palette.learningPage.textPrimary, fontSize: '0.95rem' }}>{option}</Typography>}
                  sx={{ width: '100%', m: 0, p: 1 }}
                />
              </Box>
            ))}
          </Stack>
        </RadioGroup>

        <Box
          sx={{
            display: 'flex',
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
                color: (theme) => theme.palette.error.main,
                fontWeight: 700,
                textAlign: { xs: 'center', sm: 'right' },
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
              fontWeight: "bold",
              backgroundColor: (theme) => theme.palette.homepage.buttonPrimary,
              color: colorTokens.white.pure,
              '&:hover': {
                backgroundColor: (theme) => theme.palette.homepage.buttonPrimaryHover
              },
              '&.Mui-disabled': {
                backgroundColor: (theme) => theme.palette.learningPage.divider,
                color: (theme) => theme.palette.learningPage.textSecondary,
                opacity: 0.5
              }
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
      backgroundColor: (theme) => theme.palette.homepage.sectionBg,
      backgroundImage: (theme) => `radial-gradient(circle at 50% 0%, ${theme.palette.homepage.heroBg} 0%, ${theme.palette.homepage.sectionBg} 100%)`,
      py: { xs: 4, sm: 10 }
    }}>
      <Container maxWidth="sm">
        <Box textAlign="center" mb={6}>
          <Typography variant="h4" sx={{ color: (theme) => theme.palette.learningPage.textPrimary, fontWeight: 900, mb: 1 }}>
            Daily Quiz
          </Typography>
          <Typography sx={{ color: (theme) => theme.palette.secondary.main, fontWeight: 600, opacity: 0.8 }}>
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