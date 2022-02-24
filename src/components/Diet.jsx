import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from '@mui/material/Select';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import { UserDietContext } from "../context/UserDietContext";
import DietMinMax from "./DietMinMax";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Dairy',
  'Egg',
  'Gluten',
  'Grain',
  'Peanut',
  'Seafood',
  'Sesame',
  'Shellfish',
  'Soy',
  'Sulfite',
  'Tree Nut',
  'Wheat',
];

const minDistance = 10;

function Diet() {
    const { diet,
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
        setZinc, } = React.useContext(UserDietContext)
    //console.log(carbs)

    const handleChange = React.useCallback((event) => {
        const {
          target: { value },
        } = event;
        setIntolerances(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      }, []);

      const handleChange2 = React.useCallback((newValue, activeThumb, setter) => {
        if (!Array.isArray(newValue)) {
          return;
        }
    
        if (newValue[1] - newValue[0] < minDistance) {
          if (activeThumb === 0) {
            const clamped = Math.min(newValue[0], 100 - minDistance);
            setter([clamped, clamped + minDistance]);
          } else {
            const clamped = Math.max(newValue[1], minDistance);
            setter([clamped - minDistance, clamped]);
          }
        } else {
          setter(newValue);
        }
      }, []);

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 100 }}>
        <InputLabel id="demo-simple-select-helper-label">Diet</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={diet}
          label="Age"
          onChange={(e) => setDiet(e.target.value)}
        >
          <MenuItem value={"None"}>None</MenuItem>
          <MenuItem value={"Gluten Free"}>Gluten Free</MenuItem>
          <MenuItem value={"Ketogenic"}>Ketogenic</MenuItem>
          <MenuItem value={"Vegetarian"}>Vegetarian</MenuItem>
          <MenuItem value={"Lacto-Vegetarian"}>Lacto-Vegetarian</MenuItem>
          <MenuItem value={"Ovo-Vegetarian"}>Ovo-Vegetarian</MenuItem>
          <MenuItem value={"Vegan"}>Vegan</MenuItem>
          <MenuItem value={"Pescetarian"}>Pescetarian</MenuItem>
          <MenuItem value={"Paleo"}>Paleo</MenuItem>
          <MenuItem value={"Primal"}>Primal</MenuItem>
          <MenuItem value={"Low FODMAP"}>Low FODMAP</MenuItem>
          <MenuItem value={"Whole30"}>Whole30</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={intolerances}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={intolerances.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* <Box sx={{ m: 1, width: 300 }}>
      <Slider
        getAriaLabel={() => 'Minimum distance shift'}
        value={carbs}
        onChange={(event, newValue, activeThumb) => handleChange2(newValue, activeThumb, setCarbs)}
        valueLabelDisplay="auto"
        disableSwap
      />
    </Box>
    <Box sx={{ m: 1, width: 300 }}>
      <Slider
        getAriaLabel={() => 'Minimum distance shift'}
        value={carbs}
        onChange={(event, newValue, activeThumb) => handleChange2(newValue, activeThumb, setCarbs)}
        valueLabelDisplay="auto"
        disableSwap
      />
    </Box> */}
            <DietMinMax name="Carbs" measurement="grams" value={carbs} setter={setCarbs} />
            <DietMinMax name="Protein" measurement="grams" value={protein} setter={setProtein} />
            <DietMinMax name="Calories" measurement="grams" value={calories} setter={setCalories} />
            <DietMinMax name="Fat" measurement="grams" value={fat} setter={setFat} />
            <DietMinMax name="Alcohol" measurement="grams" value={alcohol} setter={setAlcohol} />
            <DietMinMax name="Caffeine" measurement="milligrams" value={caffeine} setter={setCaffeine} />
            <DietMinMax name="Copper" measurement="milligrams" value={copper} setter={setCopper} />
            <DietMinMax name="Calcium" measurement="milligrams" value={calcium} setter={setCalcium} />
            <DietMinMax name="Choline" measurement="milligrams" value={choline} setter={setCholine} />
            <DietMinMax name="Cholesterol" measurement="milligrams" value={cholesterol} setter={setCholesterol} />
            <DietMinMax name="Fluoride" measurement="milligrams" value={fluoride} setter={setFluoride} />
            <DietMinMax name="SaturatedFat" measurement="grams" value={saturatedFat} setter={setSaturatedFat} />
            <DietMinMax name="VitaminA" measurement="IU" value={vitaminA} setter={setVitaminA} />
            <DietMinMax name="VitaminC" measurement="milligrams" value={vitaminC} setter={setVitaminC} />
            <DietMinMax name="VitaminD" measurement="micrograms" value={vitaminD} setter={setVitaminD} />
            <DietMinMax name="VitaminE" measurement="milligrams" value={vitaminE} setter={setVitaminE} />
            <DietMinMax name="VitaminK" measurement="micrograms" value={vitaminK} setter={setVitaminK} />
            <DietMinMax name="VitaminB1" measurement="milligrams" value={vitaminB1} setter={setVitaminB1} />
            <DietMinMax name="VitaminB2" measurement="milligrams" value={vitaminB2} setter={setVitaminB2} />
            <DietMinMax name="VitaminB3" measurement="milligrams" value={vitaminB3} setter={setVitaminB3} />
            <DietMinMax name="VitaminB5" measurement="milligrams" value={vitaminB5} setter={setVitaminB5} />
            <DietMinMax name="VitaminB6" measurement="milligrams" value={vitaminB6} setter={setVitaminB6} />
            <DietMinMax name="VitaminB12" measurement="micrograms" value={vitaminB12} setter={setVitaminB12} />
            <DietMinMax name="Fiber" measurement="grams" value={fiber} setter={setFiber} />
            <DietMinMax name="Folate" measurement="micrograms" value={folate} setter={setFolate} />
            <DietMinMax name="FolicAcid" measurement="micrograms" value={folicAcid} setter={setFolicAcid} />
            <DietMinMax name="Iodine" measurement="micrograms" value={iodine} setter={setIodine} />
            <DietMinMax name="Iron" measurement="milligrams" value={iron} setter={setIron} />
            <DietMinMax name="Magnesium" measurement="milligrams" value={magnesium} setter={setMagnesium} />
            <DietMinMax name="Manganese" measurement="milligrams" value={manganese} setter={setManganese} />
            <DietMinMax name="Phosphorus" measurement="milligrams" value={phosphorus} setter={setPhosphorus} />
            <DietMinMax name="Potassium" measurement="milligrams" value={potassium} setter={setPotassium} />
            <DietMinMax name="Selenium" measurement="micrograms" value={selenium} setter={setSelenium} />
            <DietMinMax name="Sodium" measurement="milligrams" value={sodium} setter={setSodium} />
            <DietMinMax name="Sugar" measurement="grams" value={sugar} setter={setSugar} />
            <DietMinMax name="Zinc" measurement="milligrams" value={zinc} setter={setZinc} />
            

    </div>
  );
}

export default Diet;
