// src/components/common/pagination/Pagination.tsx
import React from 'react';
import { Pagination } from '@mui/material';

interface PaginationProps {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  color?: 'primary' | 'secondary' | 'standard';
}

const CustomPagination: React.FC<PaginationProps> = ({ count, page, onChange, color = 'primary' }) => {
  return (
    <Pagination
      count={count}
      page={page}
      onChange={onChange}
      color={color}
    />
  );
};

export default CustomPagination;
