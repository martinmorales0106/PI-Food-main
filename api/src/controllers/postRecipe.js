const { Recipe, Diet } = require("../db");

const postRecipe = async ({
  title,
  summary,
  healthScore,
  instructions,
  image,
  diets,
}) => {
  try {
    const recipe = await Recipe.create({
      title,
      summary,
      healthScore,
      instructions,
      image,
    });

    const dietInstances = await Diet.findAll({
      where: { name: diets.map((diet) => diet.toString()) },
    });

    await recipe.addDiets(dietInstances);
    return recipe;
    
  } catch (error) {
    console.error("Error al crear la receta:", error);
    throw error;
  }
};

module.exports = postRecipe;
