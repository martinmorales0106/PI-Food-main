const getRecipeById = require("../controllers/getRecipeById");
const getRecipeByName  = require("../controllers/getRecipeByName");
const getRecipes = require("../controllers/getRecipes");
const postRecipe = require("../controllers/postRecipe");

const handlerIdRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await getRecipeById(id);
    res.status(200).json(recipe);
  } catch (error) {
    res.status(400).json({ error: "Error al obtener la receta por ID." });
  }
};

const handlerGetRecipes = async (req, res) => {
  const { name } = req.query;
  
  try {
    let recipes;
    if (name) {
      recipes = await getRecipeByName(name);
    } else {
      recipes = await getRecipes();
    }
    res.status(200).json(recipes);
  } catch (error) {
    res.status(400).json({ error: "Error al obtener las recetas." });
  }
};

const handlerPostRecipe = async (req, res) => {
  try {
    const { title, image, summary, healthScore, instructions, diets } =
      req.body;
    await postRecipe({ title, image, summary, healthScore, instructions, diets });
    res.status(200).json({
      success: { title, image, summary, healthScore, instructions, diets },
    });
  } catch (error) {
    res.status(400).json({ error: "Error al crear la receta." });
  }
};

module.exports = {
  handlerIdRecipe,
  handlerGetRecipes,
  handlerPostRecipe,
};
