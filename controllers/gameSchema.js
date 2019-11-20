const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var GameSchema = new Schema({
  id: { type: Number, required: true},
  games: { type : Array , "default" : []},
  deck_cards: { type : Array , "default" : []},
  top_card: { type: String }
});

module.exports = mongoose.model("Game", GameSchema);