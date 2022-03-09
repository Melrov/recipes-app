const express = require("express")
const { searchRecipeById, ingredientSearch, singleIngredientSearch, searchRecipe } = require("../models/search.model")
const authenticate = require("../middleware/authenticate.middleware");
const router = express.Router()

router.use(authenticate)

router.get("/recipes", (req, res) => {
    searchRecipe(res, req.query.query)
})

router.get("/ingredients", (req, res) => {
    ingredientSearch(res, req.query.query)
})

router.get("/ingredientInfo", (req, res) => {
    singleIngredientSearch(res, req.query.spoon_id, req.user.id)
})

module.exports = router