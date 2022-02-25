import axios from "axios";
import React, { useEffect, useState } from "react";

const apikey = "c63a301b210f4b7cae34c089b0a6a399";

let times = 3;

function useFetch(func, query) {
  const [lastQuery, setLastQuery] = useState("")
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function init() {
      console.log('api call')
      setLastQuery(query)
      setData(null);
      setError(null);
      setLoading(null);
      try {
        const res = await axios({
          baseURL: "https://api.spoonacular.com/" + func,
          params: {
            query: query,
            apiKey: apikey,
          },
        });
        setData(res.data)
        console.log(res);
      } catch (error) {
        setError(error);
      }
    }
    if (times > 0 && query.length >= 2 && query !== lastQuery) {
      init();
      times--;
    }
  }, [query]);

  return [data, error, loading];
}

export default useFetch;
