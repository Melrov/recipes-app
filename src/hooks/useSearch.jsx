import axios from "axios";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { UserDietContext } from "../context/UserDietContext";

const apikey = "c63a301b210f4b7cae34c089b0a6a399";

let times = 3;

function useSearch(query) {
  const {
    useSettings,
    diet,
    setDiet,
    intolerances,
    carbs,
    protein,
    calories,
    fat,
    alcohol,
    caffeine,
    copper,
    calcium,
    choline,
    cholesterol,
    fluoride,
    saturatedFat,
    vitaminA,
    vitaminC,
    vitaminD,
    vitaminE,
    vitaminK,
    vitaminB1,
    vitaminB2,
    vitaminB3,
    vitaminB5,
    vitaminB6,
    vitaminB12,
    fiber,
    folate,
    folicAcid,
    iodine,
    iron,
    magnesium,
    manganese,
    phosphorus,
    potassium,
    selenium,
    sodium,
    sugar,
    zinc,
  } = useContext(UserDietContext);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const userParams = useMemo(() => {
    if (useSettings) {
      return {
        minCarbs: carbs[0],
        maxCarbs: carbs[1],
        minProtein: protein[0],
        maxProtein: protein[1],
        minCalories: calories[0],
        maxCalories: calories[1],
        minFat: fat[0],
        maxFat: fat[1],
        minAlcohol: alcohol[0],
        maxAlcohol: alcohol[1],
        minCaffeine: caffeine[0],
        maxCaffeine: caffeine[1],
        minCopper: copper[0],
        maxCopper: copper[1],
        minCalcium: calcium[0],
        maxCalcium: calcium[1],
        minCholine: choline[0],
        maxCholine: choline[1],
        minCholesterol: cholesterol[0],
        maxCholesterol: cholesterol[1],
        minFluoride: fluoride[0],
        maxFluoride: fluoride[1],
        minSaturatedFat: saturatedFat[0],
        maxSaturatedFat: saturatedFat[1],
        minVitaminA: vitaminA[0],
        maxVitaminA: vitaminA[1],
        minVitaminC: vitaminC[0],
        maxVitaminC: vitaminC[1],
        minVitaminD: vitaminD[0],
        maxVitaminD: vitaminD[1],
        minVitaminE: vitaminE[0],
        maxVitaminE: vitaminE[1],
        minVitaminK: vitaminK[0],
        maxVitaminK: vitaminK[1],
        minVitaminB1: vitaminB1[0],
        maxVitaminB1: vitaminB1[1],
        minVitaminB2: vitaminB2[0],
        maxVitaminB2: vitaminB2[1],
        minVitaminB3: vitaminB3[0],
        maxVitaminB3: vitaminB3[1],
        minVitaminB5: vitaminB5[0],
        maxVitaminB5: vitaminB5[1],
        minVitaminB6: vitaminB6[0],
        maxVitaminB6: vitaminB6[1],
        minVitaminB12: vitaminB12[0],
        maxVitaminB12: vitaminB12[1],
        minFiber: fiber[0],
        maxFiber: fiber[1],
        minFolate: folate[0],
        maxFolate: folate[1],
        minFolicAcid: folicAcid[0],
        maxFolicAcid: folicAcid[1],
        minIodine: iodine[0],
        maxIodine: iodine[1],
        minIron: iron[0],
        maxIron: iron[1],
        minMagnesium: magnesium[0],
        maxMagnesium: magnesium[1],
        minManganese: manganese[0],
        maxManganese: manganese[1],
        minPhosphorus: phosphorus[0],
        maxPhosphorus: phosphorus[1],
        minPotassium: potassium[0],
        maxPotassium: potassium[1],
        minSelenium: selenium[0],
        maxSelenium: selenium[1],
        minSodium: sodium[0],
        maxSodium: sodium[1],
        minSugar: sugar[0],
        maxSugar: sugar[1],
        minZinc: zinc[0],
        maxZinc: zinc[1],
      };
    }
    return {};
  }, [useSettings]);

  const params = useMemo(() => {
    return Object.assign(
      {
        query: query,
        apikey: apikey,
      },
      userParams
    );
  }, [query, useParams]);

  useEffect(() => {
    async function init() {
      const res = await axios({
        baseURL: "https://api.spoonacular.com/recipes/complexSearch",
        params: params,
      });
      console.log(res);
    }
    if (times > 0 && query !== "") {
      init();
      times--;
    }
  }, [query]);

  return [data, error, loading];
}

export default useSearch;
