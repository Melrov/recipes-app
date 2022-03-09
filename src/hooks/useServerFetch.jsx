import axios from "axios";
import { useCallback } from "react";

function useServerFetch(type, url, query, body) {

  const makeAPICall = useCallback(async (url, config) => {
    try {
      return await axios( url, config);
    } catch (error) {
      return { success: false, data: null, error: "Something went wrong." };
    }
  }, []);

  const login = useCallback(async (username, password) => {
    return await makeAPICall("/api/users/login", {
      method: "post",
      data: {
        username,
        password,
      },
    });
  }, []);

  const logout = useCallback(async (username, password) => {
    return await makeAPICall("/api/users/logout", {
      method: "get",
    });
  }, []);

  const verify = useCallback(async (username, password) => {
    return await makeAPICall("/api/users/verify", {
      method: "get",
    });
  }, []);

  const signup = useCallback(async (username, password) => {
    return await makeAPICall("/api/users/signup", {
      method: "put",
      data: {
        username,
        password,
      },
    });
  }, []);

  const addFav = useCallback(async (recipe_id) => {
    return await makeAPICall("/api/favorites/addFav", {
      method: "put",
      data: {
        recipe_id,
      },
    });
  }, []);

  const removeFav = useCallback(async (recipe_id) => {
    return await makeAPICall("/api/favorites/removeFav", {
      method: "delete",
      data: {
        recipe_id,
      },
    });
  }, []);

  const favsByUserId = useCallback(async () => {
    return await makeAPICall('/api/favorites/', {
      method: "get",
    });
  }, []);

  const addIngredient = useCallback(async (ingredient_id, amount) => {
    return await makeAPICall("/api/pantry/addIngredient", {
      method: "put",
      data: {
        ingredient_id,
        amount
      },
    });
  }, []);

  const addIngredientBySpoonId = useCallback(async (ingredient) => {
    return await makeAPICall("/api/pantry/addIngredientBySpoonId", {
      method: "put",
      data: {
        pantry: {
          amount: ingredient.amount
        },
        ingredient: {
          spoon_id: ingredient.id,
          name: ingredient.original || ingredient.name,
          image: ingredient.image,
          aisle: ingredient.aisle
        }
      },
    });
  }, []);



  const editIngredient = useCallback(async (ingredient_id, amount) => {
    return await makeAPICall("/api/pantry/editIngredient", {
      method: "patch",
      data: {
        ingredient_id,
        amount
      },
    });
  }, []);

  const removeIngredient = useCallback(async (ingredient_id) => {
    return await makeAPICall("/api/pantry/removeIngredient", {
      method: "delete",
      data: {
        ingredient_id,
      },
    });
  }, []);

  const pantryByUserId = useCallback(async () => {
    return await makeAPICall('/api/pantry/', {
      method: "get",
    });
  }, []);

  const shoppingListByUserId = useCallback(async () => {
    return await makeAPICall('/api/pantry/shoppingList/', {
      method: "get",
    });
  }, []);

  const recipeById = useCallback(async (spoon_id) => {
    return await makeAPICall(`/api/recipes/${spoon_id}`, {
      method: "get",
    });
  }, []);

  const addIngredientByRecipeId = useCallback(async (recipe_id, ingredient_id, on_shopping_list = false) => {
    console.log(ingredient_id)
    return await makeAPICall('/api/pantry/addByRecipe_id', {
      method: "put",
      data: {
        recipe_id,
        ingredient_id,
        on_shopping_list
      }
    });
  }, []);

  /**
   * 
   * @param {*} query 
   * @returns {} {success, data, error}
   */
  const searchRecipe = useCallback(async (query) => {
    return await makeAPICall("/api/search/recipes", {
      method: "get",
      params: {
        query,
      },
    });
  }, []);

  const searchIngredients = useCallback(async (query) => {
    return await makeAPICall("/api/search/ingredients", {
      method: "get",
      params: {
        query,
      },
    });
  }, []);

  const searchIngredientInfo = useCallback(async (spoon_id) => {
    return await makeAPICall("/api/search/ingredientInfo", {
      method: "get",
      params: {
        spoon_id,
      },
    });
  }, []);

  return {
    login,
    logout,
    verify,
    addFav,
    removeFav,
    favsByUserId,
    addIngredient,
    addIngredientBySpoonId,
    removeIngredient,
    editIngredient,
    pantryByUserId,
    shoppingListByUserId,
    recipeById,
    searchRecipe,
    searchIngredients,
    searchIngredientInfo,
    addIngredientByRecipeId,
    signup
  };
}

export default useServerFetch;
