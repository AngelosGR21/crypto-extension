import { useContext, useEffect, useState } from 'react';
import { Box, CardActions, Typography } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CheckIcon from '@mui/icons-material/Check';
import { SymbolsContext } from '../../Contexts';
import {
  stringifyMessage,
  constructSymbolString,
  updateLocalStorageItem,
} from '../../helpers/helpers.mjs';
import {
  StyledCard,
  StyledCardContent,
  StyledSymbolName,
  StyledIconButton,
} from './SymbolCardStyles';

const SymbolCard = ({
  symbol,
  showPrice = false,
  setSearchTerm,
  setPopover,
  fromSearch,
}) => {
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

    updateConnection(
      stringifyMessage({
        method: 'SUBSCRIBE',
        params: [constructSymbolString(symbol)],
        id: binanceId,
      }),
    );

    setPopover(false);
    setSearchTerm('');
  };

  const handleRemoveSymbol = () => {
    const updatedWatchlist = watchlistSymbols.filter(
      (listSymbol) => listSymbol.symbol !== symbol.symbol,
    );
    updateLocalStorageItem('Watchlist', updatedWatchlist, true);
    setWatchlistSymbols(updatedWatchlist);

    updateConnection(
      stringifyMessage({
        method: 'UNSUBSCRIBE',
        params: [constructSymbolString(symbol)],
        id: binanceId,
      }),
    );
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
    <StyledCard fromSearch>
      <StyledCardContent>
        <CoinLogo />
        <StyledSymbolName>{symbol.symbol}</StyledSymbolName>
        {showPrice && <Typography>{price}</Typography>}
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
