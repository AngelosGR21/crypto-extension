import { useState } from 'react';
import SearchBox from '../SearchBox/SearchBox';
import Watchlist from '../Watchlist/Watchlist';
import { SymbolsContext } from '../../Contexts';
import { themeGenerator } from '../../utils/themes';
import { useBinanceConnection } from '../../background/background';
import {
  getLocalStorageTheme,
  getLocalStorageWatchlist,
} from '../../utils/helpers.mjs';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Typography } from '@mui/material';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import logoDark from '../../assets/logoDark.svg';
import logoLight from '../../assets/logoLight.svg';
import { AppContainer, AppLogo } from './AppStyles';

const App = () => {
  const localStorageWatchlist = getLocalStorageWatchlist();
  const userTheme = getLocalStorageTheme();
  const [watchlistSymbols, setWatchlistSymbols] = useState(
    localStorageWatchlist,
  );
  const [currentTheme, setCurrentTheme] = useState(userTheme);

  const { sendMessage, lastMessage, binanceId, connectionStatus } =
    useBinanceConnection({
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
            connectionStatus,
            binanceId,
          }}
        >
          <AppContainer>
            <AppLogo component='img' src={themedLogo} />
            <Typography variant='h5'>Crypto Tracker</Typography>
            <ThemeSwitch
              setCurrentTheme={setCurrentTheme}
              currentTheme={currentTheme}
            />
          </AppContainer>
          <SearchBox setWatchlistSymbols={setWatchlistSymbols} />
          <Watchlist savedSymbols={watchlistSymbols} />
        </SymbolsContext.Provider>
      </ThemeProvider>
    </>
  );
};

export default App;
