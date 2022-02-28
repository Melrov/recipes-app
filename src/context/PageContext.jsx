import React from "react";
import PantryProvider from "./PantryContext";
import RecipesProvider from "./RecipesContext";
import SearchProvider from "./SearchContext";
import ShoppingListProvider from "./ShoppingContex";
import UserProvider from "./UserContext";
import UserDietProvider from "./UserDietContext";

function PageContext({ children }) {
  return (
    <UserProvider>
      <UserDietProvider>
        <SearchProvider>
          <ShoppingListProvider>
            <PantryProvider>
              <RecipesProvider>
                {children}
              </RecipesProvider>
            </PantryProvider>
          </ShoppingListProvider>
        </SearchProvider>
      </UserDietProvider>
    </UserProvider>
  );
}

export default PageContext;
