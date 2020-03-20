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
  typography: {
    fontFamily: [
      '"Nunito Sans"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
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
    MuiTypography: {
      h1: {
        fontSize: '4.3rem',
      },
      h2: {
        fontSize: '2.5rem',
      },
      h3: {
        fontSize: '1.6rem',
      },
      subtitle1: {
        fontSize: '1.3rem',
      },
      subtitle2: {
        fontSize: '1.05rem',
      },
      caption: {
        fontSize: '0.85rem',
      },
    },
  },
});

export default theme;
