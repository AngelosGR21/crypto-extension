import { Typography } from '@mui/material';
import SymbolCard from '../SymbolCard/SymbolCard';

const Watchlist = ({ savedSymbols }) => {
  return (
    <>
      <h4>Watchlist</h4>
      {(savedSymbols.length > 0 &&
        savedSymbols.map((symbol) => (
          <SymbolCard showPrice symbol={symbol} key={symbol.symbol} />
        ))) || <Typography>No markets saved</Typography>}
    </>
  );
};

export default Watchlist;
