import React from "react";
import styled from "styled-components";
import ResultCard from "./ResultCard";

const data = {
  offset: 0,
  number: 2,
  results: [
    {
      id: 716429,
      title: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
      calories: 584,
      carbs: "84g",
      fat: "20g",
      image: "https://spoonacular.com/recipeImages/716429-312x231.jpg",
      imageType: "jpg",
      protein: "19g",
    },
    {
      id: 715538,
      title: "What to make for dinner tonight?? Bruschetta Style Pork & Pasta",
      calories: 521,
      carbs: "69g",
      fat: "10g",
      image: "https://spoonacular.com/recipeImages/715538-312x231.jpg",
      imageType: "jpg",
      protein: "35g",
    },
  ],
  totalResults: 86,
};

const CardCon = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 16px;
`;

function SearchResults() {
  return (
    <>
      <CardCon>
        {data.results.map((item) => {
          return <ResultCard key={item.id} item={item} />;
        })}
      </CardCon>
    </>
  );
}

export default SearchResults;
