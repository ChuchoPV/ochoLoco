const Game = require("../models/gameSchema");
const Player = require("../models/playerSchema");
var crypto = require('crypto');
var base64url = require('base64url');

function randomString() {
  return base64url(crypto.randomBytes(30));
}

exports.crearJuego = (req, res) => {
  // Creación de un documento de tipo Marca. La información se obtiene del JSON que manda el cliente.
  var player = new Player({
     id: randomString(),
  cards: ["PK", "PA"]
  });
  
  var game = new Game({
      id: randomString(),
      players: [player],
      deck_cards: ["P1", "PQ"],
      top_card: "CA"
  });

  // Guardar la información en la base de datos.
  game.save(err => {
    if (err) throw err;
    res.send("algo :)");
  });
};
