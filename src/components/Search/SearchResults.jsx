import React from "react";
import styled from "styled-components";
import ResultCard from "./ResultCard";

const CardCon = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 16px;
`;

function SearchResults({ data }) {
  console.log("searchResults");
  console.log(data);
  return (
    <>
      {data && (
        <CardCon>
          {data.results.map((item) => {
            return <ResultCard key={item.recipe_id} item={item} />;
          })}
          {data.length === 0 && <span>No results</span>}
        </CardCon>
      )}
    </>
  );
}

export default SearchResults;
