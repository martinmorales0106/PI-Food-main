const getDiets = require("../controllers/getDiets");

const handlerGetDiets = async (req, res) => {
  try {
    const dietas = await getDiets();
    res.status(200).json(dietas);
  } catch (error) {
    console.error("Error al obtener las dietas:", error);
    res.status(500).json({ error: "Error al obtener las dietas" });
  }
};

module.exports = handlerGetDiets;
