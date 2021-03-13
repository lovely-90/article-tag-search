const express = require("express");
const router = express.Router();

// Use Schema
const Article = require("../models/article");

router.get("/articles", (req, res, next) => {
    Article.find(function(err, articles){
        res.json(articles);
    })
});

router.post("/articles", (req, res, next) => {
    console.log(req.body);
    let newArticle = new Article({
        heading: req.body.heading,
        body: req.body.body,
        tags: req.body.tags
    });
    console.log(newArticle);
    newArticle.save((err, article) => {
      if(err)
          res.json({msg: "Failed to save article"});
      else   
          res.json({msg: "Added successfyllu"});
    });
});
  
router.delete("/articles/:id", (req, res) => {
    Article.remove({_id: req.params.id}, (err, results) => {
        if(err)
            res.json(err);
        else    
            res.json(results);
    });
});

module.exports = router;

// app.post("/register", function(req, res){
//   const newUser = new User({
//     email: req.body.username,
//     password: req.body.password
//   });
//   newUser.save(function(err){
//     if(err)
//       res.send(err);
//     else
//       res.render("secrets");
//   });
// });

// app.post("/login", function(req, res){

//   User.findOne({name: req.body.username}, function(err, foundUser){
//     if(err)
//       res.send(err);
//     else {
//       if(foundUser && foundUser.password === req.body.password)
//         res.render("secrets");
//       else
//         res.send("Ooops, wrong password")
//     }
//   });
// });