const { Router } = require("express");
const handlerDiets = require("../handlers/handlerDiets");
const routeDiets = Router();

routeDiets.get("/", handlerDiets);

module.exports = routeDiets;
