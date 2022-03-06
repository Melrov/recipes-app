const query = require("../config/mysql.config");
const apiCall = require("../api/api");

async function getRecipeBySpoonId(res, spoonId) {
  const [recipe] = await query(
    "SELECT * FROM recipes WHERE recipes.spoon_id = ?"
  );
  if (recipe) {
    return res.send({ success: true, data: recipe, error: null });
  }
  const apiRes = await apiCall(
    `https://api.spoonacular.com/recipes/${spoonId}/information`,
    {}
  ); //this will get the recipe then if not null add it to the database and return it
  if (!apiRes.success) {
    return res.send({ success: false, data: null, error: "api call error" });
  }
  const newRecipe = {
    title: apiRes.data.title,
    spoon_id: apiRes.data.id,
    image: apiRes.data.image,
    summary: apiRes.data.summary,
    ready_in: apiRes.data.readyInMinutes,
    score: apiRes.data.spoonacularScore,
    servings: apiRes.data.servings,
    spoon_likes: apiRes.data.aggregateLike,
    likes: 0,
    source_name: apiRes.data.sourceName,
    instructions: apiRes.data.instructions,
    vegetarian: apiRes.data.vegetarian,
    vegan: apiRes.data.vegan,
    gluten_free: apiRes.data.glutenFree,
    dairy_free: apiRes.data.dairyFree,
    source_url: apiRes.data.sourceUrl,
    spoon_url: apiRes.data.spoonacularSourceUrl,
  };
  const { insertId: recipe_id } = await query("INSERT INTO recipes SET ?", [
    newRecipe,
  ]);
  apiRes.data.extendedIngredients.forEach((ingredient) => {
    const [check] = await query(
      "SELECT * FROM ingredients WHERE ingredients.spoon_id = ?",
      [ingredient.id]
    );
    let ingredient_id;
    if (!check) {
      const { insertId } = await query(
        `INSERT INTO ingredients
             (spoon_id, name, image, aisle)
             VALUES (?, ?, ?, ?)`,
        [
          ingredient.id,
          ingredient.nameClean,
          ingredient.image,
          ingredient.aisle,
        ]
      );
      ingredient_id = insertId;
    } else {
      ingredient_id = check.id;
    }
    await query(
      `INSERT INTO recipe_ingredients
         (ingredient_id, amount, original, consistency, recipe_id, unit)
         VALUES (? ,?, ?, ? ,?, ?)`,
      [
        ingredient_id,
        ingredient.amount,
        ingredient.original,
        ingredient.consistency,
        recipe_id,
        ingredient.unit,
      ]
    );
  });
}

module.exports = { getRecipeBySpoonId };
