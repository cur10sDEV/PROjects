// Packages
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

// MongoDB
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0", {useNewUrlParser: true});

const postSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Post = mongoose.model("Post", postSchema);


// LODASH

// Load the full build.
var _ = require('lodash');


const app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));


// Content constant
const homeStartingContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi obcaecati quos, id quam odit sapiente doloremque ducimus quidem sequi ex provident vero saepe amet necessitatibus vel, rerum molestias non accusantium dolorem, corporis aspernatur asperiores? Ab temporibus ad nam. Perferendis nisi beatae earum quaerat. Explicabo, dolor nobis! Ipsam quaerat ullam quod labore ex officiis dignissimos aperiam placeat ratione ducimus."
const aboutStartingContent = "Commodi obcaecati quos, id quam odit sapiente doloremque ducimus quidem sequi ex provident vero saepe amet necessitatibus vel, rerum molestias non accusantium dolorem, corporis aspernatur asperiores? Ab temporibus ad nam. Perferendis nisi beatae earum quaerat. Explicabo, dolor nobis! Ipsam quaerat ullam quod labore ex officiis dignissimos aperiam placeat ratione ducimus enim in accusamus corrupti nam, unde laboriosam? Eveniet tempora atque veritatis magnam cum sapiente eos culpa. Perferendis tenetur perspiciatis voluptates sed velit cupiditate autem, asperiores labore voluptatum quo nostrum! Voluptatem debitis assumenda, officia et quibusdam maxime! Perferendis ea fuga possimus dicta repellendus."
const contactStartingContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi obcaecati quos, id quam odit sapiente doloremque ducimus quidem sequi ex provident vero saepe amet necessitatibus vel, rerum molestias non accusantium dolorem, corporis aspernatur asperiores? Explicabo, dolor nobis! Ipsam quaerat ullam quod labore ex officiis dignissimos aperiam placeat ratione ducimus enim in accusamus corrupti nam, unde laboriosam? Perferendis tenetur perspiciatis voluptates sed velit cupiditate autem, asperiores labore voluptatum quo nostrum! Voluptatem debitis assumenda, officia et quibusdam maxime! Perferendis ea fuga possimus dicta repellendus."




// Home
app.get("/", function(req,res) {

    Post.find(function(err, results) {
        if (!err) {
            res.render("home", {homeStartingContent: homeStartingContent, posts: results});
        }
    })
});


// About
app.get("/about", function(req,res) {
    res.render("about", {aboutStartingContent: aboutStartingContent});
});


// Contact
app.get("/contact", function(req,res) {
    res.render("contact", {contactStartingContent: contactStartingContent});
});



// Compose
app.get("/compose", function(req,res) {
    res.render("compose");
});

app.post("/compose", function(req,res) {
    postTitle = req.body.postTitle;
    postBody = req.body.postBody;

    const post = new Post({
        title: postTitle,
        content: postBody
    });

    post.save();

    res.redirect("/")
});


// Posts
app.get("/posts/:title", function(req,res) {

    searchTitle = _.lowerCase(req.params.title);

    Post.find(function(err, results) {
        if (!err) {

            results.forEach(function(post) {
                requiredTitle = _.lowerCase(post.title);

                if (requiredTitle === searchTitle ) {

                    Post.find({title: req.params.title}, function(err, results) {
                        if(!err) {
                            res.render("post", { results : results});
                        }
                    })
                }
            })
        }
    })
});


app.listen(process.env.PORT || 3000, () => console.log("Server is running on port 3000!"));
