const { Diet } = require("../db");
const axios = require("axios");
require("dotenv").config();
const { API_KEY, URL } = process.env;

const getDiets = async () => {
  let diets = await Diet.findAll();
  if (!diets.length) {
    const { data } = await axios.get(
      `${URL}/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
    );
    const apiDiets = new Set(data.results.flatMap((e) => e.diets));
    apiDiets.add("vegetarian");
    const dietRecords = Array.from(apiDiets, (diet) => ({ name: diet }));
    await Diet.bulkCreate(dietRecords);
    diets = await Diet.findAll();
  }
  return diets;
};

module.exports = getDiets;
