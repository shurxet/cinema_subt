// src/components/trainer/hooks/useSnackbarClose.ts
import React from "react";

const useSnackbarClose = (setOpenSnackbar: React.Dispatch<React.SetStateAction<boolean>>) => {
  const handleSnackbarClose = (_event: React.SyntheticEvent<HTMLElement, Event> | Event, reason: string) => {
    if (reason === 'clickable') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleAlertClose = () => {
    setOpenSnackbar(false);
  };

  return { handleSnackbarClose, handleAlertClose };
};

export default useSnackbarClose;
