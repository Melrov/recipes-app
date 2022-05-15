import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RecipesContext } from "../../context/RecipesContext";
import ResultCard from "../Search/ResultCard";

const CardCon = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 16px;
`;

const Redirect = styled.span`
  color: blue;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

function Recipes({ data }) {
  const { recipes } = useContext(RecipesContext);
  const navigate = useNavigate();
  return (
    <>
      {recipes && (
        <CardCon>
          {recipes.map((item) => {
            return <ResultCard key={item.recipe_id} item={item} />;
          })}
          {recipes.length === 0 && (
            <span>
              No saved Recipes <Redirect onClick={() => navigate("/search")}>Click to find Recipes</Redirect>
            </span>
          )}
        </CardCon>
      )}
    </>
  );
}

export default Recipes;
