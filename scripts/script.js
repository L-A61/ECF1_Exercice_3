const pkmnID = document.getElementById("pkmnID");
const pkmnSearch = document.getElementById("pkmnSearch");


const API_BASE = "https://pokeapi.co/api/v2/pokemon-species/";

pkmnSearch.addEventListener("click", function () {
    const query = pkmnID.value;
    const endpoint = `${API_BASE}${query}`;

    fetch(endpoint)
        .then((response) => response.json())
        .then((data) => showPKMN(data))
        .catch(console.error);

})

function showPKMN(_data) {
    const pkmnInfo = document.getElementById("pkmnInfo");
    pkmnInfo.innerHTML = "";

    const pkmnContent = document.createElement("article");

    if (_data.id > 893) {
        pkmnContent.innerHTML = "<p>Pokémon Introuvable</p>"
        pkmnInfo.appendChild(pkmnContent)
    } else {
        pkmnContent.setAttribute("class", "card");

        const filterFR = _data.flavor_text_entries.filter(text => text.language.name == "fr");
        const pkmnDescFR = filterFR[0].flavor_text;

        pkmnContent.innerHTML =
            '<h2 class="pkmnName">#' + _data.id + " " + _data.names[4].name + '</h2>' +
            '<p>Taux de capture: ' + _data.capture_rate + "%</p>" +
            '<p>Famille: ' + _data.genera[3].genus + '</p>' +
            '<p>' + pkmnDescFR + '</p>' +
            `<img src="https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${_data.id}.svg" id="pkmnImg">`;

        pkmnInfo.appendChild(pkmnContent);
    }



}



// description (flavor_text_entries[16].flavor_text) not good