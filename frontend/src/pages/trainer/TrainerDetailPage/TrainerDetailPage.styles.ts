import { SxProps, Theme } from '@mui/material/styles';

export const containerStyle: SxProps<Theme> = {
  textAlign: 'center',
  marginTop: 4,
  overflow: 'hidden'
};

export const paperStyle: SxProps<Theme> = (theme) => ({
  padding: 4,
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    paddingLeft: 1,
    paddingRight: 1,
    paddingTop: 4,
    borderRadius: theme.spacing(2),
  }
});
