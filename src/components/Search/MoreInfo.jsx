import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { RecipesContext } from "../../context/RecipesContext";
import useSearchInfo from "../../hooks/useSearchInfo";
import useServerFetch from "../../hooks/useServerFetch";
import Ingredients from "./Ingredients";

const MainCon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 30px;
`;

const InfoCon = styled.div`
  display: flex;
  margin-top: 10px;
`;

const Img = styled.img`
  width: auto;
`;
const ImgCon = styled.div`
  max-width: 556px;
`;

const Text = styled.span`
  margin-right: 20px;
`;

const TextCon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function MoreInfo() {
  const [query, setQuery] = useState(null);
  const { id } = useParams();
  //const { data, error, loading } = useSearchInfo("recipes/" + id + "/information");
  const { recipeById } = useServerFetch();
  const { addRecipe, removeRecipe, isInRecipes } = useContext(RecipesContext);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function init() {
      const res = await recipeById(id);
      //console.log(res);
      if (res.data.success) {
        setData(res.data.data);
      } else {
        setError(res.data.error);
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

  return (
    <MainCon>
      {error && <span>{error}</span>}
      {data && (
        <>
          <h2>{data.title}</h2>
          <ImgCon>
            <Img src={data.image} />
          </ImgCon>
          <button onClick={() => recipeClick()}>{isInRecipes(data.recipe_id) ? "Remove from Recipes" : "Add to Recipes"}</button>
          <InfoCon>
            <div>
              <Text>{`$${parseInt(data["price_per_serving"]) / 100} per serving      `}</Text>
            </div>
            <div>
              <Text>{`${data.spoon_likes} likes       `}</Text>
            </div>
            <div>
              <Text>{`Ready in ${data.ready_in} minutes       `}</Text>
            </div>
            <div>
              <Text>{`Spoonacular Score ${data.score}%`}</Text>
            </div>
          </InfoCon>
          <Ingredients recipe_id={data.recipe_id} serving={data.servings} ingredients={data.extendedIngredients} />
          <TextCon>
            {data.summary && <div dangerouslySetInnerHTML={{ __html: data.summary }}></div>}
            {data.instructions && (
              <div>
                <h3>instructions</h3>

                <div dangerouslySetInnerHTML={{ __html: data.instructions }}></div>
              </div>
            )}
            {data.sourceUrl && data.creditsText && (
              <p>
                {" Read the detailed instructions on "} <a href={data.sourceUrl}>{data.creditsText}</a>
              </p>
            )}
          </TextCon>
        </>
      )}
    </MainCon>
  );
}

export default MoreInfo;

//https://mui.com/components/image-list/
//https://spoonacular.com/food-api/docs#Intolerances
//https://spoonacular.com/pasta-with-garlic-scallions-cauliflower-breadcrumbs-716429
