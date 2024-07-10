// src/components/common/loading/Loading.tsx
import React from 'react';
import { CircularProgress } from '@mui/material';
import { StyledContainer } from "../../trainer/TrainerList/StyledComponents";

const Loading: React.FC = () => (
  <StyledContainer>
    <CircularProgress />
  </StyledContainer>
);

export default Loading;
