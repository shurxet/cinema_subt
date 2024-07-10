// src/components/trainer/TrainerDetail/Section.tsx
import React, { useState } from 'react';
import { Typography, Card, CardContent, Box } from '@mui/material';
import { styled, useTheme } from '@mui/system';
import DialogueSelector from './DialogueSelector';
import DialogueList from './DialogueList';

interface SectionProps {
  section: SectionType;
  defaultVoice: SpeechSynthesisVoice | null;
  voices: SpeechSynthesisVoice[];
  handleVoiceChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    margin: 0,
    padding: 0,
    maxWidth: '100%',
    overflow: 'hidden',
  },
}));

const Section: React.FC<SectionProps> = ({ section, defaultVoice, voices, handleVoiceChange }) => {
  const theme = useTheme();

  // State to track the selected dialogue
  const [selectedDialogue, setSelectedDialogue] = useState(section.dialogues[0].id);

  // Function to change the selected dialogue
  const handleDialogueSelect = (id: number) => {
    setSelectedDialogue(id);
  };

  return (
    // <StyledCard key={section.id}>
      <CardContent sx={{
        [theme.breakpoints.down('sm')]: {
          padding: '0',
          marginTop: '10%',
          maxWidth: '100%',
        }
      }}>
        <Typography variant="h4" gutterBottom>
          {section.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {section.content}
        </Typography>
        <Box mt={2}>
          <Typography variant="h6" gutterBottom sx={{fontWeight: 'bold'}}>
            Диалоги
          </Typography>
          <DialogueSelector
            dialogues={section.dialogues}
            selectedDialogue={selectedDialogue}
            handleDialogueSelect={handleDialogueSelect}
          />
          <DialogueList
            dialogues={section.dialogues}
            selectedDialogue={selectedDialogue}
            defaultVoice={defaultVoice}
            voices={voices}
            handleVoiceChange={handleVoiceChange}
          />
        </Box>
      </CardContent>
    // </StyledCard>
  );
};

export default Section;

