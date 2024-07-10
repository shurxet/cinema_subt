// src/components/trainer/TrainerDetail/VoiceSelector.tsx
import React from 'react';
import { Typography, Select, MenuItem, Box } from '@mui/material';
import { styled } from '@mui/system';

interface VoiceSelectorProps {
  defaultVoice: string;
  voices: SpeechSynthesisVoice[];
  onVoiceChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const StyledBox = styled(Box)(({ theme }) => ({
  marginTop: '10px',
  display: 'flex',
  justifyContent: 'flex-end',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    maxWidth: '100%',
    overflow: 'hidden',
  },
}));

const VoiceSelector: React.FC<VoiceSelectorProps> = ({ defaultVoice, voices, onVoiceChange }) => (
  <StyledBox>
    <Typography variant="body2" sx={{ marginRight: '10px', alignSelf: 'center' }}>
      Выбрать голос:
    </Typography>
    <Select value={defaultVoice} onChange={onVoiceChange}>
      {voices.map((voice) => (
        <MenuItem key={voice.name} value={voice.name}>
          {voice.name} ({voice.lang})
        </MenuItem>
      ))}
    </Select>
  </StyledBox>
);

export default VoiceSelector;
