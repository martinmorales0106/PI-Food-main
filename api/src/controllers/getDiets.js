const axios = require("axios");
const { Diet } = require("../db");
require("dotenv").config();
const { API_KEY, URL } = process.env;

const getDiets = async () => {
  try {
    let diets = await Diet.findAll();

    if (!diets.length) {
      const { data } = await axios.get(
        `${URL}/complexSearch?apiKey=${API_KEY}&number=30&addRecipeInformation=true`
      );

      const apiDiets = new Set(data.results.flatMap((recipe) => recipe.diets));
      apiDiets.add("vegetarian"); 

      const dietRecords = Array.from(apiDiets, (diet) => ({ name: diet }));

      await Diet.bulkCreate(dietRecords);

      diets = await Diet.findAll();
    }

    return diets;
  } catch (error) {
    console.error("Error al obtener las dietas:", error);
    throw error;
  }
};

module.exports = getDiets;
