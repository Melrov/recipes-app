import React from "react";
import PantryProvider from "./PantryContext";
import SearchProvider from "./SearchContext";
import UserProvider from "./UserContext";
import UserDietProvider from "./UserDietContext";

function PageContext({ children }) {
  return (
    <UserProvider>
      <UserDietProvider>
        <SearchProvider>
          <PantryProvider>
            {children}
          </PantryProvider>
        </SearchProvider>
      </UserDietProvider>
    </UserProvider>
  );
}

export default PageContext;
