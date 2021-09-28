document.getElementById('bouton').addEventListener('click', () => {
    bouton.classList.toggle('afficher');
    document.getElementById('filtre').classList.toggle('afficher');
});


function enregistrer_filtres() {
    if (localStorage.getItem('filtres_pokemon_battle_revolution') == undefined) {
        localStorage.setItem('filtres_pokemon_battle_revolution', JSON.stringify([
            document.querySelector('#sexe').value, [document.querySelector('#type1').value, document.querySelector('#type2').value],
            document.querySelector('#talent').value,
            document.querySelector('#capacite').value
        ]));
    } else {
        let parametres = JSON.parse(localStorage.getItem('filtres_pokemon_battle_revolution'));
        parametres[0] = document.querySelector('#sexe').value;
        parametres[1] = [document.querySelector('#type1').value, document.querySelector('#type2').value];
        parametres[2] = document.querySelector('#talent').value;
        parametres[3] = document.querySelector('#capacite').value;
        localStorage.removeItem('filtres_pokemon_battle_revolution');
        localStorage.setItem('filtres_pokemon_battle_revolution', JSON.stringify(parametres));
    }
}