const express = require("express");
const authenticate = require("../middleware/authenticate.middleware");
const {
  addFavorite,
  removeFavorite,
  getUserFavorites,
} = require("../models/favorites.model");
const router = express.Router();

router.use(authenticate);

router.put("/addFav", (req, res) => {
  console.log(req.body)
  if (!req.body.recipe_id) {
    return res.send({
      success: false,
      data: null,
      error: "Please give a user_id and recipe_id",
    });
  }
  addFavorite(res, req.user.id, req.body.recipe_id);
});

router.delete("/removeFav", (req, res) => {
  if (req.query.recipe_id) {
    removeFavorite(res, req.user.id, req.query.recipe_id);
  }
  return res.send({
    success: false,
    data: null,
    error: "Please give a recipe_id",
  });
});

router.get("/", (req, res) => {
  getUserFavorites(res, req.user.id);
});

module.exports = router;
