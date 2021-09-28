const all_cartes = document.querySelectorAll('.case');


function effacer() {
    let cartes = document.querySelectorAll('.case');
    for (let carte of cartes) {
        liste.removeChild(carte);
    }
}


function filtrer() {
    let cartes = Array.from(all_cartes);
    cartes = talent(types(sexe(cartes)));
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


document.querySelector('#sexe').addEventListener('change', filtrer);
document.querySelector('#type1').addEventListener('change', filtrer);
document.querySelector('#type2').addEventListener('change', filtrer);
document.querySelector('#talent').addEventListener('change', filtrer);