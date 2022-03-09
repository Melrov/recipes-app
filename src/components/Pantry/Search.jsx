import React, { useState, useEffect, useCallback } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import useFetch from "../../hooks/useFetch";
import styled from "styled-components";
import AddIngredient from "./AddIngredient";
import useSearchInfo from "../../hooks/useSearchInfo";
import useServerFetch from "../../hooks/useServerFetch";

let b = {
    "id": 9266,
    "original": "pineapples",
    "originalName": "pineapples",
    "name": "pineapples",
    "nameClean": "pineapple",
    "amount": 1.0,
    "unit": "",
    "unitShort": "",
    "unitLong": "",
    "possibleUnits": [
        "piece",
        "slice",
        "fruit",
        "g",
        "oz",
        "cup",
        "serving"
    ],
    "estimatedCost": {
        "value": 299.0,
        "unit": "US Cents"
    },
    "consistency": "solid",
    "shoppingListUnits": [
        "pieces"
    ],
    "aisle": "Produce",
    "image": "pineapple.jpg",
    "meta": [],
    "nutrition": {
        "nutrients": [
            {
                "name": "Calories",
                "amount": 452.5,
                "unit": "cal",
                "percentOfDailyNeeds": 22.63
            },
            {
                "name": "Fat",
                "amount": 1.09,
                "unit": "g",
                "percentOfDailyNeeds": 1.67
            },
            {
                "name": "Saturated Fat",
                "amount": 0.08,
                "unit": "g",
                "percentOfDailyNeeds": 0.51
            },
            {
                "name": "Carbohydrates",
                "amount": 118.74,
                "unit": "g",
                "percentOfDailyNeeds": 39.58
            },
            {
                "name": "Net Carbohydrates",
                "amount": 106.07,
                "unit": "g",
                "percentOfDailyNeeds": 38.57
            },
            {
                "name": "Sugar",
                "amount": 89.14,
                "unit": "g",
                "percentOfDailyNeeds": 99.05
            },
            {
                "name": "Cholesterol",
                "amount": 0.0,
                "unit": "mg",
                "percentOfDailyNeeds": 0.0
            },
            {
                "name": "Sodium",
                "amount": 9.05,
                "unit": "mg",
                "percentOfDailyNeeds": 0.39
            },
            {
                "name": "Protein",
                "amount": 4.89,
                "unit": "g",
                "percentOfDailyNeeds": 9.77
            },
            {
                "name": "Vitamin C",
                "amount": 432.59,
                "unit": "mg",
                "percentOfDailyNeeds": 524.35
            },
            {
                "name": "Manganese",
                "amount": 8.39,
                "unit": "mg",
                "percentOfDailyNeeds": 419.47
            },
            {
                "name": "Fiber",
                "amount": 12.67,
                "unit": "g",
                "percentOfDailyNeeds": 50.68
            },
            {
                "name": "Vitamin B6",
                "amount": 1.01,
                "unit": "mg",
                "percentOfDailyNeeds": 50.68
            },
            {
                "name": "Copper",
                "amount": 1.0,
                "unit": "mg",
                "percentOfDailyNeeds": 49.78
            },
            {
                "name": "Vitamin B1",
                "amount": 0.72,
                "unit": "mg",
                "percentOfDailyNeeds": 47.66
            },
            {
                "name": "Folate",
                "amount": 162.9,
                "unit": "µg",
                "percentOfDailyNeeds": 40.73
            },
            {
                "name": "Potassium",
                "amount": 986.45,
                "unit": "mg",
                "percentOfDailyNeeds": 28.18
            },
            {
                "name": "Magnesium",
                "amount": 108.6,
                "unit": "mg",
                "percentOfDailyNeeds": 27.15
            },
            {
                "name": "Vitamin B3",
                "amount": 4.53,
                "unit": "mg",
                "percentOfDailyNeeds": 22.63
            },
            {
                "name": "Vitamin B5",
                "amount": 1.93,
                "unit": "mg",
                "percentOfDailyNeeds": 19.28
            },
            {
                "name": "Vitamin B2",
                "amount": 0.29,
                "unit": "mg",
                "percentOfDailyNeeds": 17.04
            },
            {
                "name": "Iron",
                "amount": 2.62,
                "unit": "mg",
                "percentOfDailyNeeds": 14.58
            },
            {
                "name": "Calcium",
                "amount": 117.65,
                "unit": "mg",
                "percentOfDailyNeeds": 11.77
            },
            {
                "name": "Vitamin A",
                "amount": 524.9,
                "unit": "IU",
                "percentOfDailyNeeds": 10.5
            },
            {
                "name": "Zinc",
                "amount": 1.09,
                "unit": "mg",
                "percentOfDailyNeeds": 7.24
            },
            {
                "name": "Phosphorus",
                "amount": 72.4,
                "unit": "mg",
                "percentOfDailyNeeds": 7.24
            },
            {
                "name": "Vitamin K",
                "amount": 6.34,
                "unit": "Âµg",
                "percentOfDailyNeeds": 6.03
            },
            {
                "name": "Selenium",
                "amount": 0.91,
                "unit": "Âµg",
                "percentOfDailyNeeds": 1.29
            },
            {
                "name": "Vitamin E",
                "amount": 0.18,
                "unit": "mg",
                "percentOfDailyNeeds": 1.21
            }
        ],
        "properties": [
            {
                "name": "Glycemic Index",
                "amount": 58.67,
                "unit": ""
            },
            {
                "name": "Glycemic Load",
                "amount": 62.23,
                "unit": ""
            }
        ],
        "caloricBreakdown": {
            "percentProtein": 3.88,
            "percentFat": 1.94,
            "percentCarbs": 94.18
        },
        "weightPerServing": {
            "amount": 905,
            "unit": "g"
        }
    },
    "categoryPath": [
        "tropical fruit",
        "fruit"
    ]
}

