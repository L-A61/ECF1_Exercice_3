// Sélecteur de l'ID du pokémon
const pkmnID = document.getElementById("pkmnID");

// Sélecteur du bouton chercher
const pkmnSearch = document.getElementById("pkmnSearch");

// Début du lien vers l'API
const API_BASE = "https://pokeapi.co/api/v2/pokemon-species/";

pkmnSearch.addEventListener("click", function () {
    // La valeur pour l'id est conservée dans la constante query
    const query = pkmnID.value;

    // La constante endpoint est le lien complet vers l'API
    const endpoint = `${API_BASE}${query}`;

    // Fetch de l'API en utilisant la constante endpoint et appel la fonction showPKMN
    fetch(endpoint)
        .then((response) => response.json())
        .then((data) => showPKMN(data))
        .catch(console.error);

})

// Fonction pour afficher le DOM des informations du Pokémon
function showPKMN(_data) {
    // Sélecteur de la section où le DOM s'affichera
    const pkmnInfo = document.getElementById("pkmnInfo");
    // Retire tout l'innerHTML du DOM à chaque début du click
    pkmnInfo.innerHTML = "";

    // Création d'un élement article sous la constante pkmnContent
    const pkmnContent = document.createElement("article");

    // Si l'id chercher est supérieur à 893, l'innerHTML de pkmnContent affiche "Pokémon introuvable"
    if (_data.id > 893) {
        pkmnContent.innerHTML = "<p>Pokémon Introuvable</p>";
        pkmnInfo.appendChild(pkmnContent);
    // Sinon, on continue la fonction en ajoutant une class bootstrap card
    } else {
        pkmnContent.setAttribute("class", "card bg-dark");

        // La fonction filtre sous la constante filterFR ne récupère que les descriptions avec pour nom de langage "fr" dans un tableau
        const filterFR = _data.flavor_text_entries.filter(text => text.language.name == "fr");
        
        // La constante pkmnDescFR récupère le flavor_text du premier index dans le tableau filterFR
        const pkmnDescFR = filterFR[0].flavor_text;

        // Création de l'innerHTML qui affiche une section, contenant le nom, le taux de capture, la famille, une description et une image du pokémon.
        pkmnContent.innerHTML =
            `<section class="card-items" style="border: 5px solid ${_data.color.name};">`+
                `<h2 class="pkmnName center-text" style="color: ${_data.color.name};">#` + _data.id + " " + _data.names[4].name + '</h2>' +
                `<p class="center-text" style="background: linear-gradient(to right, ${_data.color.name}, rgba(255,0,0,0));">Taux de capture: ` + _data.capture_rate + "%</p>" +
                '<p class="center-text">Famille: ' + _data.genera[3].genus + '</p>' +
                '<p class="center-text">' + pkmnDescFR + '</p>' +
                `<img src="https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${_data.id}.svg" id="pkmnImg" class="bg-secondary">`+
            '</section>';

        // Ajoute le contenu de pkmnContent dans la section de pkmnInfo
        pkmnInfo.appendChild(pkmnContent);
    }
}