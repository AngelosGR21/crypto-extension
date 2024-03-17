import SearchBox from "./SearchBox/SearchBox"
import Watchlist from "./Watchlist/Watchlist"
import {useState, useEffect} from "react"
import { SymbolsContext } from "../Contexts"

const App = () => {
  const [watchlistSymbols, setWatchlistSymbols] = useState(() => []);

  useEffect(() => {
    const parsedWatchlist = JSON.parse(localStorage.getItem('Watchlist'));

    if(parsedWatchlist){
      setWatchlistSymbols(parsedWatchlist);
    }
  }, []);


  return (
    <>
    <SymbolsContext.Provider value={{watchlistSymbols, setWatchlistSymbols}}>
    <h3>Add a symbol to your watchlist</h3>
    <SearchBox setWatchlistSymbols={setWatchlistSymbols}/>
    <Watchlist savedSymbols={watchlistSymbols}/>
    </SymbolsContext.Provider>
    </>
  )
}

export default App