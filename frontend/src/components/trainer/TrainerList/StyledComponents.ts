// src/components/trainer/TrainerList/StyledComponents.ts
import { styled } from '@mui/system';
import {
  Card,
  Container,
  TextField,
  Pagination,
} from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 15px 20px rgba(0, 0, 0, 0.2)',
  },
}));

export const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: '#282828',
  borderRadius: theme.shape.borderRadius,
}));

export const StyledPagination = styled(Pagination)(({ theme }) => ({
  marginTop: theme.spacing(4),
  display: 'flex',
  justifyContent: 'center',
}));
