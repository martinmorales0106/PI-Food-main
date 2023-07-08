const axios = require("axios");
require("dotenv").config();
const { API_KEY, URL } = process.env;
const { Recipe } = require("../db");
const { getRecipeDiets } = require("./getRecipeByName");

const getRecipes = async () => {
  let recipesApi = await axios.get(
    `${URL}/complexSearch?apiKey=${API_KEY}&number=30&instructionsRequired=true&addRecipeInformation=true`
  ).then(async (res) => {
    let recipes = res.data.results.map(
      ({ vegetarian, id, title, healthScore, image, diets }) => {
        return { vegetarian, id, title, healthScore, image, diets };
      }
    );
    for (const recipe of recipes) {
      recipe.diets = await getRecipeDiets(recipe.vegetarian, recipe.diets);
    }
    return recipes;
  });
  let recipesDB = await Recipe.findAll();
  for (const recipe of recipesDB) {
    let diets = await recipe.getDiets({ raw: true });
    recipe.dataValues.diets = [...diets];
  }
  return [...recipesDB, ...recipesApi];
};

module.exports = getRecipes;
