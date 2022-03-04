const express = require("express")
const router = express.Router()

router.get("/recipes/", (req, res) => {
    const apiRes = apiCall(req.query)
})
