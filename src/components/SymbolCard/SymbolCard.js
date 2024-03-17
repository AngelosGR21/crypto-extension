import { useContext } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AddIcon from '@mui/icons-material/Add';
import { SymbolsContext } from '../../Contexts';

const SymbolCard = ({ symbol, showPrice = false, setSearchTerm }) => {
  const { watchlistSymbols, setWatchlistSymbols } = useContext(SymbolsContext);

  const handleAddSymbol = (e) => {
    if (!watchlistSymbols) {
      localStorage.setItem('Watchlist', JSON.stringify([symbol]));
      setWatchlistSymbols([symbol]);
    } else {
      const symbolExistsInWatchlist = watchlistSymbols.find(
        (symbolInWatchlist) => symbolInWatchlist.symbol === symbol.symbol,
      );

      if (!symbolExistsInWatchlist) {
        const updatedWatchlist = [...watchlistSymbols, symbol];
        localStorage.setItem('Watchlist', JSON.stringify(updatedWatchlist));
        setWatchlistSymbols(updatedWatchlist);
      }
    }

    setSearchTerm('');
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
      </CardContent>
      <CardActions>
        {!showPrice && (
          <IconButton size='small' onClick={handleAddSymbol}>
            <AddIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

export default SymbolCard;
