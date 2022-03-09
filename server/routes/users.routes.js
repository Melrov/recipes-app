const express = require("express")
const { login, signup } = require("../models/users.model")
const authenticate = require("../middleware/authenticate.middleware");
const router = express.Router()

router.get("/verify",authenticate, (req, res) => {
    return res.send({success: true, data: {username: req.user.username}, error: null})
})

router.get("/logout", (req, res) => {
    res.clearCookie("access_token")
    return res.send({success: true, data: null, error: null})
})

router.post("/login", (req, res) => {
    login(res, req.body.username, req.body.password)
})

router.put("/signup", (req, res) => {
    signup(res, req.body.username, req.body.password)
})

module.exports = router