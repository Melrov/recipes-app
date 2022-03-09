const express = require("express")
const { getRecipeBySpoonId } = require("../models/recipes.model")
const authenticate = require("../middleware/authenticate.middleware");
const router = express.Router()

router.use(authenticate)

router.get("/:spoon_id", (req, res) => {
    getRecipeBySpoonId(res, req.params.spoon_id)
})



module.exports = router