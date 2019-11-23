const express = require("express");
const router = express.Router();

const controladorMarca = require("../controllers/controller");

router.post('/crearJuego/', controladorMarca.crearJuego);
router.delete('/eliminarJuego/:id', controladorMarca.eliminarJuego);
router.put('/agregarJugador/:id', controladorMarca.agregarJugador);
router.put('/actualizarJuego/:id', controladorMarca.actualizarJuego);
router.get('/consultarJuego/:id', controladorMarca.consultarJuego);

module.exports = router;