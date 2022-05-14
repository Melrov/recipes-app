const query = require("../config/mysql.config");

async function addIngredient(res, ingredient) {
  try {
    const [selected] = await query("SELECT * FROM pantry WHERE pantry.ingredient_id = ? AND pantry.user_id = ?", [
      ingredient.ingredient_id,
      ingredient.user_id,
    ]);
    if (selected) {
      return res.send({ success: true, data: null, error: null });
    }
    const { insertId } = await query("INSERT INTO pantry SET ?", [ingredient]);
    return res.send({ success: true, data: insertId, error: null });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      data: null,
      error: "Something went wrong please try again later",
    });
  }
}

async function addIngredientBySpoonId(res, pantry, ingredient) {
  try {
    let ingredient_id;
    const [check] = await query("SELECT * from ingredients WHERE ingredients.spoon_id = ?", [ingredient.spoon_id]);
    if (check) {
      ingredient_id = check.id;
      const [pantry_check] = await query("SELECT * FROM pantry WHERE pantry.ingredient_id = ? AND pantry.user_id = ?", [
        ingredient_id,
        pantry.user_id,
      ]);
      if (pantry_check) {
        return res.send({ success: false, data: null, error: "Already in your pantry" });
      } else {
        await query("INSERT INTO pantry SET ?", [{ ...pantry, ingredient_id }]);
      }
    } else {
      const { insertId } = await query("INSERT INTO ingredients SET ?", [ingredient]);
      ingredient_id = insertId;
      await query("INSERT INTO pantry SET ?", [{ ...pantry, ingredient_id }]);
    }

    const [inserted] = await query(
      `SELECT ingredient_id, amount, spoon_id, name, image, aisle
       FROM pantry
       JOIN ingredients ON ingredients.id = pantry.ingredient_id 
       WHERE pantry.ingredient_id = ?`,
      [ingredient_id]
    );
    return res.send({ success: true, data: inserted, error: null });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      data: null,
      error: "Something went wrong please try again later",
    });
  }
}

async function removeIngredient(res, ingredient_id, user_id) {
  try {
    await query("DELETE FROM pantry WHERE pantry.ingredient_id = ? AND pantry.user_id = ?", [ingredient_id, user_id]);
    return res.send({ success: true, data: null, error: null });
  } catch (error) {
    return res.send({
      success: false,
      data: null,
      error: "Something went wrong please try again later",
    });
  }
}

async function editIngredient(res, ingredient_id, user_id, amount) {
  try {
    await query("UPDATE pantry SET pantry.amount = ? WHERE pantry.ingredient_id = ? AND pantry.user_id = ?", [
      amount,
      ingredient_id,
      user_id,
    ]);
    return res.send({ success: true, data: amount, error: null });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      data: null,
      error: "Something when wrong please try again later.",
    });
  }
}

async function getUserPantry(res, user_id) {
  try {
    const pantry = await query(
      `SELECT ingredient_id, amount, spoon_id, name, image, aisle
       FROM pantry JOIN ingredients
       ON ingredients.id = pantry.ingredient_id
       WHERE pantry.user_id = ?`,
      [user_id]
    );
    return res.send({ success: true, data: pantry, error: null });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      data: null,
      error: "Something when wrong please try again later.",
    });
  }
}

async function addByRecipeId(res, recipe_id, ingredient_id, user_id) {
  try {
    await query("INSERT INTO pantry (ingredient_id, user_id, amount) VALUES (?, ?, ?)", [
      ingredient_id,
      user_id,
      1,
    ]);
    const [ingredient] = await query(
      `SELECT ingredient_id, amount, spoon_id, name, image, aisle
       FROM ingredients 
       JOIN pantry ON pantry.ingredient_id = ingredients.id
       WHERE ingredients.id = ?`,
      [ingredient_id]
    );
    return res.send({ success: true, data: ingredient, error: null });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      data: null,
      error: "Something when wrong please try again later.",
    });
  }
}

module.exports = {
  addIngredient,
  addIngredientBySpoonId,
  removeIngredient,
  editIngredient,
  getUserPantry,
  addByRecipeId,
};
