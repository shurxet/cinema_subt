// src/hooks/trainerHooks/useTrainerPagination.ts
import React, { useState, useMemo } from 'react';

const useTrainerPagination = (trainers: TrainerListType[], trainersPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTrainers = useMemo(
    () => trainers.filter(trainer => trainer.title.toLowerCase().includes(searchTerm.toLowerCase())),
    [trainers, searchTerm]
  );

  const currentTrainers = useMemo(() => {
    const start = (currentPage - 1) * trainersPerPage;
    return filteredTrainers.slice(start, start + trainersPerPage);
  }, [filteredTrainers, currentPage, trainersPerPage]);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return {
    searchTerm,
    setSearchTerm,
    currentPage,
    currentTrainers,
    filteredTrainers,
    handlePageChange,
  };
};

export default useTrainerPagination;
