const express = require('express');
const swig = require('swig');
const path = require('path');
const bodyParser = require('body-parser');
const pokemons = require('./json/pokemons.json');


let app = express();
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());


app.engine('html', swig.renderFile);


app.set('view engine', 'html');
app.set('views', __dirname + '/views');


app.get('/', function(req, res) {
    console.log(pokemons);
    let donnee = { titre: 'Liste des Pokémons', pokemons: pokemons };
    res.render('index', donnee);
});


app.listen(8080);
console.log("L'application tourne.");