import React from "react";
import styled from "styled-components";

let a = {
  aisle: "Pasta and Rice",
  amount: 0.25,
  consitency: "solid",
  id: 99025,
  image: "breadcrumbs.jpg",
  measures: {
    metric: {
      amount: 59.147,
      unitLong: "milliliters",
      unitShort: "ml",
    },
    us: {
      amount: 0.25,
      unitLong: "cups",
      unitShort: "cups",
    },
  },
  meta: ["whole wheat", "(I used panko)"],
  name: "whole wheat bread crumbs",
  original: "1/4 cup whole wheat bread crumbs (I used panko)",
  originalName: "whole wheat bread crumbs (I used panko)",
  unit: "cup",
};

let b = [
  {
    id: 19400,
    name: "banana chips",
    image: "banana-chips.jpg",
  },
  {
    id: 93779,
    name: "banana liqueur",
    image: "limoncello.jpg",
  },
];

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px;
  background-color: white;
  border-radius: 10px;
  padding: 5px;
  width: 128px;
`;
const ImgCon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
`;
const Img = styled.img`
  object-fit: none;
`;
const NameCon = styled.div`
  text-align: center;
  margin-top: auto;
  margin-bottom: auto;
`;

const baseUrl = "https://spoonacular.com/cdn/ingredients_100x100/";
function IngredientDisplay({ item }) {
  return (
    <Item>
      <ImgCon>
        <Img src={baseUrl + item.image} />
      </ImgCon>
      <NameCon>
        <span>{item.name}</span>
      </NameCon>
    </Item>
  );
}

export default IngredientDisplay;
