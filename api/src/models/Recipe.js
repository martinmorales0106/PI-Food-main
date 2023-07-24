const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // Definimos el modelo
  sequelize.define(
    "recipe",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        //El título de la receta.
      },
      summary: {
        type: DataTypes.TEXT,
        allowNull: false,
        //Un resumen o descripción corta de la receta.
      },
      healthScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // Puntuación de la receta.
      },
      instructions: {
        type: DataTypes.TEXT,
        allowNull: false,
        // Instrucciones detalladas para preparar la receta.
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        // URL de la imagen asociada a la receta.
      },
    },
    {
      timestamps: false, // Desactivar la creación automática de campos de fecha (createdAt, updatedAt).
    }
  );
};
