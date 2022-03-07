const express = require("express")
const { addIngredient, removeIngredient, editIngredient } = require("../models/pantry.model")
const router = express.Router()

router.put('/addIngredient', (req, res) => {
    addIngredient(res, req.body)
})

router.delete('/removeIngredient', (req, res)=> {
    removeIngredient(res, req.body.ingredient_id, req.body.user_id)
})

module.exports = router