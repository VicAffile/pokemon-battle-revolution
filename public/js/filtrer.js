const all_cartes = document.querySelectorAll('.case');


if (localStorage.getItem('filtres_pokemon_battle_revolution') != undefined) {
    let parametres = JSON.parse(localStorage.getItem('filtres_pokemon_battle_revolution'));
    document.querySelector('#sexe').value = parametres[0];
    document.querySelector('#type1').value = parametres[1][0];
    document.querySelector('#type2').value = parametres[1][1]
    document.querySelector('#talent').value = parametres[2];
    document.querySelector('#capacite').value = parametres[3];
    filtrer();
}


function effacer() {
    let cartes = document.querySelectorAll('.case');
    for (let carte of cartes) {
        liste.removeChild(carte);
    }
}


function filtrer() {
    let cartes = Array.from(all_cartes);
    cartes = capacite(talent(types(sexe(cartes))));
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
    document.querySelector('#capacite').value = 'Tous';
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
    if (capacite != 'Tous') {
        for (let i = 0; i < cartes.length; i++) {
            const movepool = cartes[i].dataset.capacites.split(",");
            console.log(movepool)
            if (movepool[0] != capacite && movepool[1] != capacite && movepool[2] != capacite && movepool[3] != capacite) {
                cartes.splice(i, 1);
                i--;
            }
        }
    }
    return cartes;
}


document.querySelector('#sexe').addEventListener('change', filtrer);
document.querySelector('#type1').addEventListener('change', filtrer);
document.querySelector('#type2').addEventListener('change', filtrer);
document.querySelector('#talent').addEventListener('change', filtrer);
document.querySelector('#capacite').addEventListener('change', filtrer);