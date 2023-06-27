const { Router } = require("express");
const {
  handlerIdRecipe,
  handlerGetRecipes,
  handlerPostRecipe,
} = require("../handlers/handlerRecipes");
const routeRecipes = Router();

routeRecipes.get("/:id", handlerIdRecipe);
routeRecipes.get("/", handlerGetRecipes);
routeRecipes.post("/", handlerPostRecipe);

module.exports = routeRecipes;