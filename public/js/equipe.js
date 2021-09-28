if (localStorage.getItem('mon_equipe_pokemon_battle_revolution') == undefined) {
    localStorage.setItem('mon_equipe_pokemon_battle_revolution', JSON.stringify([
        [0, ""],
        [0, ""],
        [0, ""],
        [0, ""],
        [0, ""],
        [0, ""]
    ]));
} else {
    afficher_equipe();
}


function ajouter_liste(bouton) {
    let pokemon = bouton.parentNode.parentNode;
    let equipe = JSON.parse(localStorage.getItem('mon_equipe_pokemon_battle_revolution'));
    let id = parseInt(pokemon.dataset.id);
    if (equipe[0][0] == 0 || equipe[1][0] == 0 || equipe[2][0] == 0 || equipe[3][0] == 0 || equipe[4][0] == 0 || equipe[5][0] == 0) {
        if (non_choisi(id)) {
            for (let membre of equipe) {
                if (membre[0] == 0) {
                    membre[0] = id;
                    membre[1] = pokemon.querySelector('img').src;
                    localStorage.removeItem('mon_equipe_pokemon_battle_revolution');
                    localStorage.setItem('mon_equipe_pokemon_battle_revolution', JSON.stringify(equipe));
                    afficher_equipe();
                    return;
                }
            }
        }
    } else {
        console.log("Tu as déjà six Pokémon.");
    }
}

function ajouter_detail(bouton) {
    let equipe = JSON.parse(localStorage.getItem('mon_equipe_pokemon_battle_revolution'));
    const url = document.location.href;
    const id = url.substring(url.lastIndexOf("/") + 1);
    if (equipe[0][0] == 0 || equipe[1][0] == 0 || equipe[2][0] == 0 || equipe[3][0] == 0 || equipe[4][0] == 0 || equipe[5][0] == 0) {
        if (non_choisi(id)) {
            for (let membre of equipe) {
                if (membre[0] == 0) {
                    membre[0] = id;
                    membre[1] = document.getElementById('sprite').querySelector('img').src;
                    localStorage.removeItem('mon_equipe_pokemon_battle_revolution');
                    localStorage.setItem('mon_equipe_pokemon_battle_revolution', JSON.stringify(equipe));
                    afficher_equipe();
                    return;
                }
            }
        }
    } else {
        console.log("Tu as déjà six Pokémon.");
    }
}


function supprimer(bouton) {
    let pokemon = bouton.parentNode;
    let equipe = JSON.parse(localStorage.getItem('mon_equipe_pokemon_battle_revolution'));
    switch (pokemon.id) {
        case 'un':
            equipe[0] = [0, ""];
            break;
        case 'deux':
            equipe[1] = [0, ""];
            break;
        case 'trois':
            equipe[2] = [0, ""];
            break;
        case 'quatre':
            equipe[3] = [0, ""];
            break;
        case 'cinq':
            equipe[4] = [0, ""];
            break;
        case 'six':
            equipe[5] = [0, ""];
            break;
        default:
            console.log("L'id n'est pas présent");
    }
    localStorage.removeItem('mon_equipe_pokemon_battle_revolution');
    localStorage.setItem('mon_equipe_pokemon_battle_revolution', JSON.stringify(equipe));
    pokemon.querySelector('div').classList.replace('sprite', 'sprite-pokeball');
    pokemon.querySelector('img').src = "/images/ressources/pokeball.png";
    pokemon.querySelector('img').alt = "Sprite d'une Poké Ball";
    pokemon.querySelector('a').classList.replace('boutons', 'boutons-pokeball');
    pokemon.querySelector('a').href = "";
    pokemon.querySelectorAll('button')[1].classList.replace('boutons', 'boutons-pokeball');
}


function afficher_equipe() {
    let equipe = JSON.parse(localStorage.getItem('mon_equipe_pokemon_battle_revolution'));
    if (equipe[0][0] != 0) {
        afficher_membre(0, document.getElementById('un'));
    }
    if (equipe[1][0] != 0) {
        afficher_membre(1, document.getElementById('deux'));
    }
    if (equipe[2][0] != 0) {
        afficher_membre(2, document.getElementById('trois'));
    }
    if (equipe[3][0] != 0) {
        afficher_membre(3, document.getElementById('quatre'));
    }
    if (equipe[4][0] != 0) {
        afficher_membre(4, document.getElementById('cinq'));
    }
    if (equipe[5][0] != 0) {
        afficher_membre(5, document.getElementById('six'));
    }
}


function afficher_membre(index, id) {
    let equipe = JSON.parse(localStorage.getItem('mon_equipe_pokemon_battle_revolution'));
    id.querySelector('div').classList.replace('sprite-pokeball', 'sprite');
    id.querySelector('img').src = equipe[index][1];
    id.querySelector('img').alt = "Sprite du Pokémon";
    id.querySelector('a').classList.replace('boutons-pokeball', 'boutons');
    id.querySelector('a').href = "/" + equipe[index][0];
    id.querySelectorAll('button')[1].classList.replace('boutons-pokeball', 'boutons');
}


function non_choisi(id) {
    let equipe = JSON.parse(localStorage.getItem('mon_equipe_pokemon_battle_revolution'));
    for (let pokemon of equipe) {
        if (pokemon[0] == id) {
            console.log("Tu as déjà choisi ce Pokémon.");
            return false;
        }
    }
    return true;
}