const express = require("express")
const { addFavorite, removeFavorite } = require("../models/favorites.model")
const router = express.Router()

router.post('/addFav', (req, res) => {
    addFavorite(res, req.query.uid, req.query.recipeId)
})

router.delete('/removeFav', (req, res) => {
    removeFavorite(res, req.query.uid, req.query.recipeId)
})

module.exports = router