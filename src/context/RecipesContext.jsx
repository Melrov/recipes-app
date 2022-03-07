import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import useServerFetch from '../hooks/useServerFetch'
import { UserContext } from './UserContext'

export const RecipesContext = createContext(null)

function RecipesProvider({ children }) {
    const { userId } = useContext(UserContext)
    const [recipes, setRecipes] = useState([])
    const [substitutes, setSubstitutes] = useState([])
    const [queryType, setQueryType] = useState(null)
    const [queryUrl, setQueryUrl] = useState(null)
    const [queryBody, setQueryBody] = useState(null)
    const {data, error, loading} = useServerFetch(queryType, queryUrl, {}, queryBody)
    const [lastItem, setLastItem] = useState(null)

    const addRecipe = useCallback((recipe) => {
        setQueryType("put")
        setQueryUrl("/favorites/addFav")
        setQueryType({user_id: userId, recipe_id: recipe.id})
        setLastItem({key: "add", recipe})
        // console.log(recipe)
        // setRecipes(curr => [...curr, recipe])
    }, [recipes])

    useEffect(() => {
        if(data.success && lastItem){
            switch (lastItem.key) {
                case "add":
                    setRecipes(curr => [...curr, lastItem.recipe])
                    setLastItem(null)
                    break;
                case "remove":
                    setRecipes((curr) => curr.filter((val) => lastItem.id !== val.id));
                    break;
                default:
                    break;
            }
        }
    }, [data, lastItem])

    const removeRecipe = useCallback((id) => {
        
        //setRecipes((curr) => curr.filter((val) => id !== val.id));
    }, [recipes])

    const isInRecipes = useCallback((id) => {
        if(recipes.filter(val => id === val.id).length > 0){
            return true
        }
        return false
    }, [recipes])

    const addSubstitutes = useCallback((recipe) => {
        setSubstitutes(curr => [...curr, recipe])
    }, [substitutes])

    const removeSubstitutes = useCallback((id) => {
        setSubstitutes((curr) => curr.filter((val) => id !== val.id));
    }, [substitutes])

    const isInSubstitutes = useCallback((ingredient) => {
        if(substitutes.filter(val => ingredient === val.ingredient).length > 0){
            return true
        }
        return false
    }, [substitutes])

    const getSubstitute = useCallback((name) => {
        for(let i = 0; i < substitutes.length; i++){
            if(substitutes[i].ingredient === name){
                return substitutes[i].value
            }
        }
        return false
    }, [substitutes])

  return <RecipesContext.Provider value={{recipes, addRecipe, removeRecipe, isInRecipes, substitutes, addSubstitutes, removeSubstitutes, isInSubstitutes, getSubstitute}} >{children}</RecipesContext.Provider>
}

export default RecipesProvider