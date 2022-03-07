import axios from "axios";
import { useCallback } from "react";

function useServerFetch(type, url, query, body) {

  const makeAPICall = useCallback(async (url, config) => {
    try {
      return await axios(url, config);
    } catch (error) {
      return { success: false, data: null, error: "Something went wrong." };
    }
  }, []);

  const login = useCallback(async (username, password) => {
    return await makeAPICall("/api/users/login", {
      headers: {
        type: "post",
      },
      data: {
        username,
        password,
      },
    });
  }, []);

  const addFav = useCallback(async (user_id, recipe_id) => {
    return await makeAPICall("/api/favorites/addFav", {
      headers: {
        type: "put",
      },
      data: {
        user_id,
        recipe_id,
      },
    });
  }, []);

  const removeFav = useCallback(async (user_id, recipe_id) => {
    return await makeAPICall("/api/favorites/removeFav", {
      headers: {
        type: "delete",
      },
      data: {
        user_id,
        recipe_id,
      },
    });
  }, []);

  const favsByUserId = useCallback(async (user_id) => {
    return await makeAPICall(`/api/favorites/${user_id}`, {
      headers: {
        type: "get",
      },
    });
  }, []);

  const addIngredient = useCallback(async (user_id, ingredient_id, amount) => {
    return await makeAPICall("/api/pantry/addIngredient", {
      headers: {
        type: "put",
      },
      data: {
        user_id,
        ingredient_id,
        amount
      },
    });
  }, []);

  const editIngredient = useCallback(async (user_id, ingredient_id, amount) => {
    return await makeAPICall("/api/pantry/editIngredient", {
      headers: {
        type: "patch",
      },
      data: {
        user_id,
        ingredient_id,
        amount
      },
    });
  }, []);

  const removeIngredient = useCallback(async (user_id, ingredient_id) => {
    return await makeAPICall("/api/pantry/removeIngredient", {
      headers: {
        type: "delete",
      },
      data: {
        user_id,
        ingredient_id,
      },
    });
  }, []);

  const pantryByUserId = useCallback(async (user_id) => {
    return await makeAPICall(`/api/pantry/${user_id}`, {
      headers: {
        type: "get",
      },
    });
  }, []);

  const shoppingListByUserId = useCallback(async (user_id) => {
    return await makeAPICall(`/api/pantry/shoppingList/${user_id}`, {
      headers: {
        type: "get",
      },
    });
  }, []);

  const recipeById = useCallback(async (spoon_id) => {
    return await makeAPICall(`/recipes/${spoon_id}`, {
      headers: {
        type: "get",
      },
    });
  }, []);

  const addIngredientByRecipeId = useCallback(async (recipe_id, ingredient_id, user_id, on_shopping_list = false) => {
    return await makeAPICall('/addByRecipe_id', {
      headers: {
        type: "put",
      },
      params: {
        recipe_id,
        ingredient_id,
        user_id,
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
    return await makeAPICall("/search/recipe", {
      headers: {
        type: "get",
      },
      params: {
        query,
      },
    });
  }, []);

  const searchIngredients = useCallback(async (query) => {
    return await makeAPICall("/search/ingredients", {
      headers: {
        type: "get",
      },
      params: {
        query,
      },
    });
  }, []);

  const searchIngredientInfo = useCallback(async (spoon_id, user_id) => {
    return await makeAPICall("/search/ingredientInfo", {
      headers: {
        type: "get",
      },
      params: {
        spoon_id,
        user_id,
      },
    });
  }, []);

  return {
    login,
    addFav,
    removeFav,
    favsByUserId,
    addIngredient,
    removeIngredient,
    editIngredient,
    pantryByUserId,
    shoppingListByUserId,
    recipeById,
    searchRecipe,
    searchIngredients,
    searchIngredientInfo,
    addIngredientByRecipeId
  };
}

export default useServerFetch;
