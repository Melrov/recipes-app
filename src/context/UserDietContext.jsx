import React, { createContext, useState } from "react";

export const UserDietContext = createContext(null);

function UserDietProvider({ children }) {
  const [diet, setDiet] = useState("");
  const [intolerances, setIntolerances] = useState([]);
  const [carbs, setCarbs] = useState([0, 100]);
  const [protein, setProtein] = useState([10, 100]);
  const [calories, setCalories] = useState([50, 800]);
  const [fat, setFat] = useState([1, 100]);
  const [alcohol, setAlcohol] = useState([0, 100]);
  const [caffeine, setCaffeine] = useState([0, 100]);
  const [copper, setCopper] = useState([0, 100]);
  const [calcium, setCalcium] = useState([0, 100]);
  const [choline, setCholine] = useState([0, 100]);
  const [fluoride, setFluoride] = useState([0, 100]);
  const [cholesterol, setCholesterol] = useState([0, 100]);
  const [saturatedFat, setSaturatedFat] = useState([0, 100]);
  const [vitaminA, setVitaminA] = useState([0, 100]);
  const [vitaminC, setVitaminC] = useState([0, 100]);
  const [vitaminD, setVitaminD] = useState([0, 100]);
  const [vitaminE, setVitaminE] = useState([0, 100]);
  const [vitaminK, setVitaminK] = useState([0, 100]);
  const [vitaminB1, setVitaminB1] = useState([0, 100]);
  const [vitaminB2, setVitaminB2] = useState([0, 100]);
  const [vitaminB3, setVitaminB3] = useState([0, 100]);
  const [vitaminB5, setVitaminB5] = useState([0, 100]);
  const [vitaminB6, setVitaminB6] = useState([0, 100]);
  const [vitaminB12, setVitaminB12] = useState([0, 100]);
  const [fiber, setFiber] = useState([0, 100]);
  const [folate, setFolate] = useState([0, 100]);
  const [folicAcid, setFolicAcid] = useState([0, 100]);
  const [iodine, setIodine] = useState([0, 100]);
  const [iron, setIron] = useState([0, 100]);
  const [magnesium, setMagnesium] = useState([0, 100]);
  const [manganese, setManganese] = useState([0, 100]);
  const [phosphorus, setPhosphorus] = useState([0, 100]);
  const [potassium, setPotassium] = useState([0, 100]);
  const [selenium, setSelenium] = useState([0, 100]);
  const [sodium, setSodium] = useState([0, 100]);
  const [sugar, setSugar] = useState([0, 100]);
  const [zinc, setZinc] = useState([0, 100]);

  return (
    <UserDietContext.Provider
      value={{
        diet,
        setDiet,
        intolerances,
        setIntolerances,
        carbs,
        setCarbs,
        protein,
        setProtein,
        calories,
        setCalories,
        fat,
        setFat,
        alcohol,
        setAlcohol,
        caffeine,
        setCaffeine,
        copper,
        setCopper,
        calcium,
        setCalcium,
        choline,
        setCholine,
        cholesterol,
        setCholesterol,
        fluoride,
        setFluoride,
        saturatedFat,
        setSaturatedFat,
        vitaminA,
        setVitaminA,
        vitaminC,
        setVitaminC,
        vitaminD,
        setVitaminD,
        vitaminE,
        setVitaminE,
        vitaminK,
        setVitaminK,
        vitaminB1,
        setVitaminB1,
        vitaminB2,
        setVitaminB2,
        vitaminB3,
        setVitaminB3,
        vitaminB5,
        setVitaminB5,
        vitaminB6,
        setVitaminB6,
        vitaminB12,
        setVitaminB12,
        fiber,
        setFiber,
        folate,
        setFolate,
        folicAcid,
        setFolicAcid,
        iodine,
        setIodine,
        iron,
        setIron,
        magnesium,
        setMagnesium,
        manganese,
        setManganese,
        phosphorus,
        setPhosphorus,
        potassium,
        setPotassium,
        selenium,
        setSelenium,
        sodium,
        setSodium,
        sugar,
        setSugar,
        zinc,
        setZinc,
      }}
    >
      {children}
    </UserDietContext.Provider>
  );
}

export default UserDietProvider;
