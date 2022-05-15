import React, { useContext } from "react";
import styled from "styled-components";
import { PantryContext } from "../../context/PantryContext";
import { ShoppingListContext } from "../../context/ShoppingContex";
import IngredientDisplay from "./IngredientDisplay";
import Search from "./Search";


const IngredCon = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const baseUrl = "https://spoonacular.com/cdn/ingredients_100x100/";
function ShoppingList() {
  const { shoppingList } = useContext(ShoppingListContext);
  return (
    <div>
      <Search />
      <IngredCon>
        {shoppingList.map((item) => {
          return <IngredientDisplay key={item.ingredient_id} item={item} />;
        })}
      </IngredCon>
    </div>
  );
}

export default ShoppingList;
