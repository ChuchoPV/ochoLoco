const express = require("express");
const router = express.Router();

const controladorMarca = require("../controllers/controllerDB");

router.post('/crearJuego/', controladorMarca.crearJuego);
router.delete('/eliminarJuego/:id', controladorMarca.eliminarJuego);
router.put('/agregarJugador/:id', (req, res) => {
    console.log(req.param);
    //controladorMarca.agregarJugador(req, res, id)
});
router.put('/actualizarJuego/:id', controladorMarca.actualizarJuego);
router.get('/consultarJuego/:id', controladorMarca.consultarJuego);

module.exports = router;
