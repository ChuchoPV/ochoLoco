const express = require("express");
const app = express();
const menuPrincipal = require('./routes/menuPrincipal');
const bodyParser = require("body-parser");

//Configuracion de mongoose
const mongoose = require("mongoose");
const db_url = 'mongodb://localhost/dbOchoLoco'
mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, "Error en la conexión"))

app.use( express.static( "public" ) );
app.use(express.json());
app.engine('html', require("ejs").renderFile);
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', menuPrincipal);

app.listen(process.env.PORT, () => {
    console.log("Server running on port: "+process.env.PORT);
})
