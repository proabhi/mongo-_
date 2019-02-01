const express = require('express')
const app = express()
let ejs = require('ejs')
const ObjectID = require('mongodb').ObjectID;
app.set('view engine', 'ejs');
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/user', { useNewUrlParser: true });
var db = mongoose.connection;
const friend = mongoose.model('friend', { name: String });
app.get("/", (req, res) => {
    friend.find({}, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.render("index", { friend: result })
        }
    })
})
app.get("/delete/:id", (req, res) => {
    friend.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.redirect("/")
        }
        else{
            res.redirect("/")
        }
            
    })
})
app.post("/submit", (req, res) => {
    friend.create({ name: req.body.name }, (err, result) => {
        if (err)
            console.log(err)
        else
            console.log("added");
    })
    res.redirect("/")
})
app.listen("3000", () => {
    console.log("listening on port 3000")
})