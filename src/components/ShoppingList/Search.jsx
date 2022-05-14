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
  const [queryData, setQueryData] = useState(null);
  const [singleQuery, setSingleQuery] = useState("");
  const [singleQueryData, setSingleQueryData] = useState(null);
  const [showResults, setShowResults] = useState(null);
  const [search, setSearch] = useState("");
  //const { data, error, loading } = useFetch("food/ingredients/search", query);
  const [showNew, setShowNew] = useState(false);
  // const {
  //   data: singleData,
  //   error: singleError,
  //   loading: singleLoading,
  // } = useSearchInfo(singleQuery);
  const [typing, setTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      //console.log(search);
      setQuery(search);
      if (!search) {
        setShowResults(null);
      } else {
        setShowResults(true);
      }
    }, 1200);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  useEffect(() => {
    async function init() {
      const res = await searchIngredients(query);
      //console.log(res);
      if (res.data.success) {
        setQueryData(res.data.data);
      }
    }
    if (query) {
      init();
    }
  }, [query]);

  useEffect(() => {
    async function init() {
      const res = await searchIngredientInfo(singleQuery);
      if (res.data.success) {
        setSingleQueryData(res.data.data);
      }
    }
    if (singleQuery) {
      init();
    }
  }, [singleQuery]);

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
          e.preventDefault();
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
      {singleQueryData && <AddIngredient data={singleQueryData} setShowNew={setShowNew} showNew={showNew}/>}
      {showResults && queryData && (
        <ResultsCon>
          {queryData.map((item) => {
            return (
              <Result
                key={item.ingredient_id}
                onClick={() => {
                  setShowResults(false);
                  setSingleQuery(item.ingredient_id);
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
