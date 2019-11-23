const express = require("express");
const router = express.Router();

const controladorMarca = require("../controllers/controller");

router.get('/', controladorMarca.crearJuego);

module.exports = router;