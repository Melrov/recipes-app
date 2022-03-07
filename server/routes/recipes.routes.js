const express = require("express")
const { getRecipeBySpoonId } = require("../models/recipes.model")
const router = express.Router()

router.get("/:spoon_id", (req, res) => {
    getRecipeBySpoonId(res, req.params.spoon_id)
})



module.exports = router