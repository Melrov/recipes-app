import axios from "axios";
import { useCallback, useContext } from "react";
import { UserContext } from "../context/UserContext";

function useServerFetch(type, url, query, body) {

  const makeAPICall = useCallback(async (url, config) => {
    try {
      return await axios( url, config);
    } catch (error) {
      console.log(error)
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
  }, [makeAPICall]);

  const signup = useCallback(async (username, password) => {
    console.log(username, password)
    return await makeAPICall("/api/users/signup", {
      method: "put",
      data: {
        username,
        password,
      },
    });
  }, [makeAPICall]);

  const logout = useCallback(async (username, password) => {
    return await makeAPICall("/api/users/logout", {
      method: "get",
    });
  }, [makeAPICall]);

  const verify = useCallback(async (username, password) => {
    return await makeAPICall("/api/users/verify", {
      method: "get",
    });
  }, [makeAPICall]);

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
  }, [makeAPICall]);

  const removeFav = useCallback(async (recipe_id) => {
    return await makeAPICall("/api/favorites/removeFav", {
      method: "delete",
      data: {
        recipe_id,
      },
    });
  }, [makeAPICall]);

  const favsByUserId = useCallback(async () => {
    return await makeAPICall('/api/favorites/', {
      method: "get",
    });
  }, [makeAPICall]);

  const addIngredient = useCallback(async (ingredient_id, amount) => {
    return await makeAPICall("/api/pantry/addIngredient", {
      method: "put",
      data: {
        ingredient_id,
        amount,
      },
    });
  }, [makeAPICall]);

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
          aisle: ingredient.aisle,
        }
      },
    });
  }, [makeAPICall]);

  const editIngredient = useCallback(async (ingredient_id, amount) => {
    return await makeAPICall("/api/pantry/editIngredient", {
      method: "patch",
      data: {
        ingredient_id,
        amount,
      },
    });
  }, [makeAPICall]);

  const removeIngredient = useCallback(async (ingredient_id) => {
    return await makeAPICall("/api/pantry/removeIngredient", {
      method: "delete",
      data: {
        ingredient_id,
      },
    });
  }, [makeAPICall]);

  const pantryByUserId = useCallback(async () => {
    return await makeAPICall('/api/pantry/', {
      method: "get",
    });
  }, [makeAPICall]);

  const addIngredientShopping = useCallback(async (ingredient_id, amount) => {
    return await makeAPICall("/api/shoppingList/addIngredient", {
      method: "put",
      data: {
        ingredient_id,
        amount,
      },
    });
  }, [makeAPICall]);

  const addIngredientBySpoonIdShopping = useCallback(async (ingredient) => {
    return await makeAPICall("/api/shoppingList/addIngredientBySpoonId", {
      method: "put",
      data: {
        shopping_list: {
          amount: ingredient.amount
        },
        ingredient: {
          spoon_id: ingredient.spoon_id,
          name: ingredient.original || ingredient.name,
          image: ingredient.image,
          aisle: ingredient.aisle,
        }
      },
    });
  }, [makeAPICall]);



  const editIngredientShopping = useCallback(async (ingredient_id, amount) => {
    return await makeAPICall("/api/shoppingList/editIngredient", {
      method: "patch",
      data: {
        ingredient_id,
        amount,
      },
    });
  }, [makeAPICall]);

  const removeIngredientShopping = useCallback(async (ingredient_id) => {
    return await makeAPICall("/api/shoppingList/removeIngredient", {
      method: "delete",
      data: {
        ingredient_id,
      },
    });
  }, [makeAPICall]);

  const shoppingListByUserId = useCallback(async () => {
    return await makeAPICall('/api/shoppingList/', {
      method: "get",
    });
  }, [makeAPICall]);

  const recipeById = useCallback(async (spoon_id) => {
    return await makeAPICall(`/api/recipes/${spoon_id}`, {
      method: "get",
    });
  }, [makeAPICall]);

  const addIngredientByRecipeId = useCallback(async (recipe_id, ingredient_id) => {
    return await makeAPICall('/api/pantry/addByRecipe_id', {
      method: "put",
      data: {
        recipe_id,
        ingredient_id,
      }
    });
  }, [makeAPICall]);

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
    signup,
    verify,
    addFav,
    removeFav,
    favsByUserId,
    addIngredient,
    addIngredientBySpoonId,
    removeIngredient,
    editIngredient,
    pantryByUserId,
    addIngredientShopping,
    addIngredientBySpoonIdShopping,
    removeIngredientShopping,
    editIngredientShopping,
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
