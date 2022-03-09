import React, { createContext, useCallback, useEffect, useState } from "react";
import useSearch from "../hooks/useSearch";
import useServerFetch from "../hooks/useServerFetch";

export const SearchContext = createContext(null);

function SearchProvider({ children }) {
  const { searchRecipe } = useServerFetch();
  const [results, setResults] = useState(null);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [instructionsRequired, setInstructionsRequired] = useState(false);
  const [useDiet, setUseDiet] = useState(false);
  const [useIntolerances, setUseIntolerances] = useState(false);
  const [useNutrition, setUseNutrition] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [number, setNumber] = useState(0);
  const [offset, setOffset] = useState(0);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    if (results) {
      setTotalResults(results.totalResults);
      if (number === 0) {
        setNumber(results.number);
      }
    }
  }, [results, number]);

  useEffect(() => {
    setPages(parseInt(totalResults / number));
  }, [totalResults, number]);

  const submitSearch = useCallback(async () => {
    const res = await searchRecipe(search);
    if (res.data.success) {
      setResults(res.data.data);
      setTotalResults(0);
      setNumber(0);
      setOffset(0);
      setPages(0);
    }
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
        setPage,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export default SearchProvider;
