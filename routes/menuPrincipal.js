const express = require('express');
const router = express.Router();
const controladorMenu = require('../controllers/menuPrincipal');

//router.get('/', controladorMenu.prueba);

//Inicio
router.get('/', (req, res) => {
    res.render("menuPrincipal.html");
});

router.get('/nuevoJuego', controladorMenu.nuevoJuego);
router.get('/unirseJuego/:id', controladorMenu.unirseJuego);
router.get('/salir', controladorMenu.salir);

module.exports = router;
