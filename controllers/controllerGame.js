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
            juego.deck_cards = baraja;
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
                if (cardPalo == juego.palo || cardNum == '8' || cardNum == cardTopNum) {
                    juego.top_card = card;
                    juego.palo = cardPalo;
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

exports.usarCartaInt = (game, player, card) => {
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
                if (cardPalo == juego.palo || cardNum == '8' || cardNum == cardTopNum) {
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
    });
}

// 
exports.cambioPalo = (req, res, game, player, palo, card) => {
    Game.find({ id: game }, (err, juego_arr) => {
        if (err) throw err;
        let juego = juego_arr[0];
        let id = juego.id;
        juego.top_card = card;
        var jugadores = juego.players;
        for (var i = 0; i < jugadores.length; i++) {
            if (jugadores[i].id == player) {
                for (var j = 0; j < jugadores[i].cards.length; j++) {
                    if (jugadores[i].cards[j] == card) {
                        jugadores[i].cards.splice(j, 1);
                    }
                }
                juego.turno += 1;
                if (juego.turno >= jugadores.length) {
                    juego.turno = 0;
                }
            }
            juego.players = jugadores;
        }
        juego.palo = palo;
        GameController.actualizarJuego(id, juego); // Debe enviar un body (URL)
        res.redirect('/consultarJuego/' + game + '/' + player);
    });
};


exports.contarPuntos = (game, player) => {
    Game.find({ id: game }, (err, juego_arr) => {
        if (err) throw err;
        var juego = juego_arr[0];
        var id = juego.id;
        var jugadores = juego.players;
        var puntoS = 0;
        for (var i = 0; i < jugadores.length; i++) {
            for (var j = 0; j < jugadores[i].cards.length; j++) {
                if(jugadores[i].cards[j] != null){
                    if (jugadores[i].cards[j].charAt(1) == "J" || jugadores[i].cards[j].charAt(1) == "Q" || jugadores[i].cards[j].charAt(1) == "K") {
                        puntoS = puntoS + 10;
                    }
                    else if(jugadores[i].cards[j].charAt(1) == "A"){
                        puntoS += 1;
                    }
                    else {
                        puntoS = puntoS + parseInt(jugadores[i].cards[j].charAt(1));
                    }
                }
            };
            juego.players[i].puntos = puntoS;
        };
        GameController.actualizarJuego(id, juego);
    });
    Game.find({ id: game }, (err, juego_arr) => {
        if (err) throw err;
        let juego = juego_arr[0];
        let id = juego.id;
        let jugadores = juego.players;
        let puntos = 0;
        for (var i = 0; i < jugadores.length; i++) {
            let ganador = null;
            if (juego.players[0].puntos > juego.players[1].puntos) {
                ganador = '0';
                juego.ganador = '0'
            }
            else {
                ganador = '1';
                juego.ganador = '1'
            }
        };
        GameController.actualizarJuego(id, juego);
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
                juego.ganador = ganador;
            };
            GameController.actualizarJuego(id, juego); // Debe enviar un body (URL)
        };
    });
};
