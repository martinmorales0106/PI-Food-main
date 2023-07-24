require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

// crear una instancia de conexión a una base de datos PostgreSQL
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/food`,
  {
    logging: false,
    native: false,
  }
);

// Función para cargar y definir los modelos
function defineModels() {
  const modelDefiners = [];

  fs.readdirSync(path.join(__dirname, "/models"))
    .filter(
      (file) =>
        file.indexOf(".") !== 0 && file.slice(-3) === ".js"
    )
    .forEach((file) => {
      modelDefiners.push(require(path.join(__dirname, "/models", file)));
    });

  // Sequelize se utiliza para interactuar con la base de datos utilizando los modelos definidos
  modelDefiners.forEach((modelDefiner) => modelDefiner(sequelize));

  
  sequelize.models.Recipe = sequelize.models.recipe;
  sequelize.models.Diet = sequelize.models.diet;
}

// Llamamos a la función para definir los modelos
defineModels();

// Relaciones entre modelos
const { Recipe, Diet } = sequelize.models;

Recipe.belongsToMany(Diet, { through: "Recipe_Diets", timestamps: false });
Diet.belongsToMany(Recipe, { through: "Recipe_Diets", timestamps: false });

module.exports = {
  Recipe,
  Diet,
  conn: sequelize,
};
