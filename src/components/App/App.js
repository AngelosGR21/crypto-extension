import { useState } from 'react';
import SearchBox from '../SearchBox/SearchBox';
import Watchlist from '../Watchlist/Watchlist';
import { SymbolsContext } from '../../Contexts';
import { themeGenerator } from '../../helpers/themes';
import { useBinanceConnection } from '../../background/background';
import {
  getLocalStorageTheme,
  getLocalStorageWatchlist,
} from '../../helpers/helpers.mjs';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, Typography } from '@mui/material';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import logoDark from '../../assets/logoDark.svg';
import logoLight from '../../assets/logoLight.svg';
import { classes } from './AppStyles';

const App = () => {
  const localStorageWatchlist = getLocalStorageWatchlist();
  const userTheme = getLocalStorageTheme();
  const [watchlistSymbols, setWatchlistSymbols] = useState(
    localStorageWatchlist,
  );
  const [currentTheme, setCurrentTheme] = useState(userTheme);

  const { sendMessage, lastMessage, binanceId } = useBinanceConnection({
    watchlistSymbols,
  });
  const theme = themeGenerator(currentTheme === 'dark');
  const themedLogo = currentTheme === 'dark' ? logoDark : logoLight;

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SymbolsContext.Provider
          value={{
            watchlistSymbols,
            setWatchlistSymbols,
            symbolsPriceDetails: lastMessage,
            updateConnection: sendMessage,
            binanceId,
          }}
        >
          <Box sx={classes.container}>
            <Box component='img' src={themedLogo} sx={classes.logo} />
            <Typography variant='h5'>Crypto Tracker</Typography>
            <ThemeSwitch
              setCurrentTheme={setCurrentTheme}
              currentTheme={currentTheme}
            />
          </Box>
          <SearchBox setWatchlistSymbols={setWatchlistSymbols} />
          <Watchlist savedSymbols={watchlistSymbols} />
        </SymbolsContext.Provider>
      </ThemeProvider>
    </>
  );
};

export default App;
