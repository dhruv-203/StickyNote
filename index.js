var express = require('express');
var path = require("path");
var app = express();
app.use(express.static("public"))
app.set('view engine', "pug");
app.set("views", "views")
// app.render("./public/index.html")
app.get("/", function (req, res) {
    res.render("display");
})
app.post("/", function (req, res) {
    console.log("received a post req");
})
// console.log(__dirname)
app.get("/about", function (req, res) {
    res.render("about")
})
app.listen(3000);