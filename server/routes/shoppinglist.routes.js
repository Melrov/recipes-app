const express = require("express");
const {
  addIngredient,
  removeIngredient,
  editIngredient,
  getUserShoppingList,
  addByRecipeId,
  addIngredientBySpoonId,
} = require("../models/shoppinglist.model");
const authenticate = require("../middleware/authenticate.middleware");
const router = express.Router();

router.use(authenticate);

router.put("/addIngredient", (req, res) => {
  if (!req.body.ingredient_id || !req.body.amount) {
    return res.send({
      success: false,
      data: null,
      error: "Invalid data provided",
    });
  }
  addIngredient(res, {
    ingredient_id: req.body.ingredient_id,
    amount: req.body.amount,
    user_id: req.user.id,
  });
});

router.put("/addIngredientBySpoonId", (req, res) => {
  console.log(req.body);
  if (
    !req.body.shopping_list ||
    !req.body.shopping_list.amount ||
    !req.body.ingredient ||
    !req.body.ingredient.spoon_id ||
    !req.body.ingredient.name ||
    !req.body.ingredient.aisle ||
    !req.body.ingredient.image
  ) {
    return res.send({
      success: false,
      data: null,
      error: "Invalid data provided",
    });
  }
  addIngredientBySpoonId(res, { ...req.body.shopping_list, user_id: req.user.id }, { ...req.body.ingredient });
});

router.delete("/removeIngredient", (req, res) => {
  if (!req.body.ingredient_id) {
    return res.send({
      success: false,
      data: null,
      error: "Invalid data provided",
    });
  }
  removeIngredient(res, req.body.ingredient_id, req.user.id);
});

router.patch("/editIngredient", (req, res) => {
  if (!req.body.ingredient_id || isNaN(req.body.amount)) {
    return res.send({
      success: false,
      data: null,
      error: "Invalid data provided",
    });
  }
  editIngredient(res, req.body.ingredient_id, req.user.id, req.body.amount);
});

router.get("/", (req, res) => {
  getUserShoppingList(res, req.user.id);
});

router.put("/addByRecipe_id", (req, res) => {
  console.log(req.body);
  if (!req.body.recipe_id || !req.body.ingredient_id) {
    return res.send({
      success: false,
      data: null,
      error: "Invalid data provided",
    });
  }
  addByRecipeId(res, req.body.recipe_id, req.body.ingredient_id, req.user.id);
});

module.exports = router;
