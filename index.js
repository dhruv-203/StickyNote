var express = require('express');
var path = require("path");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var noteSchema = mongoose.Schema({
    data: String
})

var noteModel = mongoose.model("noteModel", noteSchema, "noteList")
mongoose.connect(
    "mongodb+srv://dhruv1207:<Password>@cluster0.oulhutm.mongodb.net/Notes?retryWrites=true&w=majority").then(() => {

        const collections = mongoose.connection.collections;
        if (!collections[noteModel.collection.collectionName]) {
            mongoose.connection.createCollection(noteModel.collection.collectionName);
        }
        console.log("connected");
    }).catch((err) => {
        console.log(err);
    });

var app = express();
app.use(express.static("public"))
app.get("/getData", function (req, res) {
    noteModel.find().then(function (note) {
        console.log("loaded data");
        res.send(note);
    })
})


app.use(bodyParser.json())

app.post("/postData", function (req, res) {
    var noteDoc = new noteModel({
        data: req.body.content,
    });
    noteDoc.save().then((savedNote) => {
        console.log("savedNote");
        res.status(200).send(savedNote);
    }).catch((err) => {
        console.log(err);
    })
})
app.put("/updateData/:id", function (req, res) {
    const id = req.params.id;
    const mydata = req.body.data
    noteModel.findByIdAndUpdate(id, { data: mydata }).then(() => {
        console.log("Update successfully")
    }).catch((err) => {
        console.log(err)
    })
    res.send("update success")
})

app.delete("/deleteData/:id", function (req, res) {
    const id = req.params.id;
    noteModel.findByIdAndDelete(id).then(function (note) {
        console.log("note delete successfully")
        res.send("note deleted successfully")
    }).catch(function () {
        console.log("error occurred");
        res.status(500).send("Error in deleting");
    })
})
app.listen(3000);
