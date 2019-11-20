const express = require("express");
const router = express.Router();

const controladorMarca = require("../controllers/controller");

router.get('/', controladorMarca.prueba);

module.exports = router;