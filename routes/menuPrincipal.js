const express = require('express');
const router = express.Router();
const controladorMenu = require('../controllers/menuPrincipal');
const controladorDB = require("../controllers/controllerDB")

//router.get('/', controladorMenu.prueba);

//Inicio
router.get('/', (req, res) => {
    res.render("menuPrincipal.html");
});

router.get('/nuevoJuego', controladorDB.crearJuego);
router.get('/consultarJuego/:id', controladorDB.consultarJuego);
router.get('/unirseJuego/:id', (req, res) => {
    controladorDB.agregarJugador(req, res, req.params.id);
});
router.delete('/eliminarJuego/:id', controladorDB.eliminarJuego);
router.get('/actualizarJuego/:id', controladorDB.actualizarJuego);
router.get('/salir', (req, res) => {
    res.redirect("/");
});

module.exports = router;
