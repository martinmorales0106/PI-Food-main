const { Recipe, Diet } = require("../db");

const postRecipe = async ({
  title,
  image,
  summary,
  healthScore,
  instructions,
  diets,
}) => {
  const recipe = await Recipe.create({
    title,
    image,
    summary,
    healthScore,
    instructions,
  });

  const dietInstances = await Diet.findAll({
    where: { name: diets.map((diet) => diet.toString()) },
  });

  await recipe.addDiets(dietInstances);
};

module.exports = postRecipe;
