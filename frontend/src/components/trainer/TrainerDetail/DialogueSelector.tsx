// src/components/trainer/TrainerDetail/DialogueSelector.tsx
import React from 'react';
import {Button, Box, Grid} from '@mui/material';

interface DialogueSelectorProps {
  dialogues: { id: number }[];
  selectedDialogue: number;
  handleDialogueSelect: (id: number) => void;
}

const DialogueSelector: React.FC<DialogueSelectorProps> = ({ dialogues, selectedDialogue, handleDialogueSelect }) => (
  <Box>
    {dialogues.map(dialogue => (
      <Button sx={{marginRight: 1}}
        key={dialogue.id}
        variant={selectedDialogue === dialogue.id ? 'contained' : 'outlined'}
        onClick={() => handleDialogueSelect(dialogue.id)}
      >
        Пример {dialogue.id}
      </Button>
    ))}
  </Box>
);

export default DialogueSelector;
