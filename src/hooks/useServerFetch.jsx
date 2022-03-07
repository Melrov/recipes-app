import axios from "axios";
import React, { useEffect, useState } from "react";

function useServerFetch(type, url, query, body) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastBody, setLastBody] = useState(null)
  const [lastQuery, setLastQuery] = useState(null)

  function objectsEqual(o1, o2) {
    const entries1 = Object.entries(o1);
    const entries2 = Object.entries(o2);
    if (entries1.length !== entries2.length) {
      return false;
    }
    for (let i = 0; i < entries1.length; ++i) {
      // Keys
      if (entries1[i][0] !== entries2[i][0]) {
        return false;
      }
      // Values
      if (entries1[i][1] !== entries2[i][1]) {
        return false;
      }
    }
  
    return true;
  }


  useEffect(() => {
    async function init() {
      console.log("api call");
      setData(null);
      setError(null);
      setLoading(null);
      try {
        const res = await axios(url, {
          headers: {
            type: type,
          },
          params: query,
          data: body
        });
        console.log(res);
        if(res.success){
            setData(res.data);
        }
        else {
            throw res.error
        }
      } catch (error) {
        setError(error);
      }
    }
    if(!objectsEqual(body, lastBody) || !objectsEqual(query, lastQuery)){
        init();
        setLastBody(Object.assign(body, {}))
    }
  }, [type, url, query, body]);

  return { data, error, loading };
}

export default useServerFetch;
