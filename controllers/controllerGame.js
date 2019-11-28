const Game = require("../models/gameSchema");
const Player = require("../models/playerSchema");
const Shuffle = require("./card_shuffle")
const GameController = require("./controllerDB");

// LISTO
exports.comerCarta = (req, res, game, player) => {
    Game.find({ id: game }, (err, juego_arr) => {
        if (err) throw err;
        let juego = juego_arr[0];
        //console.log(juego);
        let id = juego.id;
        let jugadores = juego.players;
        let baraja = juego.deck_cards;
        console.log(jugadores);
        console.log(baraja);
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
        res.send(game);
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
        console.log(cardPalo);
        console.log(cardNum);
        console.log(cardTopPalo);
        console.log(cardTopNum);
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
            }
            juego.players = jugadores;
            GameController.actualizarJuego(id, juego); // Debe enviar un body (URL)
        }
        res.send(juego);
    });
}

// 
exports.cambioPalo = (game, player, palo) => {
    let juego = GameController.consultarJuego(game);
    let id = juego.id;
    let jugadores = juego.players;
    let cardTopPalo = juego.top_card.charAt(0);
    let cardTopNum = juego.top_card.substr(1);
    for (var i = 0; i < jugadores.length; i++) {
        // console.log(jugadores[i]);
        if (jugadores[i] == player) {
            if (palo == cardTopPalo && cardTopNum == 8) {
                juego.palo = palo;
            };
        };
        GameController.actualizarJuego(id, game); // Debe enviar un body (URL)
    };
};
