import React, { useContext } from "react";
import styled from "styled-components";
import { PantryContext } from "../../context/PantryContext";
import IngredientDisplay from "./IngredientDisplay";
import Search from "./Search";

const IngredCon = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const baseUrl = "https://spoonacular.com/cdn/ingredients_100x100/";
function Pantry() {
  const { ingredients } = useContext(PantryContext);
  return (
    <div>
      <Search />
      <IngredCon>
        {ingredients.map((item) => {
          return <IngredientDisplay key={item.ingredient_id} item={item} />;
        })}
      </IngredCon>
    </div>
  );
}

export default Pantry;
