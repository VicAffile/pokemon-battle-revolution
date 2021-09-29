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
    const donnee = { titre: 'Liste des Pokémons', pokemons: pokemons, types: types, talents: talents, capacites: capacites };
    res.render('index', donnee);
});


app.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemon = pokemons.find(pokemon => pokemon.id === id);
    if (pokemon == undefined) {
        res.status(404).send("Ce Pokémon n'existe pas.");
    }
    affinites(pokemon)
    const donnee = { titre: pokemon.nom, pokemon: pokemon, types: types, types_pokemon: [recherche_api(pokemon.types.a, types), recherche_api(pokemon.types.b, types)], talent: recherche_api(pokemon.talent, talents), capacites: [recherche_api(pokemon.capacites.a, capacites), recherche_api(pokemon.capacites.b, capacites), recherche_api(pokemon.capacites.c, capacites), recherche_api(pokemon.capacites.d, capacites)], affinites: affinites(pokemon) };
    res.render('pokemon', donnee);
});


app.listen(process.env.PORT || 8080);
console.log("L'application tourne.");


function recherche_api(recherche, api) {
    if (recherche == "") {
        return "";
    } else {
        for (let element of api) {
            if (element.nom == recherche) {
                return element;
            }
        }
    }
}


function affinites(pokemon) {
    let affinites = {
        double_faiblesses: [],
        faiblesses: [],
        resistances: [],
        double_resistances: [],
        immunitees: []
    };
    let table_types = [{
            nom: "Acier",
            effet: 1,
        },
        {
            nom: "Combat",
            effet: 1,
        },
        {
            nom: "Dragon",
            effet: 1,
        },
        {
            nom: "Eau",
            effet: 1,
        },
        {
            nom: "Electrik",
            effet: 1,
        },
        {
            nom: "Feu",
            effet: 1,
        },
        {
            nom: "Glace",
            effet: 1,
        },
        {
            nom: "Insecte",
            effet: 1,
        },
        {
            nom: "Normal",
            effet: 1,
        },
        {
            nom: "Plante",
            effet: 1,
        },
        {
            nom: "Poison",
            effet: 1,
        },
        {
            nom: "Psy",
            effet: 1,
        },
        {
            nom: "Roche",
            effet: 1,
        },
        {
            nom: "Sol",
            effet: 1,
        },
        {
            nom: "Spectre",
            effet: 1,
        },
        {
            nom: "Ténèbres",
            effet: 1,
        },
        {
            nom: "Vol",
            effet: 1,
        }
    ];
    table_types = faiblesses(table_types, recherche_api(pokemon.types.a, types).faiblesses);
    table_types = resistances(table_types, recherche_api(pokemon.types.a, types).resistances);
    table_types = immunitees(table_types, recherche_api(pokemon.types.a, types).immunitees);
    if (pokemon.types.b != "") {
        table_types = faiblesses(table_types, recherche_api(pokemon.types.b, types).faiblesses);
        table_types = resistances(table_types, recherche_api(pokemon.types.b, types).resistances);
        table_types = immunitees(table_types, recherche_api(pokemon.types.b, types).immunitees);
    }
    if (pokemon.talent == "Absorb Eau" || pokemon.talent == "Peau Sèche") {
        table_types[3].effet = 0;
    }
    if (pokemon.talent == "Absorb Volt" || pokemon.talent == "Motorisé") {
        table_types[4].effet = 0;
    }
    if (pokemon.talent == "Garde Mystik") {
        for (let i = 0; i < 17; i++) {
            if (table_types[i].effet <= 1) {
                table_types[i].effet = 0;
            }
        }
    }
    if (pokemon.talent == "Isograisse") {
        table_types[5].effet /= 2;
        table_types[6].effet /= 2;
    }
    if (pokemon.talent == "Lévitation") {
        table_types[13].effet = 0;
    }
    if (pokemon.talent == "Torche") {
        table_types[5].effet = 0;
    }
    for (let i = 0; i < 17; i++) {
        if (table_types[i].effet == 4) {
            affinites.double_faiblesses.push(table_types[i].nom);
        } else if (table_types[i].effet == 2) {
            affinites.faiblesses.push(table_types[i].nom);
        } else if (table_types[i].effet == 1 / 2) {
            affinites.resistances.push(table_types[i].nom);
        } else if (table_types[i].effet == 1 / 4) {
            affinites.double_resistances.push(table_types[i].nom);
        } else if (table_types[i].effet == 0) {
            affinites.immunitees.push(table_types[i].nom);
        }
    }
    if (affinites.double_faiblesses == []) {
        affinites.double_faiblesses = "";
    } else if (affinites.faiblesses == []) {
        affinites.faiblesses = "";
    } else if (affinites.resistances == []) {
        affinites.resistances = "";
    } else if (affinites.double_resistances == []) {
        affinites.double_resistances = "";
    } else if (affinites.immunitees == []) {
        affinites.immunitees = "";
    }
    return affinites;
}


