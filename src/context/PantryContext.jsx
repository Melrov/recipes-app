import React, {
  createContext,
  useState,
  useCallback,
  useEffect,
  useContext,
} from "react";
import useSearchInfo from "../hooks/useSearchInfo";
import useServerFetch from "../hooks/useServerFetch";
import { ShoppingListContext } from "./ShoppingContex";
import { UserContext } from "./UserContext";

export const PantryContext = createContext(null);

const example = {
  id: 9266,
  original: "pineapples",
  originalName: "pineapples",
  name: "pineapples",
  nameClean: "pineapple",
  amount: 1.0,
  unit: "",
  unitShort: "",
  unitLong: "",
  possibleUnits: ["piece", "slice", "fruit", "g", "oz", "cup", "serving"],
  estimatedCost: {
    value: 299.0,
    unit: "US Cents",
  },
  consistency: "solid",
  shoppingListUnits: ["pieces"],
  aisle: "Produce",
  image: "pineapple.jpg",
  meta: [],
  nutrition: {
    nutrients: [
      {
        name: "Calories",
        amount: 452.5,
        unit: "cal",
        percentOfDailyNeeds: 22.63,
      },
      {
        name: "Fat",
        amount: 1.09,
        unit: "g",
        percentOfDailyNeeds: 1.67,
      },
      {
        name: "Saturated Fat",
        amount: 0.08,
        unit: "g",
        percentOfDailyNeeds: 0.51,
      },
      {
        name: "Carbohydrates",
        amount: 118.74,
        unit: "g",
        percentOfDailyNeeds: 39.58,
      },
      {
        name: "Net Carbohydrates",
        amount: 106.07,
        unit: "g",
        percentOfDailyNeeds: 38.57,
      },
      {
        name: "Sugar",
        amount: 89.14,
        unit: "g",
        percentOfDailyNeeds: 99.05,
      },
      {
        name: "Cholesterol",
        amount: 0.0,
        unit: "mg",
        percentOfDailyNeeds: 0.0,
      },
      {
        name: "Sodium",
        amount: 9.05,
        unit: "mg",
        percentOfDailyNeeds: 0.39,
      },
      {
        name: "Protein",
        amount: 4.89,
        unit: "g",
        percentOfDailyNeeds: 9.77,
      },
      {
        name: "Vitamin C",
        amount: 432.59,
        unit: "mg",
        percentOfDailyNeeds: 524.35,
      },
      {
        name: "Manganese",
        amount: 8.39,
        unit: "mg",
        percentOfDailyNeeds: 419.47,
      },
      {
        name: "Fiber",
        amount: 12.67,
        unit: "g",
        percentOfDailyNeeds: 50.68,
      },
      {
        name: "Vitamin B6",
        amount: 1.01,
        unit: "mg",
        percentOfDailyNeeds: 50.68,
      },
      {
        name: "Copper",
        amount: 1.0,
        unit: "mg",
        percentOfDailyNeeds: 49.78,
      },
      {
        name: "Vitamin B1",
        amount: 0.72,
        unit: "mg",
        percentOfDailyNeeds: 47.66,
      },
      {
        name: "Folate",
        amount: 162.9,
        unit: "µg",
        percentOfDailyNeeds: 40.73,
      },
      {
        name: "Potassium",
        amount: 986.45,
        unit: "mg",
        percentOfDailyNeeds: 28.18,
      },
      {
        name: "Magnesium",
        amount: 108.6,
        unit: "mg",
        percentOfDailyNeeds: 27.15,
      },
      {
        name: "Vitamin B3",
        amount: 4.53,
        unit: "mg",
        percentOfDailyNeeds: 22.63,
      },
      {
        name: "Vitamin B5",
        amount: 1.93,
        unit: "mg",
        percentOfDailyNeeds: 19.28,
      },
      {
        name: "Vitamin B2",
        amount: 0.29,
        unit: "mg",
        percentOfDailyNeeds: 17.04,
      },
      {
        name: "Iron",
        amount: 2.62,
        unit: "mg",
        percentOfDailyNeeds: 14.58,
      },
      {
        name: "Calcium",
        amount: 117.65,
        unit: "mg",
        percentOfDailyNeeds: 11.77,
      },
      {
        name: "Vitamin A",
        amount: 524.9,
        unit: "IU",
        percentOfDailyNeeds: 10.5,
      },
      {
        name: "Zinc",
        amount: 1.09,
        unit: "mg",
        percentOfDailyNeeds: 7.24,
      },
      {
        name: "Phosphorus",
        amount: 72.4,
        unit: "mg",
        percentOfDailyNeeds: 7.24,
      },
      {
        name: "Vitamin K",
        amount: 6.34,
        unit: "Âµg",
        percentOfDailyNeeds: 6.03,
      },
      {
        name: "Selenium",
        amount: 0.91,
        unit: "Âµg",
        percentOfDailyNeeds: 1.29,
      },
      {
        name: "Vitamin E",
        amount: 0.18,
        unit: "mg",
        percentOfDailyNeeds: 1.21,
      },
    ],
    properties: [
      {
        name: "Glycemic Index",
        amount: 58.67,
        unit: "",
      },
      {
        name: "Glycemic Load",
        amount: 62.23,
        unit: "",
      },
    ],
    caloricBreakdown: {
      percentProtein: 3.88,
      percentFat: 1.94,
      percentCarbs: 94.18,
    },
    weightPerServing: {
      amount: 905,
      unit: "g",
    },
  },
  categoryPath: ["tropical fruit", "fruit"],
};

