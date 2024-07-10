// src/components/common/button/FloatingActionButton.tsx
import React from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const FloatingActionButton: React.FC = () => (
    <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: 16, right: 16 }}>
      <AddIcon />
    </Fab>
);

export default FloatingActionButton;
