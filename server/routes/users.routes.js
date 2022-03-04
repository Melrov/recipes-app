const express = require("express")
const { login, signup } = require("../models/users.model")
const router = express.Router()

router.post("/login", (req, res) => {
    login(res, req.body.username, req.body.password)
})

router.put("/signup", (req, res) => {
    signup(res, req.body.username, req.body.password)
})

module.exports = router