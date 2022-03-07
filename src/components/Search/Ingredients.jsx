import React, { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { PantryContext } from "../../context/PantryContext";
import { RecipesContext } from "../../context/RecipesContext";
import { ShoppingListContext } from "../../context/ShoppingContex";
import useIngredSearch from "../../hooks/useIngredSearch";
import SubstitutesPopup from "./SubstitutesPopup";

const data = [
  {
    aisle: "Milk, Eggs, Other Dairy",
    amount: 1.0,
    consitency: "solid",
    id: 1001,
    image: "butter-sliced.jpg",
    measures: {
      metric: {
        amount: 1.0,
        unitLong: "Tbsp",
        unitShort: "Tbsp",
      },
      us: {
        amount: 1.0,
        unitLong: "Tbsp",
        unitShort: "Tbsp",
      },
    },
    meta: [],
    name: "butter",
    original: "1 tbsp butter",
    originalName: "butter",
    unit: "tbsp",
  },
  {
    aisle: "Produce",
    amount: 2.0,
    consitency: "solid",
    id: 10011135,
    image: "cauliflower.jpg",
    measures: {
      metric: {
        amount: 473.176,
        unitLong: "milliliters",
        unitShort: "ml",
      },
      us: {
        amount: 2.0,
        unitLong: "cups",
        unitShort: "cups",
      },
    },
    meta: ["frozen", "thawed", "cut into bite-sized pieces"],
    name: "cauliflower florets",
    original:
      "about 2 cups frozen cauliflower florets, thawed, cut into bite-sized pieces",
    originalName:
      "about frozen cauliflower florets, thawed, cut into bite-sized pieces",
    unit: "cups",
  },
  {
    aisle: "Cheese",
    amount: 2.0,
    consitency: "solid",
    id: 1041009,
    image: "cheddar-cheese.png",
    measures: {
      metric: {
        amount: 2.0,
        unitLong: "Tbsps",
        unitShort: "Tbsps",
      },
      us: {
        amount: 2.0,
        unitLong: "Tbsps",
        unitShort: "Tbsps",
      },
    },
    meta: ["grated", "(I used romano)"],
    name: "cheese",
    original: "2 tbsp grated cheese (I used romano)",
    originalName: "grated cheese (I used romano)",
    unit: "tbsp",
  },
  {
    aisle: "Oil, Vinegar, Salad Dressing",
    amount: 1.0,
    consitency: "liquid",
    id: 1034053,
    image: "olive-oil.jpg",
    measures: {
      metric: {
        amount: 1.0,
        unitLong: "Tbsp",
        unitShort: "Tbsp",
      },
      us: {
        amount: 1.0,
        unitLong: "Tbsp",
        unitShort: "Tbsp",
      },
    },
    meta: [],
    name: "extra virgin olive oil",
    original: "1-2 tbsp extra virgin olive oil",
    originalName: "extra virgin olive oil",
    unit: "tbsp",
  },
  {
    aisle: "Produce",
    amount: 5.0,
    consitency: "solid",
    id: 11215,
    image: "garlic.jpg",
    measures: {
      metric: {
        amount: 5.0,
        unitLong: "cloves",
        unitShort: "cloves",
      },
      us: {
        amount: 5.0,
        unitLong: "cloves",
        unitShort: "cloves",
      },
    },
    meta: [],
    name: "garlic",
    original: "5-6 cloves garlic",
    originalName: "garlic",
    unit: "cloves",
  },
  {
    aisle: "Pasta and Rice",
    amount: 6.0,
    consitency: "solid",
    id: 20420,
    image: "fusilli.jpg",
    measures: {
      metric: {
        amount: 170.097,
        unitLong: "grams",
        unitShort: "g",
      },
      us: {
        amount: 6.0,
        unitLong: "ounces",
        unitShort: "oz",
      },
    },
    meta: ["(I used linguine)"],
    name: "pasta",
    original: "6-8 ounces pasta (I used linguine)",
    originalName: "pasta (I used linguine)",
    unit: "ounces",
  },
  {
    aisle: "Spices and Seasonings",
    amount: 2.0,
    consitency: "solid",
    id: 1032009,
    image: "red-pepper-flakes.jpg",
    measures: {
      metric: {
        amount: 2.0,
        unitLong: "pinches",
        unitShort: "pinches",
      },
      us: {
        amount: 2.0,
        unitLong: "pinches",
        unitShort: "pinches",
      },
    },
    meta: ["red"],
    name: "red pepper flakes",
    original: "couple of pinches red pepper flakes, optional",
    originalName: "couple of red pepper flakes, optional",
    unit: "pinches",
  },
  {
    aisle: "Spices and Seasonings",
    amount: 2.0,
    consitency: "solid",
    id: 1102047,
    image: "salt-and-pepper.jpg",
    measures: {
      metric: {
        amount: 2.0,
        unitLong: "servings",
        unitShort: "servings",
      },
      us: {
        amount: 2.0,
        unitLong: "servings",
        unitShort: "servings",
      },
    },
    meta: ["to taste"],
    name: "salt and pepper",
    original: "salt and pepper, to taste",
    originalName: "salt and pepper, to taste",
    unit: "servings",
  },
  {
    aisle: "Produce",
    amount: 3.0,
    consitency: "solid",
    id: 11291,
    image: "spring-onions.jpg",
    measures: {
      metric: {
        amount: 3.0,
        unitLong: "",
        unitShort: "",
      },
      us: {
        amount: 3.0,
        unitLong: "",
        unitShort: "",
      },
    },
    meta: ["white", "green", "separated", "chopped"],
    name: "scallions",
    original: "3 scallions, chopped, white and green parts separated",
    originalName: "scallions, chopped, white and green parts separated",
    unit: "",
  },
  {
    aisle: "Alcoholic Beverages",
    amount: 2.0,
    consitency: "liquid",
    id: 14106,
    image: "white-wine.jpg",
    measures: {
      metric: {
        amount: 2.0,
        unitLong: "Tbsps",
        unitShort: "Tbsps",
      },
      us: {
        amount: 2.0,
        unitLong: "Tbsps",
        unitShort: "Tbsps",
      },
    },
    meta: ["white"],
    name: "white wine",
    original: "2-3 tbsp white wine",
    originalName: "white wine",
    unit: "tbsp",
  },
  {
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
  },
];


const newdaata = [
  {
      "id": 3,
      "ingredient_id": 6,
      "amount": 1,
      "original": "1 cup Fresh bread crumbs",
      "consistency": "solid",
      "recipe_id": 3,
      "unit": "cup"
  },
  {
      "id": 4,
      "ingredient_id": 7,
      "amount": 4,
      "original": "4 Eggs",
      "consistency": "solid",
      "recipe_id": 3,
      "unit": ""
  },
  {
      "id": 5,
      "ingredient_id": 9,
      "amount": 1,
      "original": "1 pch Salt",
      "consistency": "solid",
      "recipe_id": 3,
      "unit": ""
  },
  {
      "id": 6,
      "ingredient_id": 8,
      "amount": 1,
      "original": "1 cup Boiled milk",
      "consistency": "liquid",
      "recipe_id": 3,
      "unit": "cup"
  }
]

const IngredCon = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 160px;
  padding: 5px;
`;
const Img = styled.img`
  object-fit: none;
  max-width: 100px;
  max-height: 100px;
`;
const ItemName = styled.span`
  text-align: center;
`;

const baseUrl = "https://spoonacular.com/cdn/ingredients_100x100/";
function Ingredients({ serving, ingredients }) {
    const [query, setQuery] = useState("")
    const [open, setOpen] = useState(false);
  const [servings, setServings] = useState(serving);
  const { isInPantry, addIngredientById } = useContext(PantryContext);
  const { isInShoppingList, addItemById } = useContext(ShoppingListContext);
  const { isInSubstitutes, substitutes, getSubstitute } = useContext(RecipesContext)
  const {data, error, loading } = useIngredSearch('food/ingredients/substitutes', query)

  const findSubstitute = useCallback((name) => {
    setQuery(name)
  }, [])

  useEffect(() => {
      if(data){
          setOpen(true)
      }
  }, [data])
  return (
    <div>
      <input
        type="number"
        value={servings}
        onChange={(e) => setServings(e.target.value)}
      />
      <IngredCon>
        {ingredients.map((item) => {
          return (
            <Item
              key={item.id}
              style={{ backgroundColor: isInPantry(item.id) ? "green" : "red" }}
            >
              {!isInPantry(item.id) && (
                <>
                  <button onClick={() => addIngredientById(item.id)}>
                    Add to Pantry
                  </button>
                  {!isInShoppingList(item.id) && (<> 
                    <button onClick={() => addItemById(item.id)}>Add to ShoppingList</button>
                    { !isInSubstitutes(item.name) && <button onClick={() => findSubstitute(item.name)}>Find Substitute</button>}
                  </>
                  )}
                </>
              )}
              <Img src={baseUrl + item.image} />
              <ItemName>{item.name}</ItemName>
              <span>{`${(item.measures["us"].amount * servings) / serving} ${
                item.measures["us"].unitLong
              }`}</span>
              { isInSubstitutes(item.name) && <span>{getSubstitute(item.name)}</span>}
            </Item>
          );
        })}
      </IngredCon>
      { data && <SubstitutesPopup open={open} setOpen={setOpen} data={data}/> }
    </div>
  );
}

export default Ingredients;
