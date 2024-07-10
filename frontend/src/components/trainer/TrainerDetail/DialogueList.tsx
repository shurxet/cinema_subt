// src/components/trainer/TrainerDetail/DialogueList.tsx
import React from 'react';
import { Typography, List } from '@mui/material';
import Dialogue from './Dialogue';

interface DialogueListProps {
  dialogues: DialogueType[];
  selectedDialogue: number;
  defaultVoice: SpeechSynthesisVoice | null;
  voices: SpeechSynthesisVoice[];
  handleVoiceChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const DialogueList: React.FC<DialogueListProps> = ({
  dialogues,
  selectedDialogue,
  defaultVoice,
  voices,
  handleVoiceChange
}) => (
  <List>
    {dialogues.map(dialogue => (
      selectedDialogue === dialogue.id && (
        <React.Fragment key={dialogue.id}>
          <Typography variant="h6" gutterBottom>
            {/*Пример {dialogue.id}*/}
          </Typography>
          <Dialogue
            dialogue={dialogue}
            defaultVoice={defaultVoice}
            voices={voices}
            handleVoiceChange={handleVoiceChange}
          />
        </React.Fragment>
      )
    ))}
  </List>
);

export default DialogueList;
