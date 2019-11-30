const express = require('express');
const router = express.Router();
const controladorDB = require("../controllers/controllerDB");
const controladorGame = require("../controllers/controllerGame");

//router.get('/', controladorMenu.prueba);

//Inicio
router.get('/', (req, res) => {
    res.render("menuPrincipal.html");
});

//AGREGA UN NUEVO JUEGO CON UN JUGADOR
router.get('/nuevoJuego', controladorDB.crearJuego);

router.get('/juego/:id/:user', controladorDB.consultarJuego);

//CONSULTA UN JUEGO BASADO EN EL ID DEL PARAMETRO
router.get('/consultarJuego/:id/:user', controladorDB.consultarJuego);

//AGREGA UN JUGADOR AL JUEGO CON EL ID DEL PARAMETRO
router.get('/unirseJuego/:id', (req, res) => {
    controladorDB.agregarJugador(req, res, req.params.id);
});

router.post('/unirseJuego', (req, res) =>{
   res.redirect('/unirseJuego/'+req.body.id)
});

//ELIMINA UN JUEGO CON EL ID DEL PARAMETRO
router.delete('/eliminarJuego/:id', controladorDB.eliminarJuego);


router.get('/salir', (req, res) => {
    res.redirect("/");
});

//EL JUGADOR DADO EL PARAMETRO user_id EN EL JUEGO game_id TOMA UNA CARTA DEL MONTÓN
router.get('/comerCarta/:game_id/:user_id', (req, res) => {
    controladorGame.comerCarta(req, res, req.params.game_id, req.params.user_id);
});

//EL JUGADOR PONE UNA CARTA DE SU BARAJA DADO POR EL PARAMETRO carta
router.get('/usarCarta/:game_id/:user_id/:carta', (req, res) => {
    controladorGame.usarCarta(req, res, req.params.game_id, req.params.user_id, req.params.carta);
});

//EL JUGADOR CAMBIA DE PALO LA BARAJA DADO POR EL PARAMETRO palo
router.post('/usarCarta', (req, res) => {  ///usarCarta/:game_id/:user_id/:palo
    console.log(req.body);
    var card = req.body.card.replace('/','')
    controladorGame.cambioPalo(req, res, req.body.game, req.body.player, req.body.palo, card);
});

router.get('/info', (req, res)=>{
   res.render("../views/info.html") 
});

module.exports = router;
