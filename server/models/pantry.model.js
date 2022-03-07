const query = require("../config/mysql.config");

async function addIngredient(res, ingredient) {
  try {
    const [selected] = await query(
      "SELECT * FROM pantry WHERE pantry.ingredient_id = ? AND pantry.user_id = ?",
      [ingredient.ingredient_id, ingredient.user_id]
    );
    if (selected) {
      return res.send({ success: true, data: null, error: null });
    }
    const { insertId } = await query("INSERT INTO pantry SET ?", [ingredient]);
    return res.send({ success: true, data: insertId, error: null });
  } catch (error) {
    return res.send({
      success: false,
      data: null,
      error: "Something went wrong please try again later",
    });
  }
}

async function removeIngredient(res, ingredient_id, user_id) {
  try {
    await query(
      "DELETE FROM pantry WHERE pantry.ingredient_id = ? AND pantry.user_id = ?",
      [ingredient_id, user_id]
    );
  } catch (error) {}
}

async function editIngredient(res, ingredient_id, user_id, amount){
    try {
        await query("UPDATE pantry (amount) VALUES (?) WHERE pantry.ingredient_id = ? AND pantry.user_id = ?", [amount, ingredient_id, user_id])
        return res.send({success: true, data: amount, error: null})
    } catch (error) {
        return res.send({success: false, data: null, error: "Something when wrong please try again later."})
    }
}

module.exports = { addIngredient, removeIngredient, editIngredient };
