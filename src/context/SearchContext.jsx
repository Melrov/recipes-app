import React, { createContext, useCallback, useEffect, useState } from "react";
import useSearch from "../hooks/useSearch";

export const SearchContext = createContext(null);

function SearchProvider({ children }) {
  const [results, setResults] = useState(null)
  const [query, setQuerry] = useState("");
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(0)
  const [showSettings, setShowSettings] = useState(false);
  const [instructionsRequired, setInstructionsRequired] = useState(false);
  const [useDiet, setUseDiet] = useState(false);
  const [useIntolerances, setUseIntolerances] = useState(false);
  const [useNutrition, setUseNutrition] = useState(false);
  const [totalResults, setTotalResults] = useState(0)
  const [number, setNumber] = useState(0)
  const [offset, setOffset] = useState(0)
  const [pages, setPages] = useState(0)

  useEffect(() => {
    if(results){
      setTotalResults(results.totalResults)
      if(number === 0){
        setNumber(results.number)
      }
    }
  }, [results, number])

  useEffect(() => {
    setPages(parseInt(totalResults / number))
  }, [totalResults, number])

  
  const submitSearch = useCallback(() => {
    setTotalResults(0)
    setNumber(0)
    setOffset(0)
    setPages(0)
    setQuerry(search);
  }, [search]);

  return (
    <SearchContext.Provider
      value={{
        query,
        offset,
        results,
        setResults,
        search,
        setSearch,
        submitSearch,
        instructionsRequired,
        setInstructionsRequired,
        useDiet,
        setUseDiet,
        useIntolerances,
        setUseIntolerances,
        useNutrition,
        setUseNutrition,
        showSettings,
        setShowSettings,
        pages,
        page,
        setPage
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export default SearchProvider;
