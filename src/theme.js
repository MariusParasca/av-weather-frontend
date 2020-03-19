import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    text: {
      primary: '#FFFFFF',
    },
    primary: {
      main: '#6c66fa',
      contrastText: '#FFFFFF',
    },
  },
  overrides: {
    MuiButton: {
      text: {
        '&': {
          padding: '16px 8px',
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        '&:hover $notchedOutline': {
          borderColor: 'none',
        },
      },
      notchedOutline: {
        borderWidth: '2px',
        borderColor: '#33325D',
      },
      input: {
        '&::placeholder': {
          color: '#575696',
          fontWeight: 600,
        },
        '&': {
          color: '#6C66FA',
        },
      },
    },
  },
});

export default theme;
