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
  },
});

export default theme;
