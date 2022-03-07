const express = require("express")
const { addFavorite, removeFavorite, getUserFavorites } = require("../models/favorites.model")
const router = express.Router()

router.post('/addFav', (req, res) => {
    if(req.query.user_id && req.query.recipe_id){
        addFavorite(res, req.query.user_id, req.query.recipe_id)
    }
    return res.send({success: false, data: null, error: "Please give a user_id and recipe_id"})
})

router.delete('/removeFav', (req, res) => {
    if(req.query.user_id && req.query.recipe_id){
        removeFavorite(res, req.query.user_id, req.query.recipe_id)
    }
    return res.send({success: false, data: null, error: "Please give a user_id and recipe_id"})
})

router.get('/:user_id', (req, res) => {
    if(req.params.user_id){
        getUserFavorites(res, req.params.user_id)
    }
    return res.send({success: false, data: null, error: "Please give a user_id"})
})

module.exports = router