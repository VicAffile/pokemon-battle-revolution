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
    let liste = pokemon.parentNode.getElementsByClassName('case');
    for (let i = 0; i < liste.length; i++) {
        if (liste[i] == pokemon) {
            let equipe = JSON.parse(localStorage.getItem('mon_equipe_pokemon_battle_revolution'));
            if (non_choisi(i + 1)) {
                for (let membre of equipe) {
                    if (membre[0] == 0) {
                        membre[0] = i + 1;
                        membre[1] = pokemon.querySelector('img').src;
                        localStorage.removeItem('mon_equipe_pokemon_battle_revolution');
                        localStorage.setItem('mon_equipe_pokemon_battle_revolution', JSON.stringify(equipe));
                        afficher_equipe();
                        return;
                    }
                }
            }
        }
    }
    console.log("Tu as déjà six Pokémon.")
}

function ajouter_detail(bouton) {
    let equipe = JSON.parse(localStorage.getItem('mon_equipe_pokemon_battle_revolution'));
    const url = document.location.href;
    const id = url.substring(url.lastIndexOf("/") + 1);
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
    console.log("Tu as déjà six Pokémon.")
}


function supprimer(bouton) {
    let pokemon = bouton.parentNode.parentNode;
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
    pokemon.childNodes[1].classList.replace('sprite', 'sprite-pokeball');
    pokemon.childNodes[1].innerHTML = '<img src="/images/ressources/pokeball.png" alt="Sprite du Pokémon">';
    pokemon.childNodes[3].classList.replace('boutons', 'boutons-pokeball');
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
    id.childNodes[1].classList.replace('sprite-pokeball', 'sprite');
    id.childNodes[1].innerHTML = '<img src="' + equipe[index][1] + '" alt="Sprite du Pokémon">';
    id.childNodes[3].classList.replace('boutons-pokeball', 'boutons');
    id.childNodes[3].innerHTML = '<a href="/' + equipe[index][0] + '"><button>Voir</button></a> <button onclick="supprimer(this)">Supprimer</button>';
}


function non_choisi(id) {
    let equipe = JSON.parse(localStorage.getItem('mon_equipe_pokemon_battle_revolution'));
    for (let pokemon of equipe) {
        if (pokemon[0] == id) {
            console.log("Tu as déjà choisi ce Pokémon.")
            return false;
        }
    }
    return true;
}