function PantryProvider({ children }) {
  const [ingredients, setIngredients] = useState([]);
  const [query, setQuery] = useState("");
  const [queryUrl, setQueryUrl] = useState(null);
  const [queryType, setQueryType] = useState(null);
  //const { data, error, loading } = useSearchInfo(query)
  //const [query, setQuery] = useState(null)
  const { addItem } = useContext(ShoppingListContext);
  const [lastItem, setLastItem] = useState(null);

  const { addIngredient: add, removeIngredient: remove, editIngredient: edit, pantryByUserId: byId, addIngredientByRecipeId: addByRecipeId, addIngredientBySpoonId: addBySpoonId } =
    useServerFetch();

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
    [ingredients]
  );



  const addIngredient = useCallback(async (ingredient) => {
    const res = await add(ingredient.id, ingredient.amount)
    if(res.data.success){
        setIngredients((curr) => [...curr, ingredient])
    }
  }, [ingredients]);

  const addIngredientBySpoonId = useCallback(async (ingredient) => {
    const res = await addBySpoonId(ingredient)
    console.log(res)
    if(res.data.success){
        setIngredients((curr) => [...curr, res.data.data])
    }
  }, [ingredients]);


  const addIngredientById = useCallback(async(recipe_id, ingredient) => {
    console.log(ingredient)
    const res = await addByRecipeId(recipe_id, ingredient.ingredient_id)
    console.log(res, recipe_id, ingredient)
    if(res.data.success){
      setIngredients((curr) => [...curr, res.data.data])
    }
  }, []);


  const changeIngredientAmount = useCallback(
    async (ingredient_id, amount) => {
        const res = await edit(ingredient_id, amount)
        if(res.data.success){
            const index = getIngredientIndex(ingredient_id)
            if(index >= 0){
                let newObj = {...ingredients[index]}
                newObj.amount = amount
                // if(newObj.amount <= 0){
                //     addItem(ingredients[index])
                //     setIngredients(curr => [...curr.slice(0, index), ...curr.slice(index+1)])
                // }
                //else{
                    setIngredients(curr => [...curr.slice(0, index), newObj, ...curr.slice(index+1)])
                //}
            }
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
        addIngredientBySpoonId
      }}
    >
      {children}
    </PantryContext.Provider>
  );
}

export default PantryProvider;
