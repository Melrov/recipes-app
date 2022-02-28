import React, { createContext, useCallback, useState } from 'react'

export const RecipesContext = createContext(null)

function RecipesProvider({ children }) {
    const [recipes, setRecipes] = useState([])
    const [substitutes, setSubstitutes] = useState([])

    const addRecipe = useCallback((recipe) => {
        console.log(recipe)
        setRecipes(curr => [...curr, recipe])
    }, [recipes])

    const removeRecipe = useCallback((id) => {
        setRecipes((curr) => curr.filter((val) => id !== val.id));
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