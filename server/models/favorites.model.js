const query = require("../config/mysql.config");

async function addFavorite(res, userId, recipeId) {
  try {
    const [check] = await query("SELECT * FROM favorites WHERE favorites.user_id = ? AND favorites.recipe_id = ?", [userId, recipeId]);
    if (check) {
      return res.send({ success: false, data: null, error: "already in your favorites" });
    }
    await query("INSERT INTO favorites (user_id, recipe_id) VALUES (?, ?)", [userId, recipeId]);
    return res.send({ success: true, data: null, error: null });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      data: null,
      error: "Something went wrong please try again later.",
    });
  }
}

async function removeFavorite(res, userId, recipeId) {
  try {
    await query(`DELETE FROM favorites WHERE user_id = ? AND recipe_id = ?`, [userId, recipeId]);
    return res.send({ success: true, data: null, error: null });
  } catch (err) {
    return res.send({
      success: false,
      data: null,
      error: "Something went wrong, please try again later.",
    });
  }
}

async function getUserFavorites(res, user_id) {
  try {
    const favorites = await query(
      `SELECT recipe_id, title, spoon_id, image
       FROM favorites JOIN recipes 
       ON favorites.recipe_id = recipes.id
       WHERE favorites.user_id = ?`,
      [user_id]
    );
    return res.send({ success: true, data: favorites, error: null });
  } catch (error) {
    return res.send({
      success: false,
      data: null,
      error: "Something when wrong please try again later.",
    });
  }
}

module.exports = { addFavorite, removeFavorite, getUserFavorites };
