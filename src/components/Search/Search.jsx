import React, { useContext, useEffect, useState } from "react";
import Settings from "@mui/icons-material/Settings";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Checkbox from "@mui/material/Checkbox";
import styled from "styled-components";
import SearchResults from "./SearchResults";
import { SearchContext } from "../../context/SearchContext";
import useSearch from "../../hooks/useSearch";
import useServerFetch from "../../hooks/useServerFetch";

const dataa = {
  offset: 0,
  number: 2,
  results: [
    {
      id: 716429,
      title: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
      calories: 584,
      carbs: "84g",
      fat: "20g",
      image: "https://spoonacular.com/recipeImages/716429-312x231.jpg",
      imageType: "jpg",
      protein: "19g",
    },
    {
      id: 715538,
      title: "What to make for dinner tonight?? Bruschetta Style Pork & Pasta",
      calories: 521,
      carbs: "69g",
      fat: "10g",
      image: "https://spoonacular.com/recipeImages/715538-312x231.jpg",
      imageType: "jpg",
      protein: "35g",
    },
  ],
  totalResults: 86,
};

const SearchCon = styled.div`
  display: flex;
  align-items: center;
`;
const SettingsCon = styled.div`
  display: flex;
  align-items: center;
`;

function Search() {
  const {
    query,
    results,
    setResults,
    submitSearch,
    search,
    setSearch,
    instructionsRequired,
    setInstructionsRequired,
    useDiet,
    setUseDiet,
    useIntolerances,
    setUseIntolerances,
    useNutrition,
    setUseNutrition,
    showSettings,
    setShowSettings,
  } = useContext(SearchContext);

  return (
    <div>
      <SearchCon>
        <Paper
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            submitSearch();
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            width: 230,
            height: "3.5vh",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Recipes"
            inputProps={{ "aria-label": "search recipes" }}
          />
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <IconButton
          onClick={() => {
            setShowSettings(!showSettings);
          }}
        >
          <Settings fontSize="small" />
        </IconButton>
      </SearchCon>
      {showSettings && (
        <SettingsCon>
          <Checkbox
            checked={instructionsRequired}
            onClick={() => {
              setInstructionsRequired(!instructionsRequired);
            }}
          />
          <label htmlFor="">If the recipe instructions are required</label>
          <Checkbox
            checked={useDiet}
            onClick={() => {
              setUseDiet(!useDiet);
            }}
          />
          <label htmlFor="">Use the diet you set</label>
          <Checkbox
            checked={useIntolerances}
            onClick={() => {
              setUseIntolerances(!useIntolerances);
            }}
          />
          <label htmlFor="">Use the intolerance's you set</label>
          <Checkbox
            name="Nutrition"
            checked={useNutrition}
            onClick={() => {
              setUseNutrition(!useNutrition);
            }}
          />
          <label htmlFor="Nutrition">Use the nutrition you set</label>
        </SettingsCon>
      )}
      {results && <SearchResults data={results} />}
      {results && results.results.length === 0 && <p>No results found.</p>}
    </div>
  );
}

export default Search;
