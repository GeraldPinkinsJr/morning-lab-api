const { json } = require("express");
const express = require("express");
const router = express.Router();
const fs = require("fs");

const RECIPES_FILE = "./data/data.json";

// GET REQUEST
router.get("/", (req, res, next) => {
  fs.readFile(RECIPES_FILE, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("There was a problem reading the file.");
      return;
    }
    res.json(JSON.parse(data));
  });
});

// GET BY ID
router.get("/:id", (req, res) => {
  fs.readFile(RECIPES_FILE, "utf-8", (err, data) => {
    if(err) {
      console.error(err);
      res.status(500).send("There was a problem with the file");
      return;
    }
    const recipes = JSON.parse(data);
    const oneRecipe = recipes.find(recipe => recipe.id === parseInt(req.params.id));
    
    if (!oneRecipe) {
        res.status(404).send("recipe not found");
        return;
    }
    res.send(oneRecipe)
    
  });
});

// POST A NEW RECIPE
router.post('/', (req,res) => {
    fs.readFile(RECIPES_FILE, "utf-8", (err, data) => {
        if(err) {
            console.error(err);
            res.status(500).send('There was a problem reading the file');
            return;
        }
        const recipes = JSON.parse(data)
        const newRecipe = {
            id: (recipes.length + 1).toString(),
            name: req.body.name,
            style: req.body.style,
            prep_time: req.body.prep_time,
            cook_time: req.body.cook_time,
            instructions: req.body.instructions,
        };
        console.log(newRecipe)
        recipes.push(newRecipe)

        })
    })


module.exports = router;
