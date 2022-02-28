import React, { createContext, useCallback, useEffect, useState } from "react";
import useSearchInfo from "../hooks/useSearchInfo";

export const ShoppingListContext = createContext(null);

function ShoppingListProvider({ children }) {
  const [query, setQuery] = useState("");
  const [shoppingList, setShoppingList] = useState([]);
  const { data, error, loading } = useSearchInfo(query);

  const addItem = useCallback(
    (ingredient) => {
      setShoppingList((curr) => [...curr, ingredient]);
    },
    [shoppingList]
  );

  const removeItem = useCallback(
    (id) => {
      setShoppingList((curr) => curr.filter((val) => id !== val.id));
    },
    [shoppingList]
  );

  const isInShoppingList = useCallback(
    (id) => {
      if (shoppingList.filter((val) => id === val.id).length > 0) {
        return true;
      }
      return false;
    },
    [shoppingList]
  );

  const addItemById = useCallback((id) => {
    setQuery("food/ingredients/" + id + "/information?amount=1");
  }, []);

  const changeItemAmount = useCallback((amount, id) => {
    const index = getItemIndex(id)
  if(index >= 0){
      let newObj = shoppingList[index]
      newObj.amount = amount
      if(newObj.amount <= 0){
        setShoppingList(curr => [...curr.slice(0, index), ...curr.slice(index+1)])
      }else{
          setShoppingList(curr => [...curr.slice(0, index), newObj, ...curr.slice(index+1)])
      }
  }
}, [shoppingList])

const getItemIndex = useCallback((id) => {
    for(let i = 0; i < shoppingList.length; i++){
        if(shoppingList[i].id === id){
            return i
        }
    }
    return -1
}, [shoppingList])


  useEffect(() => {
    if (data) {
      setShoppingList((curr) => [...curr, data]);
    }
  }, [data]);

  return (
    <ShoppingListContext.Provider
      value={{
        shoppingList,
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
