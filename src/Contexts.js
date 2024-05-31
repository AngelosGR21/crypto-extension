import { createContext } from 'react';

export const SymbolsContext = createContext({
  watchlistSymbols: [],
  setWatchlistSymbols: () => {},
  binanceId: '',
  updateConnection: () => {},
  symbolsPriceDetails: {},
});
