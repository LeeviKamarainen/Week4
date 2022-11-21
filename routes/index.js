var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get("/recipe/:food", function(req, res, next) {
  let foodname = req.params.food;
  console.log(foodname)

  let recipe = {
    name: foodname,
    instructions: ['TEMPINSTRUCTION'],
    ingredients: ['TEMPINGREDIENT']
    }

    res.json(recipe);
})

router.post('/recipe/', function(req,res,next) {
    let recipe = req.body;
    console.log(recipe)
    res.json(recipe);

})

router.post('/images', function(req,res,next) {
  console.log(req.body)
  res.send('HELLO');

})

module.exports = router;
