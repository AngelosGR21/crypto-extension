import { useState } from 'react';
import { TextField } from '@mui/material';
import { marketData } from '../../assets/marketData';
import SymbolCard from '../SymbolCard/SymbolCard';

const SearchBox = () => {
  const [searchResults, setSearchResults] = useState(() => []);
  const [searchTerm, setSearchTerm] = useState('');

  const searchFunctionality = (e) => {
    const currentValue = e.target.value;

    setSearchTerm(currentValue);
    if (currentValue.length === 0) {
      setSearchResults([]);
      return;
    }
    const capitalizedSearch = currentValue.toUpperCase();
    const marketSearched = [];

    marketData.forEach((market) => {
      if (
        market.baseAsset.startsWith(capitalizedSearch) ||
        market.symbol.startsWith(capitalizedSearch)
      ) {
        marketSearched.push(market);
      }
    });

    setSearchResults(marketSearched);
  };

  return (
    <>
      <TextField
        placeholder='Search markets here'
        size='small'
        onChange={searchFunctionality}
        value={searchTerm}
      />
      {searchTerm.length > 0 && searchResults.length === 0 && (
        <div>
          <h4>No markets found</h4>
        </div>
      )}

      {searchTerm.length > 0 && searchResults.length > 0 && (
        <div>
          {searchResults.map((result) => {
            return (
              <SymbolCard
                symbol={result}
                key={result.symbol}
                setSearchTerm={setSearchTerm}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default SearchBox;
