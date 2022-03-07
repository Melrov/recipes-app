require('dotenv').config()
const express = require("express")
const cookieparser = require("cookie-parser")

const favoritesRoutes = require("./server/routes/favorites.routes")
const pantryRoutes = require("./server/routes/pantry.routes")
const recipesRoutes = require("./server/routes/recipes.routes")
const searchRoutes = require("./server/routes/search.routes")
const usersRoutes = require("./server/routes/users.routes")

const app = express()
const SERVER_PORT = process.env.SERVER_PORT || 8080

app.use(express.json())
app.use(express.static(__dirname + "/build"))
app.use()

app.use("/favorites", favoritesRoutes)
app.use("/pantry", pantryRoutes)
app.use("/recipes", recipesRoutes)
app.use("/search", searchRoutes)
app.use("/users", usersRoutes)

app.get("*", (req, res) => {
    //return res.send({ success: false });
    return res.sendFile("/build/index.html", {root: __dirname + "/"})
  });

app.listen(SERVER_PORT, ()=> {
    console.log(`Example app listening on port ${SERVER_PORT}!`);
})