function faiblesses(table_types, faiblesses) {
    for (let faiblesse of faiblesses) {
        switch (faiblesse) {
            case "Acier":
                table_types[0].effet *= 2;
                break;
            case "Combat":
                table_types[1].effet *= 2;
                break;
            case "Dragon":
                table_types[2].effet *= 2;
                break;
            case "Eau":
                table_types[3].effet *= 2;
                break;
            case "Electrik":
                table_types[4].effet *= 2;
                break;
            case "Feu":
                table_types[5].effet *= 2;
                break;
            case "Glace":
                table_types[6].effet *= 2;
                break;
            case "Insecte":
                table_types[7].effet *= 2;
                break;
            case "Normal":
                table_types[8].effet *= 2;
                break;
            case "Plante":
                table_types[9].effet *= 2;
                break;
            case "Poison":
                table_types[10].effet *= 2;
                break;
            case "Psy":
                table_types[11].effet *= 2;
                break;
            case "Roche":
                table_types[12].effet *= 2;
                break;
            case "Sol":
                table_types[13].effet *= 2;
                break;
            case "Spectre":
                table_types[14].effet *= 2;
                break;
            case "Ténèbres":
                table_types[15].effet *= 2;
                break;
            case "Vol":
                table_types[16].effet *= 2;
                break;
        }
    }
    return table_types;
}


function resistances(table_types, resistances) {
    for (let resistance of resistances) {
        switch (resistance) {
            case "Acier":
                table_types[0].effet /= 2;
                break;
            case "Combat":
                table_types[1].effet /= 2;
                break;
            case "Dragon":
                table_types[2].effet /= 2;
                break;
            case "Eau":
                table_types[3].effet /= 2;
                break;
            case "Electrik":
                table_types[4].effet /= 2;
                break;
            case "Feu":
                table_types[5].effet /= 2;
                break;
            case "Glace":
                table_types[6].effet /= 2;
                break;
            case "Insecte":
                table_types[7].effet /= 2;
                break;
            case "Normal":
                table_types[8].effet /= 2;
                break;
            case "Plante":
                table_types[9].effet /= 2;
                break;
            case "Poison":
                table_types[10].effet /= 2;
                break;
            case "Psy":
                table_types[11].effet /= 2;
                break;
            case "Roche":
                table_types[12].effet /= 2;
                break;
            case "Sol":
                table_types[13].effet /= 2;
                break;
            case "Spectre":
                table_types[14].effet /= 2;
                break;
            case "Ténèbres":
                table_types[15].effet /= 2;
                break;
            case "Vol":
                table_types[16].effet /= 2;
                break;
        }
    }
    return table_types;
}


function immunitees(table_types, immunitees) {
    for (let immunitee of immunitees) {
        switch (immunitee) {
            case "Acier":
                table_types[0].effet = 0;
                break;
            case "Combat":
                table_types[1].effet = 0;
                break;
            case "Dragon":
                table_types[2].effet = 0;
                break;
            case "Eau":
                table_types[3].effet = 0;
                break;
            case "Electrik":
                table_types[4].effet = 0;
                break;
            case "Feu":
                table_types[5].effet = 0;
                break;
            case "Glace":
                table_types[6].effet = 0;
                break;
            case "Insecte":
                table_types[7].effet = 0;
                break;
            case "Normal":
                table_types[8].effet = 0;
                break;
            case "Plante":
                table_types[9].effet = 0;
                break;
            case "Poison":
                table_types[10].effet = 0;
                break;
            case "Psy":
                table_types[11].effet = 0;
                break;
            case "Roche":
                table_types[12].effet = 0;
                break;
            case "Sol":
                table_types[13].effet = 0;
                break;
            case "Spectre":
                table_types[14].effet = 0;
                break;
            case "Ténèbres":
                table_types[15].effet = 0;
                break;
            case "Vol":
                table_types[16].effet = 0;
                break;
        }
    }
    return table_types;
}