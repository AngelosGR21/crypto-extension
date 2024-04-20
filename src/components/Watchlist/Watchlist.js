import { Typography } from '@mui/material';
import SymbolCard from '../SymbolCard/SymbolCard';

const Watchlist = ({ savedSymbols }) => {
  return (
    <>
      <Typography variant='h6' align='center' sx={{ margin: '10px 0' }}>
        Watchlist
      </Typography>
      {(savedSymbols.length > 0 &&
        savedSymbols.map((symbol) => (
          <SymbolCard showPrice symbol={symbol} key={symbol.symbol} />
        ))) || <Typography align='center'>No markets saved</Typography>}
    </>
  );
};

export default Watchlist;
