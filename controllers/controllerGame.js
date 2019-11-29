const Game = require("../models/gameSchema");
const Player = require("../models/playerSchema");
const Shuffle = require("./card_shuffle")
const GameController = require("./controllerDB");

// LISTO
exports.comerCarta = (req, res, game, player) => {
    Game.find({ id: game }, (err, juego_arr) => {
        if (err) throw err;
        let juego = juego_arr[0];
        let id = juego.id;
        let jugadores = juego.players;
        let baraja = juego.deck_cards;
        for (var i = 0; i < jugadores.length; i++) {
            // console.log(jugadores[i]);
            if (jugadores[i].id == player) {
                let cartaComida = Shuffle.obtener_carta_siguiente(jugadores[i], baraja);
                jugadores[i].cards.push(cartaComida[0]);
                baraja = cartaComida[1];
            }
            juego.players = jugadores;
            GameController.actualizarJuego(id, juego); // Debe enviar un body (URL)
        };
        res.redirect('/consultarJuego/' + game + '/' + player);
    });
};

// LISTO
exports.usarCarta = (req, res, game, player, card) => {
    Game.find({ id: game }, (err, juego_arr) => {
        if (err) throw err;
        let juego = juego_arr[0];
        let id = juego.id;
        let jugadores = juego.players;
        let cardPalo = card.charAt(0);
        let cardNum = card.substr(1);
        let cardTopPalo = juego.top_card.charAt(0);
        let cardTopNum = juego.top_card.substr(1);
        for (var i = 0; i < jugadores.length; i++) {
            // console.log(jugadores[i]);
            if (jugadores[i].id == player) {
                if (cardPalo == cardTopPalo || cardNum == '8' || cardNum == cardTopNum) {
                    juego.top_card = card;
                    for (var j = 0; j < jugadores[i].cards.length; j++) {
                        if (jugadores[i].cards[j] == card) {
                            jugadores[i].cards.splice(j, 1);
                        }
                    }
                }
                juego.turno += 1;
                if (juego.turno >= jugadores.length) {
                    juego.turno = 0;
                }
            }
            juego.players = jugadores;
            GameController.actualizarJuego(id, juego); // Debe enviar un body (URL
        }
        res.redirect('/consultarJuego/' + game + '/' + player);
    });
}

// 
exports.cambioPalo = (req, res, game, player, palo) => {
    Game.find({ id: game }, (err, juego_arr) => {
        if (err) throw err;
        let juego = juego_arr[0];
        let id = juego.id;
        juego.palo = palo;
        GameController.actualizarJuego(id, juego); // Debe enviar un body (URL)
        res.redirect('/consultarJuego/'+ game +'/'+player);
    });
};


exports.contarPuntos = (game, player) => {
    Game.find({ id: game }, (err, juego_arr) => {
        if (err) throw err;
        let juego = juego_arr[0];
        let id = juego.id;
        let jugadores = juego.players;
        let puntos = 0;
        for (var i = 0; i < jugadores.length; i++) {
            if (jugadores[i].id == player) {
                for (var j = 0; j < jugadores[i].cards.length; j++) {
                    if (jugadores[i].cards[j].substr(1) == "J" || jugadores[i].cards[j].substr(1) == "Q" || jugadores[i].cards[j].substr(1) == "K") {
                        puntos += 10;
                    }
                    else {
                        puntos += parseInt(jugadores[i].cards[j].substr(1));
                    }
                };
                GameController.actualizarJuego(id, juego); // Debe enviar un body (URL)
            };
        };
    });
};

exports.hayGanador = (game) => {
    Game.find({ id: game }, (err, juego_arr) => {
        if (err) throw err;
        let juego = juego_arr[0];
        let id = juego.id;
        let jugadores = juego.players;
        let ganador = null;
        for (var i = 0; i < jugadores.length; i++) {
            if (jugadores[i].cards.length == 0) {
                ganador = jugadores[i].id;
            };
            GameController.actualizarJuego(id, juego); // Debe enviar un body (URL)
        };
    });
};