let a = {
  results: [
    {
      id: 20081,
      name: "flour",
      image: "flour.png",
    },
    {
      id: 10218364,
      name: "flour tortilla",
      image: "flour-tortilla.jpg",
    },
    {
      id: 20132,
      name: "oat flour",
      image: "brown-flour.jpg",
    },
    {
      id: 20027,
      name: "cornflour",
      image: "white-powder.jpg",
    },
    {
      id: 20064,
      name: "rye flour",
      image: "brown-flour.jpg",
    },
    {
      id: 16115,
      name: "soy flour",
      image: "chickpea-flour-or-another-gluten-free-flour.jpg",
    },
    {
      id: 10020129,
      name: "cake flour",
      image: "flour.png",
    },
    {
      id: 20061,
      name: "rice flour",
      image: "white-powder.jpg",
    },
    {
      id: 20019,
      name: "corn flour",
      image: "corn-flour.jpg",
    },
    {
      id: 20317,
      name: "masa flour",
      image: "corn-flour.jpg",
    },
  ],
  offset: 0,
  number: 10,
  totalResults: 55,
};

const ResultImg = styled.img`
  height: 40px;
  margin-left: 8px;
`;
const ResultName = styled.span`
  margin-right: 8px;
  margin-top: auto;
  margin-bottom: auto;
`;
const Arrow = styled.div`
  border-right: 2px solid rgba(0, 0, 0, 0.54);
  border-bottom: 2px solid rgba(0, 0, 0, 0.54);
  width: 10px;
  height: 10px;
  transform: ${(props) => (props.show ? "rotate(45deg)" : "rotate(-135deg)")};
`;

const ResultsCon = styled.div`
  position: absolute;
  background: white;
  width: 230px;
`;
const Result = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  &:hover {
    background-color: gray;
  }
`;

const baseUrl = "https://spoonacular.com/cdn/ingredients_100x100/";

function Search() {
  const { searchIngredients, searchIngredientInfo } = useServerFetch();
  const [query, setQuery] = useState("");
  const [queryData, setQueryData] = useState(null)
  const [singleQuery, setSingleQuery] = useState("");
  const [singleQueryData, setSingleQueryData] = useState(null)
  const [showResults, setShowResults] = useState(null);
  const [search, setSearch] = useState("");
  const [showNew, setShowNew] = useState(false)
  const [typing, setTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(search);
      setQuery(search);
      if(!search){
        setShowResults(null)
      }
      else{
        setShowResults(true)
      }
    }, 1200);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  useEffect(() => {
    async function init(){
      const res = await searchIngredients(query)
      if(res.data.success){
        setQueryData(res.data.data)
      }
    }
    if(query){
      init()
    }
  }, [query])

  useEffect(() => {
    async function init(){
      const res = await searchIngredientInfo(singleQuery)
      if(res.data.success){
        setSingleQueryData(res.data.data)
      }
    }
    if(singleQuery){
      init()
    }
  }, [singleQuery])

  return (
    <>
      <Paper
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          width: 230,
          height: "3.5vh",
        }}
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search for Ingredients"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          inputProps={{ "aria-label": "search for ingredients" }}
        />
        {showResults !== null && (
          <IconButton onClick={() => setShowResults(!showResults)}>
            <Arrow show={showResults} />
          </IconButton>
        )}
      </Paper>
      { showNew && singleQueryData &&<AddIngredient data={singleQueryData} setShowNew={setShowNew} /> }
      {showResults && queryData &&(
        <ResultsCon>
          {queryData.results.map((item) => {
            return (
              <Result
                key={item.id}
                onClick={() => {
                  setShowResults(false);
                  setSingleQuery(item.id);
                  setShowNew(true)
                }}
              >
                <ResultImg src={baseUrl + item.image} />
                <ResultName>{item.name}</ResultName>
              </Result>
            );
          })}
        </ResultsCon>
      )}
    </>
  );
}

export default Search;
