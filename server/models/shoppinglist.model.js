const query = require("../config/mysql.config");

async function addIngredient(res, ingredient) {
  try {
    const [selected] = await query("SELECT * FROM shopping_list WHERE shopping_list.ingredient_id = ? AND shopping_list.user_id = ?", [
      ingredient.ingredient_id,
      ingredient.user_id,
    ]);
    if (selected) {
      return res.send({ success: true, data: null, error: null });
    }
    const { insertId } = await query("INSERT INTO shopping_list SET ?", [ingredient]);
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

async function addIngredientBySpoonId(res, shopping_list, ingredient) {
  try {
    let ingredient_id;
    const [check] = await query("SELECT * from ingredients WHERE ingredients.spoon_id = ?", [ingredient.spoon_id]);
    if (check) {
      ingredient_id = check.id;
      const [shopping_list_check] = await query("SELECT * FROM shopping_list WHERE shopping_list.ingredient_id = ? AND shopping_list.user_id = ?", [
        ingredient_id,
        shopping_list.user_id,
      ]);
      if (shopping_list_check) {
        return res.send({ success: false, data: null, error: "Already in your shopping_list" });
      } else {
        await query("INSERT INTO shopping_list SET ?", [{ ...shopping_list, ingredient_id }]);
      }
    } else {
      const { insertId } = await query("INSERT INTO ingredients SET ?", [ingredient]);
      ingredient_id = insertId;
      await query("INSERT INTO shopping_list SET ?", [{ ...shopping_list, ingredient_id }]);
    }

    const [inserted] = await query(
      `SELECT ingredient_id, amount, spoon_id, name, image, aisle
       FROM shopping_list
       JOIN ingredients ON ingredients.id = shopping_list.ingredient_id 
       WHERE shopping_list.ingredient_id = ?`,
      [ingredient_id]
    );
    return res.send({ success: true, data: inserted, error: null });
  } catch (error) {
    //console.log("--------------------------------------------------");
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
    await query("DELETE FROM shopping_list WHERE shopping_list.ingredient_id = ? AND shopping_list.user_id = ?", [ingredient_id, user_id]);
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
    await query("UPDATE shopping_list SET shopping_list.amount = ? WHERE shopping_list.ingredient_id = ? AND shopping_list.user_id = ?", [
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

async function getUserShoppingList(res, user_id) {
  try {
    const shopping_list = await query(
      `SELECT ingredient_id, amount, spoon_id, name, image, aisle
       FROM shopping_list JOIN ingredients
       ON ingredients.id = shopping_list.ingredient_id
       WHERE shopping_list.user_id = ?`,
      [user_id]
    );
    return res.send({ success: true, data: shopping_list, error: null });
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
    await query("INSERT INTO shopping_list (ingredient_id, user_id, amount) VALUES (?, ?, ?)", [
      ingredient_id,
      user_id,
      1,
    ]);
    const [ingredient] = await query(
      `SELECT ingredient_id, amount, spoon_id, name, image, aisle
       FROM ingredients 
       JOIN shopping_list ON shopping_list.ingredient_id = ingredients.id
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
  getUserShoppingList,
  addByRecipeId,
};
