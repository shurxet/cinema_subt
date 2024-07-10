// src/components/trainer/TrainerDetail/TrainerHeader.tsx
import React from 'react';
import { Typography } from '@mui/material';

interface TrainerHeaderProps {
  title: string;
  description: string;
}

const TrainerHeader: React.FC<TrainerHeaderProps> = ({ title, description }) => (
  <>
    <Typography variant="h4" gutterBottom>
      {title}
    </Typography>
    <Typography variant="subtitle1" gutterBottom>
      {description}
    </Typography>
  </>
);

export default TrainerHeader;
