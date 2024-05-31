import { createTheme } from '@mui/material';

const colors = {
  black: '#131313',
  bronze: '#C17823',
  charcoal: '#18181B',
  darkerBronze: '#B46322',
  darkerGold: '#CE8D24',
  gold: '#DCA225',
  lightGray: '#F3F3F3',
  darkGray: '#1A1A1A',
  silver: '#EAEAEA',
  snowWhite: '#FFFFFF',
  translucentWhite: '#FFFFFF1A',
};

export const themeGenerator = (isDark) =>
  createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
      background: {
        default: isDark ? colors.black : colors.snowWhite,
      },
      text: {
        primary: isDark ? colors.lightGray : colors.black,
      },
      primary: {
        main: colors.darkerGold,
      },
      colors,
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? colors.charcoal : colors.lightGray,
            border: `1px solid ${colors.translucentWhite}`,
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
