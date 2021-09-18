if (localStorage.getItem('mon_equipe_pokemon_battle_revolution') == undefined) {
    localStorage.setItem('mon_equipe_pokemon_battle_revolution', JSON.stringify({
        pokemon_1: [2, "/images/sprites/dracaufeu.png"],
        pokemon_2: [3, "/images/sprites/tortank.png"],
        pokemon_3: [0, ""],
        pokemon_4: [0, ""],
        pokemon_5: [0, ""],
        pokemon_6: [0, ""]
    }));
} else {
    let equipe = JSON.parse(localStorage.getItem("mon_equipe_pokemon_battle_revolution"));
    if (equipe.pokemon_1[0] != 0) {
        let pokemon = document.getElementById('un')
        pokemon.childNodes[1].classList.replace('sprite-pokeball', 'sprite');
        pokemon.childNodes[1].innerHTML = '<img src="' + equipe.pokemon_1[1] + '" alt="Sprite du Pokémon">';
        pokemon.childNodes[3].classList.replace('boutons-pokeball', 'boutons');
        pokemon.childNodes[3].innerHTML = '<a href="/' + equipe.pokemon_1[0] + '"><button>Voir</button></a> <button onclick="supprimer(this)">Supprimer</button>';
    }
    if (equipe.pokemon_2[0] != 0) {
        let pokemon = document.getElementById('deux')
        pokemon.childNodes[1].classList.replace('sprite-pokeball', 'sprite');
        pokemon.childNodes[1].innerHTML = '<img src="' + equipe.pokemon_2[1] + '" alt="Sprite du Pokémon">';
        pokemon.childNodes[3].classList.replace('boutons-pokeball', 'boutons');
        pokemon.childNodes[3].innerHTML = '<a href="/' + equipe.pokemon_2[0] + '"><button>Voir</button></a> <button onclick="supprimer(this)">Supprimer</button>';
    }
}


function supprimer(bouton) {
    let pokemon = bouton.parentNode.parentNode;
    let equipe = JSON.parse(localStorage.getItem("mon_equipe_pokemon_battle_revolution"));
    switch (pokemon.id) {
        case 'un':
            equipe.pokemon_1 = [0, ""];
            break;
        case 'deux':
            equipe.pokemon_2 = [0, ""];
            break;
        case 'trois':
            equipe.pokemon_3 = [0, ""];
            break;
        case 'quatre':
            equipe.pokemon_4 = [0, ""];
            break;
        case 'cinq':
            equipe.pokemon_5 = [0, ""];
            break;
        case 'six':
            equipe.pokemon_6 = [0, ""];
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