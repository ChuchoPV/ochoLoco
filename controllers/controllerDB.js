const Game = require("../models/gameSchema");
const Player = require("../models/playerSchema");
const GameController = require('./controllerGame');
var crypto = require('crypto');
var base64url = require('base64url');
const Shuffle = require("./card_shuffle");

function randomString() {
  return base64url(crypto.randomBytes(5));
}

function agregarCartasIniciales(cartas_disponibles){
  var player_cards = [];
  //console.log(cartas_disponibles);
  for(var i = 1; i <= 5; i++){
    var values = Shuffle.obtener_carta_siguiente([{cards: player_cards}], cartas_disponibles);
    player_cards.push(values[0]);
    cartas_disponibles = values[1];
    //console.log(cartas_disponibles);
  }
  return [cartas_disponibles, player_cards];
}

exports.crearJuego = (req, res) => {
  var cards = ["PA", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "P10", "PJ", "PQ", "PK", "CA", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10", "CJ", "CQ", "CK", "DA", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10", "DJ", "DQ", "DK", "TA", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "TJ", "TQ", "TK"]
  var value = Math.floor((Math.random() * cards.length));
  var topCard = cards[value];
  cards.splice(value, 1)
  // Creación de un documento de tipo Marca. La información se obtiene del JSON que manda el cliente.
  var game = new Game({
    id: randomString(),
    players: [],
    deck_cards: cards,
    top_card: topCard,
    palo: topCard.charAt(0)
  });
  // Guardar la información en la base de datos.
  game.save(err => {
    if (err) throw err;
    this.agregarJugador(req, res, game.id);
  });
};

exports.eliminarJuego = (req, res) => {
  // Se obtiene el id del url para eliminarlo después.
  Game.findOneAndRemove(req.params.id, err => {
    {
      id: req.params.id;
    }
    if (err) throw err;
    res.send("Eliminado");
  });
};

exports.agregarJugador = (req, res, idJuego) => {
  var id_juego;
  if (idJuego != undefined) {
    id_juego = idJuego;
  }
  else {
    id_juego = req.params.id;
  }
  // Se obtiene el id del juego del url para eliminarlo después.
  Game.find({ id: id_juego }, (err, juego_list) => {
    if (err) throw err;
    //usar marca
    var juego = juego_list[0];
    var jugadores = juego["players"];
    var cards = juego["deck_cards"];
    var cartas = agregarCartasIniciales(cards);
    var nuevo = new Player({
      id: randomString(),
      cards: cartas[1]
    });
    jugadores.push(nuevo);
    juego["players"] = jugadores;
    juego["deck_cards"] = cartas[0];
    var id = juego["id"];
    Game.updateOne(
      // Se obtiene el nombre de la marca del url para cambiar sus datos después.
      { id: id }, { $set: juego },
      (err, juegoN) => {
        if (err) throw err;
        res.send(juego);
      }
    );
  });
};

exports.actualizarJuegoWeb = (req, res) => {
  // Se obtiene el id del juego del url para eliminarlo después.
  //console.log(req.params.id);
  Game.updateOne(
    // Se obtiene el nombre de la marca del url para cambiar sus datos después.
    { id: req.params.id }, { $set: req.body },
    (err, juego) => {
      if (err) throw err;
      res.send(juego);
    }
  );
};

exports.actualizarJuego = (game_id, game) => {
  // Se obtiene el id del juego del url para eliminarlo después.
  //console.log(game_id);
  Game.updateOne(
    // Se obtiene el nombre de la marca del url para cambiar sus datos después.
    { id: game_id }, { $set: game },
    (err, juego) => {
      if (err) throw err;
      //console.log("Juego Actualizado");
    }
  );
};

exports.consultarJuego = (req, res) => {
  // Se realiza la ptición a la base de datos.
  Game.find({ id: req.params.id }, (err, marca) => {
    if (err) throw err;
    res.send(marca);
  });
};

