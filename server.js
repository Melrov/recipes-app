require('dotenv').config()
const express = require("express")
const cors = require("cors")
const cookieparser = require("cookie-parser")

const passport = require("./server/config/passport.config")

const favoritesRoutes = require("./server/routes/favorites.routes")
const pantryRoutes = require("./server/routes/pantry.routes")
const recipesRoutes = require("./server/routes/recipes.routes")
const searchRoutes = require("./server/routes/search.routes")
const usersRoutes = require("./server/routes/users.routes")

const app = express()
const PORT = process.env.SERVER_PORT || 8080

app.use(cors())
app.use(express.json())
app.use(express.static(__dirname + "/build"))
app.use(cookieparser())
app.use(passport.initialize())

app.use("/api/favorites", favoritesRoutes)
app.use("/api/pantry", pantryRoutes)
app.use("/api/recipes", recipesRoutes)
app.use("/api/search", searchRoutes)
app.use("/api/users", usersRoutes)

app.get("*", (req, res) => {
    //return res.send({ success: false });
    return res.sendFile("/build/index.html", {root: __dirname + "/"})
  });

app.listen(SERVER_PORT, ()=> {
    console.log(`Example app listening on port ${PORT}!`);
})