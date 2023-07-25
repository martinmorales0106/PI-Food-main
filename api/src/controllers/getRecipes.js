const axios = require("axios");
require("dotenv").config();
const { API_KEY, URL } = process.env;
const { Recipe } = require("../db");
const getRecipeDiets = require("./getRecipeDiets");

const getRecipes = async () => {
  try {
    // Obtener recetas de la API externa
    const recipesApi = await axios.get(
      `${URL}/complexSearch?apiKey=${API_KEY}&number=30&instructionsRequired=true&addRecipeInformation=true`
    );

    // Procesar y mapear las recetas desde la API
    const recipesFromApi = recipesApi.data.results.map(
      ({ vegetarian, id, title, healthScore, image, diets }) => ({
        vegetarian,
        id,
        title,
        healthScore,
        image,
        diets,
      })
    );

    // Obtener información de la dieta para cada receta de la API
    const recipesWithDiets = await Promise.all(
      recipesFromApi.map(async (recipe) => {
        recipe.diets = await getRecipeDiets(recipe.vegetarian, recipe.diets);
        return recipe;
      })
    );

    // Obtener recetas almacenadas en la base de datos local con las dietas asociadas
    const recipesDB = await Recipe.findAll();
    const recipesFromDB = await Promise.all(
      recipesDB.map(async (recipe) => {
        let diets = await recipe.getDiets({ raw: true });
        return { ...recipe.toJSON(), diets };
      })
    );

    // Combinar las recetas de la API y las recetas de la base de datos
    return [...recipesFromDB, ...recipesWithDiets];
  } catch (error) {
    console.error("Error al obtener recetas:", error);
    throw error;
  }
};

module.exports = getRecipes;
