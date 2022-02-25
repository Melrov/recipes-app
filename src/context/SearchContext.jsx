import React, { createContext, useState } from "react";
import useSearch from "../hooks/useSearch";

export const SearchContext = createContext(null);

function SearchProvider({ children }) {
  const [query, setQuerry] = useState("");
  const { data, error, loading } = useSearch(query);
  return <SearchContext.Provider value={{}}>{children}</SearchContext.Provider>;
}

export default SearchProvider;
