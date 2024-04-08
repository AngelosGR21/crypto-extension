import { useContext, useEffect, useState } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { SymbolsContext } from '../../Contexts';
import {
  stringifyMessage,
  constructSymbolString,
  updateLocalStorageWatchlist,
} from '../../helpers/helpers.mjs';

const SymbolCard = ({ symbol, showPrice = false, setSearchTerm }) => {
  const {
    watchlistSymbols,
    setWatchlistSymbols,
    symbolsPriceDetails,
    updateConnection,
    binanceId = '',
  } = useContext(SymbolsContext);

  const [price, setPrice] = useState(
    () =>
      (symbolsPriceDetails?.s === symbol.symbol &&
        parseFloat(symbolsPriceDetails.p)) ||
      0,
  );

  useEffect(() => {
    setPrice(
      (prev) =>
        (symbolsPriceDetails?.s === symbol.symbol &&
          parseFloat(symbolsPriceDetails.p)) ||
        prev,
    );
  }, [symbolsPriceDetails?.p]);

  const handleAddSymbol = () => {
    if (!watchlistSymbols.length) {
      const updatedWatchlist = [symbol];
      updateLocalStorageWatchlist(updatedWatchlist);
      setWatchlistSymbols(updatedWatchlist);
    } else {
      const symbolExistsInWatchlist = watchlistSymbols.find(
        (symbolInWatchlist) => symbolInWatchlist.symbol === symbol.symbol,
      );

      if (!symbolExistsInWatchlist) {
        const updatedWatchlist = [...watchlistSymbols, symbol];
        updateLocalStorageWatchlist(updatedWatchlist);
        setWatchlistSymbols(updatedWatchlist);

        updateConnection(
          stringifyMessage({
            method: 'SUBSCRIBE',
            params: [constructSymbolString(symbol)],
            id: binanceId,
          }),
        );
      }
    }

    setSearchTerm('');
  };

  const handleRemoveSymbol = () => {
    const updatedWatchlist = watchlistSymbols.filter(
      (listSymbol) => listSymbol.symbol !== symbol.symbol,
    );
    updateLocalStorageWatchlist(updatedWatchlist);
    setWatchlistSymbols(updatedWatchlist);

    updateConnection(
      stringifyMessage({
        method: 'UNSUBSCRIBE',
        params: [constructSymbolString(symbol)],
        id: binanceId,
      }),
    );
  };

  return (
    <Card style={{ display: 'flex', flexDirection: 'row' }}>
      <CardContent>
        {(!symbol.icon && <MonetizationOnIcon />) || (
          <img src={symbol.icon} style={{ display: 'inline-block' }} />
        )}

        <Typography style={{ display: 'inline-block' }}>
          {symbol.symbol}
        </Typography>
        {showPrice && <Typography>{price}</Typography>}
      </CardContent>
      <CardActions>
        {!showPrice && (
          <IconButton size='small' onClick={handleAddSymbol}>
            <AddIcon />
          </IconButton>
        )}
        {showPrice && (
          <IconButton size='small' onClick={handleRemoveSymbol}>
            <RemoveIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

export default SymbolCard;
