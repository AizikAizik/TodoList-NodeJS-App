const bodyparser = require("body-parser")
const urlencodedparser = bodyparser.urlencoded({ extended : false }) // middleware

let data = [
    { item : "Play Video Games" },
    { item:  "Go to the Gym" },
    { item : "Read Node Text Book" }
    ]

module.exports = function (app) {
    // handle get requests
    app.get("/todo", (req, res) => {
        res.render("todo-view", { todos : data })
    })

    app.post("/todo", urlencodedparser, (req, res) => {
        data.push(req.body)
        res.json(data) // send the data back
    })

    app.delete("/todo/:item", function(req, res) {
        data = data.filter((todo) =>{
            return todo.item.replace(/ /g, "-") !== req.params.item
        })
        res.json(data)
    })
}
