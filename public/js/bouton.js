const bouton = document.getElementById('bouton');
bouton.addEventListener('click', () => {
    bouton.classList.toggle('afficher');
    document.getElementById('filtre').classList.toggle('afficher');
});


window.addEventListener('unload', () => {
    if (localStorage.getItem('filtres_pokemon_battle_revolution') == undefined) {
        localStorage.setItem('filtres_pokemon_battle_revolution', JSON.stringify([
            save_active(),
            document.querySelector('#sexe').value, [document.querySelector('#type1').value, document.querySelector('#type2').value],
            document.querySelector('#talent').value,
            document.querySelector('#capacite').value
        ]));
    } else {
        let parametres = JSON.parse(localStorage.getItem('filtres_pokemon_battle_revolution'));
        parametres[0] = save_active();
        parametres[1] = document.querySelector('#sexe').value;
        parametres[2] = [document.querySelector('#type1').value, document.querySelector('#type2').value];
        parametres[3] = document.querySelector('#talent').value;
        parametres[4] = document.querySelector('#capacite').value;
        localStorage.removeItem('filtres_pokemon_battle_revolution');
        localStorage.setItem('filtres_pokemon_battle_revolution', JSON.stringify(parametres));
    }
});


function save(bouton) {
    bouton.toggle('save');
}


function save_active() {
    if (document.querySelector('.save') != null) {
        return 1;
    }
    return 0;
}