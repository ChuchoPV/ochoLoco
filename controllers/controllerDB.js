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
    palo: topCard.charAt(0),
    turno: 0
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
        res.redirect('/consultarJuego/'+juego.id+'/'+nuevo.id);
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
      console.log("Juego Actualizado");
    }
  );
};

function getPaloImage(palo){
  var img = '';
  switch (palo) {
    case 'P':
      img = 'picas.png';
      break;
    case 'T':
      img = 'trebol.png';
      break;
    case 'C':
      img = 'corazones.png';
      break;
    case 'D':
      img = 'diamante.png';
      break;
    default:
      break;
  }
  return img;
}

exports.consultarJuego = (req, res) => {
  // Se realiza la ptición a la base de datos.
  Game.find({ id: req.params.id }, (err, juego) => {
    if (err) throw err;
    var juegoNew = juego;
    
    for(var j = 0; j < juegoNew[0].players.length; j++){
      
      if(juegoNew[0].players.length > 1){
        if(req.params.user == juegoNew[0].players[juegoNew[0].turno].id){
          juegoNew[0].comer_link = "/comerCarta/"+juegoNew[0].id  +"/"+ juegoNew[0].players[juegoNew[0].turno].id
          juegoNew[0].comer = "back_card"
        }else{
          juegoNew[0].comer_link = '#'
          juegoNew[0].comer = "none"
        }
      }
      
      for(var i = 0; i < juegoNew[0].players[j].cards.length; i++){
        var palo = getPaloImage(juegoNew[0].players[j].cards[i].charAt(0));
        var cardTopPalo = juegoNew[0].top_card.charAt(0);
        var cardTopNum = juegoNew[0].top_card.charAt(1);
        var cardPalo = juegoNew[0].players[j].cards[i].charAt(0);
        var cardNum = juegoNew[0].players[j].cards[i].charAt(1);
        var playable = 'carta';
        var link;
        if ( (cardPalo == cardTopPalo || cardNum == '8' || cardNum == cardTopNum) && req.params.user == juegoNew[0].players[juegoNew[0].turno].id) {
          playable = 'carta';
          if(juegoNew[0].players[j].cards[i].original == undefined){
            link = "/usarCarta/"+ juegoNew[0].id +"/"+ juegoNew[0].players[j].id +"/"+juegoNew[0].players[j].cards[i];
          }else{
            link = "/usarCarta/"+ juegoNew[0].id +"/"+ juegoNew[0].players[j].id +"/"+juegoNew[0].players[j].cards[i].original;
          }
        }else{
          playable = 'none';
          link = "#";
        }
        var newCard;
        if(juegoNew[0].players.length > 1){
          newCard = {
            original : cardPalo+cardNum,
            value : juegoNew[0].players[j].cards[i].charAt(1),
            foto : palo,
            jugable: playable,
            url: link
          }
        }else{
          newCard = {
            original : cardPalo+cardNum,
            value : juegoNew[0].players[j].cards[i].charAt(1),
            foto : palo,
            jugable: false,
            url: '#'
          }
        }
        juegoNew[0].players[j].cards[i] = newCard;
      }
    }
    juegoNew[0].top_card = getPaloImage(juegoNew[0].top_card.charAt(0)) + " " +juegoNew[0].top_card.charAt(1)
    
    var playerNew;
    juegoNew[0].players.forEach((player) => {
      if(player.id == req.params.user){
        playerNew = player;
      }
    });
    juegoNew[0].players.splice( juegoNew[0].players.indexOf(playerNew), 1);
    juegoNew[0].players.unshift( playerNew );
    juegoNew[0]
    res.render('juego.html', {game: juegoNew[0]});
  });
};

