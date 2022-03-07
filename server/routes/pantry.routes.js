const express = require("express")
const { addIngredient, removeIngredient, editIngredient, getUserPantry, getUserShoppingList } = require("../models/pantry.model")
const router = express.Router()

router.put('/addIngredient', (req, res) => {
    addIngredient(res, req.body)
})

router.delete('/removeIngredient', (req, res) => {
    removeIngredient(res, req.body.ingredient_id, req.body.user_id)
})

router.patch('/editIngredient', (req, res) => {
    editIngredient(res, req.body.ingredient_id, req.body.user_id, req.body.amount)
})

router.get('/:user_id', (req, res) => {
    getUserPantry(res, req.params.user_id)
})

router.get('/shoppingList/:user_id', (req, res) => {
    getUserShoppingList(res, req.params.user_id)
})

module.exports = router