const express = require("express")
const { searchRecipeById, ingredientSearch, singleIngredientSearch, searchRecipe } = require("../models/search.model")
const router = express.Router()

router.get("/recipes/", (req, res) => {
    searchRecipe(res, req.query.query)
})

router.get("/ingredients", (req, res) => {
    ingredientSearch(res, req.query.query)
})

router.get("/ingredientInfo", (req, res) => {
    singleIngredientSearch(req.query.id, res, req.query.uid)
})