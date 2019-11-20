exports.prueba = (req, res) => {
    res.send('Esto es una prueba');
}

exports.menuPrincipal = (req, res) => {
    res.send('Menu Principal');
}

exports.nuevoJuego = (req, res) => {
    res.send('Nuevo Juego');
}

exports.unirseJuego = (req, res) => {
    res.send('Unirse a un Juego');
}

exports.salir = (req, res) => {
    res.send('Salir')
}
