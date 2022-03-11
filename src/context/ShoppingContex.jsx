import React, { createContext, useCallback, useEffect, useState } from "react";
import useSearchInfo from "../hooks/useSearchInfo";
import useServerFetch from "../hooks/useServerFetch";

export const ShoppingListContext = createContext(null);

function ShoppingListProvider({ children }) {
  //const [query, setQuery] = useState("");
  const [shoppingList, setShoppingList] = useState([]);
  //const { data, error, loading } = useSearchInfo(query);
  const { searchIngredientInfo, addIngredientShopping, removeIngredientShopping, editIngredientShopping, addIngredientBySpoonIdShopping } = useServerFetch();

  const addItem = useCallback(
    async (ingredient) => {
      const res = await addIngredientShopping(ingredient.ingredient_id, ingredient.amount);
      if (res.data.success) {
        setShoppingList((curr) => [...curr, ingredient]);
      }
    },
    [shoppingList]
  );

  const removeItem = useCallback(
    async (id) => {
      const res = await removeIngredientShopping(id);
      if (res.data.success) {
        setShoppingList((curr) => curr.filter((val) => id !== val.id));
      }
    },
    [shoppingList]
  );

  const isInShoppingList = useCallback(
    (ingredient_id) => {
      if (shoppingList.filter((val) => ingredient_id === val.ingredient_id).length > 0) {
        return true;
      }
      return false;
    },
    [shoppingList]
  );

  const addItemById = useCallback(async(item) => {
    console.log(item)
    const res = await addIngredientShopping(item.ingredient_id, 1)
    console.log(res)
    if(res.data.success){
      setShoppingList((curr) => [...curr, {...item, amount: 1}])
    }
  }, [shoppingList]);

  const changeItemAmount = useCallback(
    async (amount, id) => {
      const res = await editIngredientShopping(id, amount);
      if (res.data.success) {
        const index = getItemIndex(id);
        if (index >= 0) {
          let newObj = shoppingList[index];
          newObj.amount = amount;
          if (newObj.amount <= 0) {
            setShoppingList((curr) => [...curr.slice(0, index), ...curr.slice(index + 1)]);
          } else {
            setShoppingList((curr) => [...curr.slice(0, index), newObj, ...curr.slice(index + 1)]);
          }
        }
      }
    },
    [shoppingList]
  );

  const getItemIndex = useCallback(
    (id) => {
      for (let i = 0; i < shoppingList.length; i++) {
        if (shoppingList[i].id === id) {
          return i;
        }
      }
      return -1;
    },
    [shoppingList]
  );

  return (
    <ShoppingListContext.Provider
      value={{
        shoppingList,
        setShoppingList,
        addItem,
        removeItem,
        isInShoppingList,
        addItemById,
        changeItemAmount,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
}

export default ShoppingListProvider;
