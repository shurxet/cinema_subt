// src/components/common/error/Error.tsx
import React from 'react';
import { Typography } from '@mui/material';
import { StyledContainer } from "../../trainer/TrainerList/StyledComponents";

interface ErrorProps {
  message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => (
  <StyledContainer>
    <Typography variant="h6" color="error">
      {message}
    </Typography>
  </StyledContainer>
);

export default Error;
