// src/pages/TrainerListPage/TrainerListPage.tsx
import React, { useState } from 'react';
import { Grid, Box, Container, Typography } from '@mui/material';
import useTrainerList from "../../../hooks/trainerHooks/useTrainerList.ts";
import SearchBar from "../../../components/trainer/TrainerList/SearchBar.tsx";
import TrainerCard from "../../../components/trainer/TrainerList/TrainerCard.tsx";
import useTrainerPagination from "../../../hooks/trainerHooks/useTrainerPagination.ts";
import Loading from "../../../components/common/loading/Loading.tsx";
import Error from "../../../components/common/error/Error.tsx";
import FloatingActionButton from "../../../components/common/button/FloatingActionButton.tsx";
import { TRAINERS_PER_PAGE } from "./constants.ts";
import { StyledPagination } from "../../../components/trainer/TrainerList/StyledComponents.ts";

const TrainerListPage: React.FC = () => {
  const { trainers, loading, error } = useTrainerList();
  const [trainersPerPage] = useState<number>(TRAINERS_PER_PAGE);
  const {
    searchTerm,
    setSearchTerm,
    currentPage,
    currentTrainers,
    filteredTrainers,
    handlePageChange
  } = useTrainerPagination(trainers, trainersPerPage);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <Container maxWidth={false} sx={{ padding: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        {/*Тренажёры*/}
      </Typography>
      <Box mb={7} width="40%" mx="auto" display="flex" justifyContent="center">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </Box>
      <Grid container spacing={4}>
        {currentTrainers.map(i => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={i.id}>
            <TrainerCard lesson={i} />
          </Grid>
        ))}
      </Grid>
      <StyledPagination
        count={Math.ceil(filteredTrainers.length / trainersPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        variant="outlined"
        shape="rounded"
        size="large"
      />
      <FloatingActionButton />
    </Container>
  );
};

export default TrainerListPage;
