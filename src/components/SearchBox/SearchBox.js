import { useState } from 'react';
import { TextField } from '@mui/material';
import { marketData } from '../../assets/marketData';

const SearchBox = () => {
  const [searchResults, setSearchResults] = useState([]);

  const searchFunctionality = (e) => {
    console.log(e.target.value.length);
    if (e.target.value.length === 0) {
      setSearchResults([]);
      return;
    }
    const capitalizedSearch = e.target.value.toUpperCase();
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
      />
      <div>
        {searchResults.length !== 0 &&
          searchResults.map((result) => {
            return <div>{result?.symbol}</div>;
          })}
      </div>
    </>
  );
};

export default SearchBox;
