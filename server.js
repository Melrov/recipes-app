require('dotenv').config()
const express = require("express")


const app = express()
const SERVER_PORT = process.env.SERVER_PORT || 8080

app.use(express.json())
app.use(express.static(__dirname + "/build"))

app.get("*", (req, res) => {
    //return res.send({ success: false });
    return res.sendFile("/build/index.html", {root: __dirname + "/"})
  });

app.listen(SERVER_PORT, ()=> {
    console.log(`Example app listening on port ${SERVER_PORT}!`);
})