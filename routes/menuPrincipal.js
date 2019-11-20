const express = require('express');
const router = express.Router();
const path = require('path');
const controladorMenu = require('../controllers/menuPrincipal');
const dir = '/home/ec2-user/environment/ochoLoco';

router.get('/', controladorMenu.prueba);

//Inicio
router.get('/', (req, res) => {
    res.sendFile(path.join(dir + '/views/menuPrincipal.html'));
});

router.get('/nuevoJuego', controladorMenu.nuevoJuego);
router.get('/unirseJuego', controladorMenu.unirseJuego);
router.get('/salir', controladorMenu.salir);

module.exports = router;
