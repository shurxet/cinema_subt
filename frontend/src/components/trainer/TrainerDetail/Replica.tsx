// src/components/trainer/TrainerDetail/Replica.tsx
import React from 'react';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { PlayArrow as PlayArrowIcon } from '@mui/icons-material';
import { useSpeechSynthesis } from 'react-speech-kit';
import HighlightedText from './HighlightedText';

interface ReplicaProps {
  text: string;
  label: string;
  backgroundColor: string;
  defaultVoice: SpeechSynthesisVoice | null;
}

const Replica: React.FC<ReplicaProps> = ({ text, label, backgroundColor, defaultVoice }) => {
  const theme = useTheme();
  const { speak } = useSpeechSynthesis();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        backgroundColor,
        borderRadius: '12px',
        padding: '12px 16px',
        margin: text.includes('собеседник A') ? '0 10px 10px 0' : '0 0 10px 10px',
        maxWidth: '75%',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        border: `1px solid ${backgroundColor.split(', 0.9').join(', 0.5')}`,
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
        },
        [theme.breakpoints.down('sm')]: {
          marginRight: '0',
          marginBottom: '10px',
          maxWidth: '100%',
        },
      }}
    >
      <Typography variant="body1" component="div">
        <Box component="span" sx={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
          {label}:
        </Box>
        <HighlightedText text={text} />
      </Typography>
      <IconButton
        onClick={() => speak({ text, voice: defaultVoice, rate: 1, pitch: 1 })}
        sx={{
          marginLeft: '10px',
          color: 'white',
          '&:hover': {
            color: 'lightgray',
          },
          [theme.breakpoints.down('sm')]: {
            marginLeft: '0',
          },
        }}
      >
        <PlayArrowIcon />
      </IconButton>
    </Box>
  );
};

export default Replica;
