import React, { useState, useContext } from "react";
import styled from "styled-components";
import { PantryContext } from "../../context/PantryContext";

const baseUrl = "https://spoonacular.com/cdn/ingredients_100x100/";

const AddButton = styled.div`
    border-left: 2px solid rgba(0, 0, 0, 0.54);
    width: 10px;
    height: 10px;
    margin-left: 20px;
`
const AddButtonR = styled.div`
    border-top: 2px solid rgba(0, 0, 0, 0.54);
    width: 10px;
    height: 10px;
`

function AddIngredient({ data }) {
    const [customName, setCustomName] = useState(false)
    const {} = useContext(PantryContext)
  return (
    <div>
      <img src={baseUrl + data.image} />
      <span>{data.nameClean}</span>
      <input type="checkbox" name="check" onClick={() => setCustomName(!customName)}/>
      <label htmlFor='check' >Use Custom Name</label>
        { customName && <div>
            <input type="text" />
        </div> }

        <AddButton onClick={() => {}}>
            <AddButtonR>

            </AddButtonR>
        </AddButton>
    </div>
  );
}

export default AddIngredient;
