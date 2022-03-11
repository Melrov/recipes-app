import React, { useState, useContext, useCallback, useEffect } from "react";
import styled from "styled-components";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { PantryContext } from "../../context/PantryContext";

const baseUrl = "https://spoonacular.com/cdn/ingredients_100x100/";

const AddButton = styled.div`
  border-left: 2px solid rgba(0, 0, 0, 0.54);
  width: 10px;
  height: 10px;
  margin-left: 20px;
`;
const AddButtonR = styled.div`
  border-top: 2px solid rgba(0, 0, 0, 0.54);
  width: 10px;
  height: 10px;
`;

function AddIngredient({ data, setShowNew }) {
  console.log(data);
  const [item, setItem] = useState(null);
  //const [customName, setCustomName] = useState(false);
  const {
    ingredients,
    isInPantry,
    addIngredient,
    changeIngredientAmount,
    addIngredientBySpoonId,
  } = useContext(PantryContext);
  
  useEffect(() => {
    setItem(Object.assign({ amount: 1 }, data));
    setShowNew(true)
  }, [data]);

  return (
    <>
      {item && (
        <div>
          <img src={baseUrl + data.image} />
          <span>{data.nameClean ? data.nameClean : data.name}</span>
          {/* <input
        type="checkbox"
        name="check"
        onClick={() => setCustomName(!customName)}
      />
      <label htmlFor="check">Use Custom Name</label>
      {customName && (
        <div>
          <input type="text" />
        </div>
      )} */}
          <div>
            <button
              onClick={() =>
                setItem((curr) => ({ ...curr, amount: curr.amount - 1 }))
              }
            >
              -
            </button>
            <span>{item.amount}</span>
            <button
              onClick={() =>
                setItem((curr) => ({ ...curr, amount: curr.amount + 1 }))
              }
            >
              +
            </button>
          </div>
          <IconButton
            onClick={() => {
              if (isInPantry(item.id)) {
                changeIngredientAmount(item.amount, item.id);
              } else {
                console.log(item);
                addIngredientBySpoonId(item);
              }
              setShowNew(false);
            }}
          >
            <Icon sx={{ fontSize: 25 }}>add_circle</Icon>
          </IconButton>
        </div>
      )}
    </>
  );
}

export default AddIngredient;
