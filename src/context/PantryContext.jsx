import React, { createContext, useState, useCallback } from "react";
import useServerFetch from "../hooks/useServerFetch";

export const PantryContext = createContext(null);

function PantryProvider({ children }) {
  const [ingredients, setIngredients] = useState([]);
  const {
    addIngredient: add,
    removeIngredient: remove,
    editIngredient: edit,
    addIngredientByRecipeId: addByRecipeId,
    addIngredientBySpoonId: addBySpoonId,
  } = useServerFetch();

  const getIngredientIndex = useCallback(
    (ingredient_id) => {
      for (let i = 0; i < ingredients.length; i++) {
        if (ingredients[i].ingredient_id === ingredient_id) {
          return i;
        }
      }
      return -1;
    },
    [ingredients]
  );

  const isInPantry = useCallback(
    (ingredient_id) => {
      if (getIngredientIndex(ingredient_id) >= 0) {
        return true;
      }
      return false;
    },
    [getIngredientIndex]
  );

  const addIngredient = useCallback(
    async (ingredient) => {
      const res = await add(ingredient.ingredient_id, 1);
      console.log(res, ingredient);
      if (res.data.success) {
        setIngredients((curr) => [...curr, ingredient]);
        return true;
      }
      return false;
    },
    [add]
  );

  const addIngredientBySpoonId = useCallback(
    async (ingredient) => {
      const res = await addBySpoonId(ingredient);
      if (res.data.success) {
        setIngredients((curr) => [...curr, res.data.data]);
      }
    },
    [addBySpoonId]
  );

  const addIngredientById = useCallback(
    async (recipe_id, ingredient) => {
      console.log(recipe_id);
      const res = await addByRecipeId(recipe_id, ingredient.ingredient_id);
      console.log(res);
      if (res.data.success) {
        setIngredients((curr) => [...curr, res.data.data]);
      }
    },
    [addByRecipeId]
  );

  const changeIngredientAmount = useCallback(
    async (ingredient_id, amount) => {
      const res = await edit(ingredient_id, amount);
      if (res.data.success) {
        const index = getIngredientIndex(ingredient_id);
        if (index >= 0) {
          let newObj = { ...ingredients[index] };
          newObj.amount = amount;
          setIngredients((curr) => [...curr.slice(0, index), newObj, ...curr.slice(index + 1)]);
        }
      }
    },
    [getIngredientIndex, edit, ingredients]
  );

  const removeIngredient = useCallback(
    async (ingredient_id) => {
      const res = await remove(ingredient_id);
      if (res.data.success) {
        setIngredients((curr) => curr.filter((val) => ingredient_id !== val.ingredient_id));
      }
    },
    [ingredients]
  );

  return (
    <PantryContext.Provider
      value={{
        ingredients,
        isInPantry,
        addIngredient,
        changeIngredientAmount,
        addIngredientById,
        setIngredients,
        addIngredientBySpoonId,
        removeIngredient,
      }}
    >
      {children}
    </PantryContext.Provider>
  );
}

export default PantryProvider;
