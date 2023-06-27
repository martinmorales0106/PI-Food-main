const axios = require("axios");
require("dotenv").config();
const { API_KEY, URL } = process.env;
const { Recipe, Diet } = require("../db");
const { Op } = require("sequelize");

const getRecipeById = async (idrec) => {
  const validUUID =
    /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/;

  if (!validUUID.test(idrec)) {
    let {
      id,
      vegetarian,
      title,
      summary,
      healthScore,
      instructions,
      image,
      diets,
    } = await axios(`${URL}/${idrec}/information?apiKey=${API_KEY}`).then(
      (res) => {
        return res.data;
      }
    );

    let dietasDB = [];
    
    for (let i = 0; i < diets.length; i++) {
      let diet = await Diet.findOne({
        where: { name: { [Op.iLike]: `%${diets[i]}` } },
      });
      dietasDB.push(diet);
    }
    if (vegetarian)
      dietasDB.push(await Diet.findOne({ where: { name: "vegetarian" } }));
    diets = dietasDB;

    return { id, title, summary, healthScore, instructions, image, diets };
  } else {
    
    let recipeDB = await Recipe.findByPk(idrec.toString());
    let diets = await recipeDB.getDiets({ raw: true });
    recipeDB.dataValues = { ...recipeDB.dataValues, diets: [...diets] };

    return recipeDB;
  }
};

module.exports = getRecipeById;
