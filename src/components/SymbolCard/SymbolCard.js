import { useContext, useEffect, useState } from 'react';
import { Box, CardActions } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CheckIcon from '@mui/icons-material/Check';
import { SymbolsContext } from '../../Contexts';
import {
  constructSymbolString,
  updateLocalStorageItem,
} from '../../utils/helpers.mjs';
import {
  StyledCard,
  StyledCardContent,
  StyledSymbolName,
  StyledIconButton,
} from './SymbolCardStyles';

import SymbolPrice from './SymbolPrice';

const SymbolCard = ({
  symbol,
  showPrice = false,
  setSearchTerm,
  setPopover,
  setSearchResults,
}) => {
  const {
    watchlistSymbols,
    setWatchlistSymbols,
    symbolsPriceDetails,
    updateConnection,
    binanceId = '',
    connectionStatus,
  } = useContext(SymbolsContext);

  const [price, setPrice] = useState(
    () =>
      (symbolsPriceDetails?.s === symbol.symbol &&
        parseFloat(symbolsPriceDetails.p)) ||
      0,
  );

  const symbolExistsInWatchlist = watchlistSymbols.find(
    (watchlistSymbol) => watchlistSymbol.symbol === symbol.symbol,
  );

  useEffect(() => {
    setPrice(
      (prev) =>
        (symbolsPriceDetails?.s === symbol.symbol &&
          parseFloat(symbolsPriceDetails.p)) ||
        prev,
    );
  }, [symbolsPriceDetails?.s === symbol.symbol, symbolsPriceDetails?.p]);

  const handleAddSymbol = () => {
    let updatedWatchlist = [];
    if (!watchlistSymbols.length) {
      updatedWatchlist = [symbol];
    } else {
      updatedWatchlist = [...watchlistSymbols, symbol];
    }

    updateLocalStorageItem('Watchlist', updatedWatchlist, true);
    setWatchlistSymbols(updatedWatchlist);

    updateConnection({
      method: 'SUBSCRIBE',
      params: [constructSymbolString(symbol)],
      id: binanceId,
    });

    setPopover(false);
    setSearchTerm('');
    setSearchResults([]);
  };

  const handleRemoveSymbol = () => {
    const updatedWatchlist = watchlistSymbols.filter(
      (listSymbol) => listSymbol.symbol !== symbol.symbol,
    );
    updateLocalStorageItem('Watchlist', updatedWatchlist, true);
    setWatchlistSymbols(updatedWatchlist);

    updateConnection({
      method: 'UNSUBSCRIBE',
      params: [constructSymbolString(symbol)],
      id: binanceId,
    });
  };

  const CoinLogo = () => {
    const styles = {
      width: '30px',
      display: 'inline-block',
      marginRight: '16px',
    };
    if (!symbol.icon) {
      return <MonetizationOnIcon sx={styles} />;
    } else {
      return <Box component='img' src={symbol.icon} style={styles} />;
    }
  };

  return (
    <StyledCard>
      <StyledCardContent>
        <CoinLogo />
        <StyledSymbolName>{symbol.symbol}</StyledSymbolName>
        {showPrice && (
          <SymbolPrice price={price} connectionStatus={connectionStatus} />
        )}
      </StyledCardContent>
      <CardActions>
        {(showPrice && (
          <StyledIconButton
            size='small'
            onClick={handleRemoveSymbol}
            icontype='remove'
          >
            <RemoveIcon />
          </StyledIconButton>
        )) ||
          (symbolExistsInWatchlist && <CheckIcon />) || (
            <StyledIconButton
              size='small'
              onClick={handleAddSymbol}
              icontype='add'
            >
              <AddIcon />
            </StyledIconButton>
          )}
      </CardActions>
    </StyledCard>
  );
};

export default SymbolCard;
