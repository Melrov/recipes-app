const query = require("../config/mysql.config");
const { searchRecipeById } = require("./search.model")
const apiCall = require("../api/api");

async function getRecipeBySpoonId(res, spoonId) {
  try {
    const [recipe] = await query(
      "SELECT * FROM recipes WHERE recipes.spoon_id = ?"
    );
    if (recipe) {
      const recipe_ingredients = await query(
        "SELECT * FROM recipe_ingredients WHERE recipe_ingredients.recipe_id = ?",
        [recipe.id]
      );
      const retRecipe = Object.assign(recipe, {
        extendedIngredients: recipe_ingredients,
      });
      return res.send({ success: true, data: retRecipe, error: null });
    }
    searchRecipeById(res, spoonId)
  } catch (error) {
    return res.send({
      success: false,
      data: null,
      error: "Something went wrong please try again later",
    });
  }
}

module.exports = { getRecipeBySpoonId };
