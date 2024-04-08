import { useState } from 'react';
import SearchBox from './SearchBox/SearchBox';
import Watchlist from './Watchlist/Watchlist';
import { SymbolsContext } from '../Contexts';
import { useBinanceConnection } from '../background/background';
import { getLocalStorageWatchlist } from '../helpers/helpers.mjs';

const App = () => {
  const localStorageWatchlist = getLocalStorageWatchlist();
  const [watchlistSymbols, setWatchlistSymbols] = useState(
    localStorageWatchlist,
  );

  const { sendMessage, lastMessage, binanceId } = useBinanceConnection({
    watchlistSymbols,
  });

  return (
    <>
      <SymbolsContext.Provider
        value={{
          watchlistSymbols,
          setWatchlistSymbols,
          symbolsPriceDetails: lastMessage,
          updateConnection: sendMessage,
          binanceId,
        }}
      >
        <h3>Add a symbol to your watchlist</h3>
        <SearchBox setWatchlistSymbols={setWatchlistSymbols} />
        <Watchlist savedSymbols={watchlistSymbols} />
      </SymbolsContext.Provider>
    </>
  );
};

export default App;
