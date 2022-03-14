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
            <PantryProvider>
          <ShoppingListProvider>
              <RecipesProvider>
                {children}
              </RecipesProvider>
          </ShoppingListProvider>
            </PantryProvider>
        </SearchProvider>
      </UserDietProvider>
    </UserProvider>
  );
}

export default PageContext;
