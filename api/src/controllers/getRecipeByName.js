const axios = require("axios");
const { Recipe } = require("../db");
const { Op } = require("sequelize");
require("dotenv").config();
const { API_KEY, URL } = process.env;
const getRecipeDiets = require("./getRecipeDiets");

const getRecipeByName = async (name) => {
  try {
    // Consulta a la API externa para obtener recetas por nombre
    let recipesApi = await axios
      .get(
        `${URL}/complexSearch?query=${name}&apiKey=${API_KEY}&addRecipeInformation=true`
      )
      .then(async (res) => {
        // Mapeo y procesamiento de las recetas obtenidas desde la API
        let recipes = await Promise.all(
          res.data.results.map(
            async ({ vegetarian, id, title, healthScore, image, diets }) => {
              return {
                vegetarian,
                id,
                title,
                healthScore,
                image,
                diets: await getRecipeDiets(vegetarian, diets), // Obtiene las dietas para cada receta usando la función getRecipeDiets.
              };
            }
          )
        );
        return recipes;
      });
    // Consulta a la base de datos local para obtener recetas por nombre
    let recipesDB = await Recipe.findAll({
      where: { title: { [Op.iLike]: `%${name}%` } },
    });
    // Procesamiento de las recetas obtenidas desde la base de datos
    recipesDB = await Promise.all(
      recipesDB.map(async (recipe) => {
        let diets = await recipe.getDiets({ raw: true });
        return { ...recipe.dataValues, diets: [...diets] };
      })
    );
    // Combinar las recetas de la API y las recetas de la base de datos y retornar el resultado.
    return [...recipesDB, ...recipesApi];
  } catch (error) {
    console.error("Error al obtener recetas por nombre:", error);
    throw error;
  }
};

module.exports = getRecipeByName;
