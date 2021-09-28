const bouton = document.getElementById('bouton');

bouton.addEventListener('click', () => {
    bouton.classList.toggle('afficher');
    document.getElementById('filtre').classList.toggle('afficher');
});