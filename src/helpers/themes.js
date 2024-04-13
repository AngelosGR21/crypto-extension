import { createTheme } from '@mui/material';

const colors = {
  black: '#131313',
  yellow: '#DCA225',
  darkerYellow: '#CE8D24',
  orange: '#C17823',
  darkerOrange: '#B46322',
  grey: '#18181B',
  lighterGray: '#FFFFFF1A',
  white: '#FFFFFF',
  darkerGray: '#F3F3F3',
};

export const themeGenerator = (isDark) =>
  createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
      background: {
        default: isDark ? colors.black : colors.white,
      },
      text: {
        primary: isDark ? colors.darkerGray : colors.black,
      },
      primary: {
        main: colors.darkerYellow,
      },
      colors,
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? colors.grey : colors.darkerGray,
            border: `1px solid ${colors.lighterGray}`,
            display: 'flex',
            flexDirection: 'row',
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            display: 'flex',
            flexDirection: 'row',
          },
        },
      },
    },
  });
