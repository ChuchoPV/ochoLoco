const controladorDB = require("./controllerDB");

exports.prueba = (req, res) => {
    res.send('Esto es una prueba');
}

exports.menuPrincipal = (req, res) => {
    res.send('Menu Principal');
}

exports.nuevoJuego = (req, res) => {
    controladorDB.crearJuego(req,res);
}

exports.unirseJuego = (req, res) => {
    controladorDB.agregarJugador(req, res, req.params.id)
}

exports.salir = (req, res) => {
    res.send('Salir')
}
