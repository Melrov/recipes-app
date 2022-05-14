import React, { useState, useEffect, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { RecipesContext } from "../../context/RecipesContext";
import useFetch from "../../hooks/useFetch";
import useSearchInfo from "../../hooks/useSearchInfo";
import useServerFetch from "../../hooks/useServerFetch";
import Ingredients from "./Ingredients";


const InfoCon = styled.div`
  display: flex;
`;

function MoreInfo() {
  const [query, setQuery] = useState(null);
  const { id } = useParams();
  //const { data, error, loading } = useSearchInfo("recipes/" + id + "/information");
  const { recipeById } = useServerFetch();
  const { addRecipe, removeRecipe, isInRecipes } = useContext(RecipesContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function init() {
      const res = await recipeById(id);
      //console.log(res);
      if (res.data.success) {
        setData(res.data.data);
      }
    }
    if (id) {
      init();
    }
  }, []);

  function recipeClick() {
    //console.log("ran");
    if (!isInRecipes(data.recipe_id)) {
      addRecipe(data);
    } else {
      removeRecipe(data.recipe_id);
    }
  }

  const x = "<div>Hello</div>";
  return (
    <div>
      {data && (
        <>
          <h2>{data.title}</h2>
          <img src={data.image} />
          <button onClick={() => recipeClick()}>{isInRecipes(data.recipe_id) ? "Remove from Recipes" : "Add to Recipes"}</button>
          <InfoCon>
            <div>
              <span>{`$${parseInt(data.pricePerServing) / 100} per serving`}</span>
            </div>
            <div>
              <span>{`${data.spoon_likes} likes`}</span>
            </div>
            <div>
              <span>{`Ready in ${data.ready_in} minutes`}</span>
            </div>
            <div>
              <span>{`Spoonacular Score ${data.score}%`}</span>
            </div>
          </InfoCon>
          <Ingredients recipe_id={data.recipe_id} serving={data.servings} ingredients={data.extendedIngredients} />
          <div dangerouslySetInnerHTML={{ __html: data.summary }}></div>
          <div>
            <h3>instructions</h3>

            <div dangerouslySetInnerHTML={{ __html: data.instructions }}></div>
            <p>
              {" Read the detailed instructions on "} <a href={data.sourceUrl}>{data.creditsText}</a>
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default MoreInfo;

//https://mui.com/components/image-list/
//https://spoonacular.com/food-api/docs#Intolerances
//https://spoonacular.com/pasta-with-garlic-scallions-cauliflower-breadcrumbs-716429
