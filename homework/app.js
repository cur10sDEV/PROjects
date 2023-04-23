//  Packages
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const date = require(__dirname + "/date.js");
const app = express();
const mongoose = require('mongoose');


// Configs
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

// Mongoose
mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0", { useNewUrlParser: true, useUnifiedTopology: true });

const todoSchema = { todoitem: String };

const Item = mongoose.model("Item", todoSchema);

const item1 = new Item({ todoitem: "Welcome to your Todolist" });
const item2 = new Item({ todoitem: "Press + to add todos" });
const item3 = new Item({ todoitem: "<- Hit this to delete the respective item" });

const defaultItems = [item1, item2, item3];

const listSchema = {
    name: String,
    items: [todoSchema]
}

const List = new mongoose.model("List", listSchema);

// Variables
const day = date.getDate();
const name = "Jane Doe";

// Home Route
app.get("/", function (req, res) {

    Item.find({}, function (err, results) {
        if (err) {
            console.log(err);
        } else if (results.length === 0) {

            Item.insertMany(defaultItems).then(function (err) {
                if (err) {
                    console.log(err)
                } else {

                    mongoose.connection.close();

                    console.log("Saved successfully to database");


                }
            })
        }

        res.render("index", { name: name, todoType: "Home", date: day, todoTask: results, taskNo: results.length });
    })

});

app.post("/", function (req, res) {

    const inputItem = req.body.todoItem;
    const listName = req.body.list;

    const item = new Item({ todoitem: inputItem });

    if (listName === "Home") {
        item.save();
        res.redirect("/");
    } else {
        List.findOne({ name: listName }, function (err, result) {
            if (!err) {
                result.items.push(item);
                result.save();
                res.redirect("/" + listName);
            }
        })
    }
});

// Delete Route
app.post("/delete", function (req, res) {
    const checkedItemId = req.body.checkbox;
    const listNameToDelete = req.body.listNameToDelete;

    if (listNameToDelete === "Home") {
        Item.findByIdAndRemove(checkedItemId, { useFindAndModify: false }, function (err) {
            if (err) {
                console.log(err);
            } else {
                res.redirect("/");
            }
        })

    } else {
        List.findOneAndUpdate({ name: listNameToDelete }, { $pull: { items: { _id: checkedItemId } } }, { useFindAndModify: false }, function (err, result) {
            if (!err) {
                res.redirect("/" + listNameToDelete);
            }
        })
    }

    console.log(listNameToDelete);
    console.log(checkedItemId);
})






// Custom List Route
app.get("/:customListName", function (req, res) {

    const customListName = req.params.customListName;

    List.findOne({ name: customListName }, function (err, result) {
        if (!err) {

            if (!result) {

                const list = new List({
                    name: customListName,
                    items: defaultItems
                });

                list.save();

                res.redirect("/" + customListName);

            } else {

                res.render("index", { name: name, todoType: customListName, date: day, todoTask: result.items, taskNo: result.items.length });
            }
        }
    })
})

app.post("/:customListName", function (req, res) {

});




// About Page
app.get("/about", function (req, res) {
    res.write("<h1>This site is under maintenance.</h1>");
    res.send();
    res.render("index", { name: name, todoType: "Home", date: day, todoTask: defaultItems, taskNo: taskNo });
});







app.listen(process.env.PORT || 3000, console.log("Server running on port 3000!"));
