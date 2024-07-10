// src/components/trainer/TrainerDetail/HighlightedText.tsx
import React from 'react';
import { Box, Tooltip } from '@mui/material';

interface HighlightedTextProps {
  text: string;
}

const HighlightedText: React.FC<HighlightedTextProps> = ({ text }) => {
  const wordsToHighlight = ["Hello", "Hi", "Good morning", "Goodbye", "Bye"];
  const regex = new RegExp(`\\b(${wordsToHighlight.join('|')})\\b`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        wordsToHighlight.includes(part) ? (
          <Tooltip title="Ключевая фраза" key={index}>
            <Box component="span" sx={{ color: 'yellow', fontWeight: 'bold' }}>{part}</Box>
          </Tooltip>
        ) : (
          part
        )
      )}
    </>
  );
};

export default HighlightedText;
