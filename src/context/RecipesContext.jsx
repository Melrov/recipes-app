import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import useServerFetch from "../hooks/useServerFetch";
import { UserContext } from "./UserContext";

export const RecipesContext = createContext(null);

function RecipesProvider({ children }) {
  const { userId } = useContext(UserContext);
  const [recipes, setRecipes] = useState([]);
  const [substitutes, setSubstitutes] = useState([]);
  const [queryType, setQueryType] = useState(null);
  const [queryUrl, setQueryUrl] = useState(null);
  const [queryBody, setQueryBody] = useState(null);
  const { addFav, removeFav, favsByUserId } = useServerFetch();
  const [lastItem, setLastItem] = useState(null);

  const addRecipe = useCallback(
    async (recipe) => {
      console.log(recipe);
      const res = await addFav(recipe.id);
      console.log(res);
      if (res.data.success) {
        setRecipes((curr) => [...curr, recipe]);
      }
      // console.log(recipe)
    },
    [recipes]
  );

  const removeRecipe = useCallback(
    async (recipe_id) => {
      const res = await removeFav(recipe_id);
      if (res.data.success) {
        setRecipes((curr) => curr.filter((val) => recipe_id !== val.id));
      }
      //setRecipes((curr) => curr.filter((val) => id !== val.id));
    },
    [recipes]
  );

  const isInRecipes = useCallback(
    (id) => {
      if (recipes.filter((val) => id === val.id).length > 0) {
        return true;
      }
      return false;
    },
    [recipes]
  );

  const addSubstitutes = useCallback(
    (recipe) => {
      setSubstitutes((curr) => [...curr, recipe]);
    },
    [substitutes]
  );

  const removeSubstitutes = useCallback(
    (id) => {
      setSubstitutes((curr) => curr.filter((val) => id !== val.id));
    },
    [substitutes]
  );

  const isInSubstitutes = useCallback(
    (ingredient) => {
      if (substitutes.filter((val) => ingredient === val.ingredient).length > 0) {
        return true;
      }
      return false;
    },
    [substitutes]
  );

  const getSubstitute = useCallback(
    (name) => {
      for (let i = 0; i < substitutes.length; i++) {
        if (substitutes[i].ingredient === name) {
          return substitutes[i].value;
        }
      }
      return false;
    },
    [substitutes]
  );

  return (
    <RecipesContext.Provider
      value={{
        recipes,
        setRecipes,
        addRecipe,
        removeRecipe,
        isInRecipes,
        substitutes,
        addSubstitutes,
        removeSubstitutes,
        isInSubstitutes,
        getSubstitute,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
}

export default RecipesProvider;
