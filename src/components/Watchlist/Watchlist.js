import SymbolCard from '../SymbolCard/SymbolCard';

const Watchlist = ({ savedSymbols }) => {
  console.log(savedSymbols);
  return (
    <>
      <h4>Watchlist</h4>
      {savedSymbols.length > 0 &&
        savedSymbols.map((symbol) => (
          <SymbolCard showPrice symbol={symbol} key={symbol.symbol} />
        ))}
    </>
  );
};

export default Watchlist;
