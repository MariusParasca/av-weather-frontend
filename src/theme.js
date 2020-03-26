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
        fontSize: '5.3vh',
      },
      h2: {
        fontSize: '3.5vh',
      },
      h3: {
        fontSize: '2.6vh',
      },
      subtitle1: {
        fontSize: '2.3vh',
      },
      subtitle2: {
        fontSize: '2.05vh',
      },
      caption: {
        fontSize: '1.2vh',
      },
    },
  },
});

export default theme;
