const all_cartes = document.querySelectorAll('.case');


document.querySelector('#sexe').addEventListener('change', filtrer);
document.querySelector('#type1').addEventListener('change', filtrer);
document.querySelector('#type2').addEventListener('change', filtrer);
document.querySelector('#talent').addEventListener('change', filtrer);
document.querySelector('#capacite').addEventListener('change', filtrer);
document.querySelector('#generation').addEventListener('change', filtrer);
document.querySelector('#categorie').addEventListener('change', filtrer);


if (localStorage.getItem('filtres_pokemon_battle_revolution') != undefined) {
    let parametres = JSON.parse(localStorage.getItem('filtres_pokemon_battle_revolution'));
    if (parametres[0] == 1) {
        document.getElementById('filtre').querySelector('button').classList.toggle('save');
        document.querySelector('#sexe').value = parametres[1];
        document.querySelector('#type1').value = parametres[2][0];
        document.querySelector('#type2').value = parametres[2][1]
        document.querySelector('#talent').value = parametres[3];
        document.querySelector('#capacite').value = parametres[4];
        document.querySelector('#generation').value = parametres[5];
        document.querySelector('#categorie').value = parametres[6];
        filtrer();
    }
}


function effacer() {
    let cartes = document.querySelectorAll('.case');
    for (let carte of cartes) {
        liste.removeChild(carte);
    }
}


function filtrer() {
    let cartes = Array.from(all_cartes);
    cartes = categorie(generation(capacite(talent(types(sexe(cartes))))));
    effacer();
    for (let carte of cartes) {
        liste.appendChild(carte);
    }
}


function reset() {
    document.querySelector('#sexe').value = 'Tous';
    document.querySelector('#type1').value = 'Tous';
    document.querySelector('#type2').value = 'Tous';
    document.querySelector('#talent').value = 'Tous';
    document.querySelector('#capacite').value = 'Toutes';
    document.querySelector('#generation').value = 'Toutes';
    document.querySelector('#categorie').value = 'Toutes';
    filtrer();
}


function sexe(cartes) {
    const sexe = document.getElementById('sexe').value;
    if (sexe != 'Tous') {
        for (let i = 0; i < cartes.length; i++) {
            if (cartes[i].dataset.sexe != sexe) {
                cartes.splice(i, 1);
                i--;
            }
        }
    }
    return cartes;
}


function types(cartes) {
    const type1 = document.getElementById('type1').value;
    const type2 = document.getElementById('type2').value;
    if (type1 != 'Tous') {
        for (let i = 0; i < cartes.length; i++) {
            if (cartes[i].dataset.types.split(" ")[0] != type1 && cartes[i].dataset.types.split(" ")[1] != type1) {
                cartes.splice(i, 1);
                i--;
            }
        }
    }
    if (type2 != 'Tous') {
        if (type2 == 'Aucun' || type1 == type2) {
            for (let i = 0; i < cartes.length; i++) {
                if (cartes[i].dataset.types.split(" ")[1] != undefined) {
                    cartes.splice(i, 1);
                    i--;
                }
            }
        } else {
            for (let i = 0; i < cartes.length; i++) {
                if (cartes[i].dataset.types.split(" ")[0] != type2 && cartes[i].dataset.types.split(" ")[1] != type2) {
                    cartes.splice(i, 1);
                    i--;
                }
            }
        }
    }
    return cartes;
}


function talent(cartes) {
    const talent = document.getElementById('talent').value;
    if (talent != 'Tous') {
        for (let i = 0; i < cartes.length; i++) {
            if (cartes[i].dataset.talent != talent) {
                cartes.splice(i, 1);
                i--;
            }
        }
    }
    return cartes;
}


function capacite(cartes) {
    const capacite = document.getElementById('capacite').value;
    if (capacite != 'Toutes') {
        for (let i = 0; i < cartes.length; i++) {
            const movepool = cartes[i].dataset.capacites.split(",");
            if (movepool[0] != capacite && movepool[1] != capacite && movepool[2] != capacite && movepool[3] != capacite) {
                cartes.splice(i, 1);
                i--;
            }
        }
    }
    return cartes;
}


function generation(cartes) {
    const generation = document.getElementById('generation').value;
    if (generation != 'Toutes') {
        for (let i = 0; i < cartes.length; i++) {
            if (cartes[i].dataset.generation != generation) {
                cartes.splice(i, 1);
                i--;
            }
        }
    }
    return cartes;
}


function categorie(cartes) {
    const categorie = document.getElementById('categorie').value;
    if (categorie != 'Toutes') {
        for (let i = 0; i < cartes.length; i++) {
            if (cartes[i].dataset.categorie != categorie) {
                cartes.splice(i, 1);
                i--;
            }
        }
    }
    return cartes;
}