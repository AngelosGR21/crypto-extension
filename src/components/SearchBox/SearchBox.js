import { useState } from 'react';
import { ClickAwayListener } from '@mui/material';
import { marketData } from '../../assets/marketData';
import SymbolCard from '../SymbolCard/SymbolCard';
import {
  StyledSearchBox,
  StyledSearchResultsContainer,
  StyledSearchAndResultsContainer,
  StyledNoMarketsTypography,
} from './SearchBoxStyles';

const SearchBox = () => {
  const [searchResults, setSearchResults] = useState(() => []);
  const [searchTerm, setSearchTerm] = useState('');
  const [popover, setPopover] = useState(false);

  const searchFunctionality = (e) => {
    const currentValue = e.target.value;

    setSearchTerm(currentValue);
    if (currentValue.length === 0) {
      setSearchResults([]);
      setPopover(false);
      return;
    } else {
      setPopover(true);
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
      <ClickAwayListener
        onClickAway={() => {
          setPopover(false);
        }}
      >
        <StyledSearchAndResultsContainer>
          <StyledSearchBox
            autoComplete='off'
            placeholder='Search markets here'
            size='small'
            onChange={searchFunctionality}
            onFocus={() => {
              setPopover(
                searchResults.length > 0 || searchTerm.length > 0
                  ? true
                  : false,
              );
            }}
            value={searchTerm}
          />

          {popover && (
            <StyledSearchResultsContainer>
              {(searchResults.length === 0 && (
                <StyledNoMarketsTypography>
                  No markets found
                </StyledNoMarketsTypography>
              )) ||
                searchResults.map((result) => {
                  return (
                    <SymbolCard
                      symbol={result}
                      key={result.symbol}
                      setSearchTerm={setSearchTerm}
                      setPopover={setPopover}
                    />
                  );
                })}
            </StyledSearchResultsContainer>
          )}
        </StyledSearchAndResultsContainer>
      </ClickAwayListener>
    </>
  );
};

export default SearchBox;
