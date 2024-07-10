// src/components/trainer/TrainerList/SearchBar.tsx
import React from 'react';
import {Paper} from '@mui/material';
import {StyledTextField} from "./StyledComponents.ts";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => (
  <Paper
    component="form"
    elevation={3}
    sx={{ display: 'flex', width: '100%', alignItems: 'center', padding: '3px 3px', mb: 1, backgroundColor: '#283838' }}
  >
      <StyledTextField
          fullWidth
          label="Поиск по тренажёрам"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          // InputProps={{
          //     startAdornment: (
          //         <InputAdornment position="start">
          //             <SearchIcon/>
          //         </InputAdornment>
          //     ),
          // }}
      />
      {/*<IconButton type="submit" sx={{ p: '10px' }} aria-label="search">*/}
      {/*  <SearchIcon />*/}
      {/*</IconButton>*/}
  </Paper>
);

export default SearchBar;
