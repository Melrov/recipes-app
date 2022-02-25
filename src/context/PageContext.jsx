import React from "react";
import SearchProvider from "./SearchContext";
import UserProvider from "./UserContext";
import UserDietProvider from "./UserDietContext";

function PageContext({ children }) {
  return (
    <UserProvider>
      <UserDietProvider>
        <SearchProvider>
            {children}
        </SearchProvider>
      </UserDietProvider>
    </UserProvider>
  );
}

export default PageContext;
