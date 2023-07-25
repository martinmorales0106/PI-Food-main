const { Diet } = require("../db");
const { Op } = require("sequelize");
require("dotenv").config();

const getRecipeDiets = async (vegetarian, diets) => {
  try {
    let dietasDB = await Promise.all(
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

    return dietasDB;
  } catch (error) {
    console.error("Error al obtener las dietas:", error);
    throw error;
  }
};

module.exports =  getRecipeDiets;