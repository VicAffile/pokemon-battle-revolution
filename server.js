const express = require('express');
const swig = require('swig');
const path = require('path');
const bodyParser = require('body-parser');
const capacites = require('./json/capacites.json');
const pokemons = require('./json/pokemons.json');
const talents = require('./json/talents.json');
const types = require('./json/types.json');


let app = express();
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());


app.engine('html', swig.renderFile);


app.set('view engine', 'html');
app.set('views', __dirname + '/views');


app.get('/', (req, res) => {
    const donnee = { titre: 'Liste des Pokémons', pokemons: pokemons };
    res.render('index', donnee);
});

app.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemon = pokemons.find(pokemon => pokemon.id === id);
    if (pokemon == undefined) {
        res.status(404).send("Ce Pokémon n'existe pas.");
    }
    const donnee = { titre: pokemon.nom, pokemon: pokemon, types: types, talents: talents, capacites: capacites };
    res.render('pokemon', donnee);
});


app.listen(8080);
console.log("L'application tourne.");