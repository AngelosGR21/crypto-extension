export const generateRandomId = () => {
  const randomId = `CT-${Math.round(Math.random() * 5000)}`;
  localStorage.setItem('B-ID', randomId);
  return randomId;
};

export const getBinanceId = () => {
  let binanceId = localStorage.getItem('B-ID');
  if (binanceId) return binanceId;

  binanceId = generateRandomId();
  return binanceId;
};

export const stringifyMessage = (message) => JSON.stringify(message);

export const constructSymbolString = (symbol) =>
  `${symbol.symbol.toLowerCase()}@aggTrade`;

export const constructInitialConnectionParams = (symbols) =>
  symbols.map((symbol) => constructSymbolString(symbol));

const createLocalStorageWatchlist = () => {
  localStorage.setItem('Watchlist', stringifyMessage([]));
  return [];
};

export const getLocalStorageWatchlist = () => {
  let watchlist = localStorage.getItem('Watchlist');
  if (!watchlist) {
    watchlist = createLocalStorageWatchlist();
  } else {
    watchlist = JSON.parse(watchlist);
  }

  return watchlist;
};

export const updateLocalStorageWatchlist = (updatedWatchlist) => {
  localStorage.setItem('Watchlist', stringifyMessage(updatedWatchlist));
};
