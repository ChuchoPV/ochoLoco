const Game = require("../models/gameSchema");
const Player = require("../models/playerSchema");
const Shuffle = require("./card_shuffle")
const GameController = require("./controllerGame");

exports.comerCarta = (game, player) => {
    let juego = GameController.consultarJuego(game);
    let jugadores = juego.players;
    let baraja = juego.deck_cards;
    for (var i = 0; i < jugadores.length; i++) {
        // console.log(jugadores[i]);
        if (jugadores[i] == player) {
            let cartaComida = Shuffle.obtener_carta_siguiente(jugadores[i].cards, baraja);
            jugadores[i].cards.push(cartaComida[0]);
            baraja = cartaComida[1];
        }
        GameController.actualizarJuego(game); // Debe enviar un body (URL)
    };
};

exports.usarCarta = (game, player, card) => {
    let juego = GameController.consultarJuego(game);
    let jugadores = juego.players;
    let cardPalo = card.charAt(0);
    let cardNum = card.substr(1);
    let cardTopPalo = juego.top_card.charAt(0);
    let cardTopNum = juego.top_card.substr(1);
    for (var i = 0; i < jugadores.length; i++) {
        // console.log(jugadores[i]);
        if (jugadores[i] == player) {
            if (cardPalo == cardTopPalo || cardNum == 8 || cardNum == cardTopNum) {
                juego.top_card = card;
                for (var j = 0; j < jugadores[i].cards.length; j++) {
                    if (jugadores[i].cards[j] == card) {
                        jugadores[i].cards.remove(j);
                        break;
                    }
                }
            }
        }
        GameController.actualizarJuego(game); // Debe enviar un body (URL)
    };
};

exports.cambioPalo = (game, player, palo) => {
    let juego = GameController.consultarJuego(game);
    let jugadores = juego.players;
    let cardTopPalo = juego.top_card.charAt(0);
    let cardTopNum = juego.top_card.substr(1);
    for (var i = 0; i < jugadores.length; i++) {
        // console.log(jugadores[i]);
        if (jugadores[i] == player) {
            if (palo == cardTopPalo || cardTopNum == 8) {
                juego.palo = palo;
            };
        };
        GameController.actualizarJuego(game); // Debe enviar un body (URL)
    };
};
