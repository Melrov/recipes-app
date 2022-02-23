import axios from 'axios'
import React, { useEffect, useState } from 'react'

const apikey = 'c63a301b210f4b7cae34c089b0a6a399'

function useFetch({ query }) {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)


    useEffect( () => {
        async function init (){
            const res = await axios({
                baseURL: "https://api.spoonacular.com/recipes/complexSearch",
                headers: {
                    "X-RapidAPI-Key": apikey
                },
                params: {
                    id: 716429,
                    includeNutrition: false
                }
            })
        }

    }, [query])
    

  return [data, error, loading]
}

export default useFetch