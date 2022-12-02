var express = require('express');
const mongoose = require('mongoose')
const Recipe = require('../models/Recipe')
const Image = require('../models/Images')
const categories = require('../models/category')
const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage})
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get("/recipe/:food", function(req, res, next) {
  let foodname = req.params.food;

  Recipe.findOne({name: foodname}, (err, recipe) => {
    if(err) return next(err)
    if(!recipe) { return res.status(403).json("Recipe with that name not found");}
    else {
      console.log(recipe)
      res.json(recipe);
    }
  })

})

router.get('/diets/', function(req,res,next) {


  let diets = categories.find({}, function(err, diets){
    res.json(diets)
  });


})

router.get('/images/:imageId', function(req,res,next) {
  imageIDs = req.id;
  res.json(imageIDs);

})

router.post('/recipe/', function(req,res,next) {
    Recipe.findOne({name: req.body.name}, (err, name) => {
      if(err) return next(err)
      if(!name) { 
        new Recipe({
          name: req.body.name,
          ingredients: req.body.ingredients,
          instructions: req.body.instructions,
          categories: req.body.categories,
          images: req.body.images

        }).save((err) => {
          if(err) return next(err);
          return res.send(req.body);

        })

      } else {
        return res.status(403).json({response: "Already has that recipe"});
      }


    })
    /*console.log(recipe)
    res.json(recipe);*/

})

router.post('/images',upload.array('images',12), function(req,res,next) {
  imgdata = req.files[0];
  if(req.files[0] != undefined) {
  new Image({
    buffer: imgdata.buffer,
    mimetype: imgdata.mimetype,
    name: imgdata.originalname,
    encoding: imgdata.encoding

  }).save((err, image) => {
    if(err) return next(err);
    res.json({id: image._id});
  })
}
else {
  res.status(403).json({response: "Image not inputted"});
}

})

module.exports = router;
