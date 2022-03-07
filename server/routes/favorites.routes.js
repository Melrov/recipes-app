const express = require("express")
const { addFavorite, removeFavorite, getUserFavorites } = require("../models/favorites.model")
const router = express.Router()

router.post('/addFav', (req, res) => {
    addFavorite(res, req.query.uid, req.query.recipe_id)
})

router.delete('/removeFav', (req, res) => {
    removeFavorite(res, req.query.uid, req.query.recipe_id)
})

router.get('/:user_id', (req, res) => {
    getUserFavorites(res, req.params.user_id)
})

module.exports = router