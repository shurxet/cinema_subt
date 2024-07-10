// src/components/trainer/TrainerDetail/TrainerRating.tsx
import React from 'react';
import { Box, Rating } from '@mui/material';

interface TrainerRatingProps {
  rating: number | null;
  onRatingChange: (event: React.ChangeEvent<NonNullable<unknown>>, newValue: number | null) => void;
}

const TrainerRating: React.FC<TrainerRatingProps> = ({ rating, onRatingChange }) => (
  <Box mb={3}>
    <Rating
      name="lesson-rating"
      value={rating}
      onChange={onRatingChange}
      precision={0.5}
    />
  </Box>
);

export default TrainerRating;
