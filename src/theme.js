import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
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
