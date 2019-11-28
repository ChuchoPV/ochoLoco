const express = require('express');
const router = express.Router();
const controladorDB = require("../controllers/controllerDB");
const controladorGame = require("../controllers/controllerGame");

//router.get('/', controladorMenu.prueba);

//Inicio
router.get('/', (req, res) => {
    res.render("menuPrincipal.html");
});

router.post('/nuevoJuego', controladorDB.crearJuego);
router.get('/consultarJuego/:id', controladorDB.consultarJuego);
router.get('/unirseJuego/:id', (req, res) => {
    controladorDB.agregarJugador(req, res, req.params.id);
});
router.delete('/eliminarJuego/:id', controladorDB.eliminarJuego);
router.get('/actualizarJuego/:id', controladorDB.actualizarJuego);
router.get('/salir', (req, res) => {
    res.redirect("/");
});
router.post('/comerCarta/:game_id/:user_id', (req, res) => {
    controladorGame.comerCarta(req, res, req.params.game_id, req.params.user_id);
});
router.post('/usarCarta/:game_id/:user_id/:carta', (req, res) => {
    controladorGame.usarCarta(req, res, req.params.game_id, req.params.user_id, req.params.carta);
});

module.exports = router;
