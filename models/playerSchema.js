const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var PlayerSchema = new Schema({
  id: { type: String, required: true},
  cards: { type : Array , "default" : []}
});

module.exports = mongoose.model("Player", PlayerSchema);

// GAME, PLAYERS, ID, CARDS SET