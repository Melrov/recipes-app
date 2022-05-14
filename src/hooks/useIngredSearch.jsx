import axios from "axios";
import React, { useEffect, useState } from "react";

const apikey = "c63a301b210f4b7cae34c089b0a6a399";

let times = 3;

function useIngredSearch(func, query) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function init() {
      //console.log('api call')
      setData(null);
      setError(null);
      setLoading(null);
      try {
        const res = await axios({
          baseURL: "https://api.spoonacular.com/" + func,
          params: {
            ingredientName: query,
            apiKey: apikey,
          },
        });
        setData(res.data)
        //console.log(res);
      } catch (error) {
        setError(error);
      }
    }
    if ( query.length >= 2) {
      init();
      //times--;
    }
    if(times === 0){
      //console.log('out of calls')
    }
  }, [query]);

  return { data, error, loading };
}

export default useIngredSearch;
