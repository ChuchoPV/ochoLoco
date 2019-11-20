const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var MarcaSchema = new Schema({
    _id:{type: Number, required: true},
    nombre:{type: String, required:true, max:100},
    establecimiento:{type: Number},  
    origen:{type:String, required: true},
    url:{type: String}
});

module.exports = mongoose.model('Marca',MarcaSchema);