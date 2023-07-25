const axios = require("axios");
require("dotenv").config();
const { API_KEY, URL } = process.env;
const { Recipe, Diet } = require("../db");
const { Op } = require("sequelize");

const getRecipeById = async (idrec) => {
  const validUUID =
    /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/;

  if (!validUUID.test(idrec)) {
    try {
      const response = await axios.get(
        `${URL}/${idrec}/information?apiKey=${API_KEY}`
      );
      const {
        id,
        vegetarian,
        title,
        summary,
        healthScore,
        instructions,
        image,
        diets,
      } = response.data;

      const dietasDB = await Promise.all(
        diets.map(async (dietName) => {
          const diet = await Diet.findOne({
            where: { name: { [Op.iLike]: `%${dietName}` } },
          });
          return diet;
        })
      );

      if (vegetarian) {
        const vegetarianDiet = await Diet.findOne({
          where: { name: "vegetarian" },
        });
        dietasDB.push(vegetarianDiet);
      }

      return {
        id,
        title,
        summary,
        healthScore,
        instructions,
        image,
        diets: dietasDB,
      };
    } catch (error) {
      console.error("Error al obtener información de la API:", error);
      throw error;
    }
  } else {
    try {
      const recipeDB = await Recipe.findByPk(idrec.toString());
      if (!recipeDB) {
        throw new Error("Receta no encontrada en la base de datos.");
      }

      const diets = await recipeDB.getDiets({ raw: true });
      recipeDB.dataValues.diets = [...diets];
      return recipeDB;
    } catch (error) {
      console.error("Error al obtener información de la base de datos:", error);
      throw error;
    }
  }
};

module.exports = getRecipeById;
