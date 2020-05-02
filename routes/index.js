const express = require('express')
const router = express.Router()
const bodyparser = require("body-parser")
const urlencodedparser = bodyparser.urlencoded({ extended : false }) // middleware
const mongoose = require("mongoose")

// connect to the cloud database
mongoose.connect("mongodb+srv://aizik1234:AizikAizik1234@cluster0-y5tlc.mongodb.net/test?retryWrites=true&w=majority")

//Create the schema for the database
const todoSchema = new mongoose.Schema({
  item : String
})

// create the model
const Todo = mongoose.model("Todo", todoSchema)

// let data = [
//   { item : "Play Video Games" },
//   { item:  "Go to the Gym" },
//   { item : "Read Node Text Book" }
// ]

/* GET home page. */
router.get('/', function(req, res, next) {
  // get the data from mongo db and pass it to the view
  Todo.find({  }, function (err, data) {
    if (err) throw err;
    res.render('todo-view', { todos: data });
  }) // find all the items in the database

});

router.post("/todo", urlencodedparser, (req, res) => {
  // get data drom the UI and add it to MongoDB
  let newTodo = Todo(req.body).save(function (err, data) {
    if (err) throw err;
    res.json(data)
  })
})

router.delete("/todo/:item", (req, res) =>{
  // delete the requested item from MongoDB
  Todo.find({ item: req.params.item.replace(/\-/g, " ") }).remove((err, data) =>{
    if (err) throw err;
    res.json(data)
  })

})

module.exports = router;
