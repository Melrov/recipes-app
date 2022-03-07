const query = require("../config/mysql.config")

async function addFavorite(res, userId, recipeId){
    try {
        await query("INSERT INTO favorites (user_id, recipe_id) VALUES (?, ?)", [userId, recipeId])
        return res.send({success: true, data: null, error: null})
    } catch (error) {
      console.log(error)
        return res.send({success: false, data: null, error: "Something went wrong please try again later."})
    }
}

async function removeFavorite(res, userId, recipeId){
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

module.exports = { addFavorite, removeFavorite }