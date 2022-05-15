const query = require("../config/mysql.config");
const apiCall = require("../api/api");

async function searchRecipeById(res, spoonId) {
  try {
    const apiRes = await apiCall(`https://api.spoonacular.com/recipes/${spoonId}/information`, {}); //this will get the recipe then if not null add it to the database and return it
    if (!apiRes.success) {
      return res.send({ success: false, data: null, error: "api call error" });
    }

    const newRecipe = {
      title: apiRes.data.title,
      spoon_id: apiRes.data.id,
      image: apiRes.data.image || `https://spoonacular.com/recipeImages/${apiRes.data.id}-556x370.jpg`,
      summary: apiRes.data.summary,
      ready_in: apiRes.data.readyInMinutes || 0,
      score: apiRes.data.spoonacularScore,
      servings: apiRes.data.servings || 1,
      spoon_likes: apiRes.data.aggregateLike || 0,
      likes: 0,
      source_name: apiRes.data.sourceName,
      instructions: apiRes.data.instructions || "",
      vegetarian: apiRes.data.vegetarian || false,
      vegan: apiRes.data.vegan || false,
      gluten_free: apiRes.data.glutenFree || false,
      dairy_free: apiRes.data.dairyFree || false,
      source_url: apiRes.data.sourceUrl,
      spoon_url: apiRes.data.spoonacularSourceUrl,
      price_per_serving: apiRes.data.pricePerServing,
    };

    const { insertId: recipe_id } = await query("INSERT INTO recipes SET ?", [newRecipe]);

    await insertIngredients(apiRes.data.extendedIngredients, recipe_id)
    
    const recipe_ingredients = await query(
      `SELECT image, ingredient_id, amount, original, consistency, recipe_id, unit, name
       FROM ingredients JOIN recipe_ingredient
       ON ingredients.id = recipe_ingredient.ingredient_id
       WHERE recipe_ingredient.recipe_id = ?`,
      [recipe_id]
    );
    //console.log(recipe_ingredients, recipe_id)
    const retRecipe = await Object.assign({...newRecipe, recipe_id }, {
      extendedIngredients: recipe_ingredients,
    });
    return res.send({ success: true, data: retRecipe, error: null });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      data: null,
      error: "Something went wrong please try again later.",
    });
  }
}

async function insertIngredients(ingredients, recipe_id){
  for(let i = 0; i < ingredients.length; i++){
      //console.log(ingredient)
      if(ingredients[i].id){
      const [check] = await query("SELECT * FROM ingredients WHERE ingredients.spoon_id = ?", [ingredients[i].id]);
      let ingredient_id;
      if (!check) {
        const { insertId } = await query(
          `INSERT INTO ingredients
           (spoon_id, name, image, aisle)
           VALUES (?, ?, ?, ?)`,
          [ingredients[i].id, ingredients[i].nameClean, ingredients[i].image, ingredients[i].aisle]
        );
        ingredient_id = insertId;
      } else {
        ingredient_id = check.id;
      }
      await query(
        `INSERT INTO recipe_ingredient
         (ingredient_id, amount, original, consistency, recipe_id, unit)
         VALUES (? ,?, ?, ? ,?, ?)`,
        [ingredient_id, ingredients[i].amount, ingredients[i].original, ingredients[i].consistency, recipe_id, ingredients[i].unit]
      );
      }
  }
}


async function ingredientSearch(res, query) {
  try {
    const apiRes = await apiCall(`https://api.spoonacular.com/food/ingredients/search`, { query });
    const fixedRes = await apiRes.data.results.map((val) => {
      return { ingredient_id: val.id, name: val.name, image: val.image };
    });
    return res.send({ success: true, data: fixedRes, error: null });
  } catch (error) {
    return res.send({
      success: false,
      data: null,
      error: "Something went wrong try again later.",
    });
  }
}

async function singleIngredientSearch(res, spoon_id, user_id) {
  try {
    const [ingredient] = await query(
      `SELECT id as ingredient_id, spoon_id, name, image, aisle
       FROM ingredients WHERE ingredients.spoon_id = ?`,
      [spoon_id]
    );
    if (ingredient) {
      return res.send({ success: true, data: ingredient, error: null });
    }
    //console.log(ingredient, spoon_id);
    const apiRes = await apiCall(`https://api.spoonacular.com/food/ingredients/${spoon_id}/information?amount=1`, {});
    const fixedRes = {
      spoon_id: apiRes.data.id,
      name: apiRes.data.name,
      image: apiRes.data.image,
      aisle: apiRes.data.aisle,
      amount: 1,
    };
    return res.send({ success: true, data: fixedRes, error: null });
  } catch (error) {
    return res.send({
      success: false,
      data: null,
      error: "Something went wrong try again later.",
    });
  }
}

async function searchRecipe(res, query) {
  try {
    //get settings
    const apiRes = await apiCall("https://api.spoonacular.com/recipes/complexSearch", { query });
    let fixedRes = {...apiRes.data}
    fixedRes.results = await fixedRes.results.map(val => {
      return {
        spoon_id: val.id,
        title: val.title,
        image: val.image
      }
    })
    return res.send({ success: true, data: fixedRes, error: null });
  } catch (error) {
    console.log(error);
    return res.send({
      success: true,
      data: null,
      error: "Something went wrong please try again later.",
    });
  }
}

module.exports = { searchRecipeById, ingredientSearch, singleIngredientSearch, searchRecipe };
