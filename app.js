// Search Pokémon and display details
document.getElementById('searchButton')?.addEventListener('click', function() {
    let pokemonName = document.getElementById('pokemonInput').value.toLowerCase();
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => response.json())
        .then(data => {
            displayPokemon(data);
        })
        .catch(error => {
            console.log('Error fetching data', error);
            document.getElementById('pokemonDetails').innerHTML = "<p>Pokémon not found. Please try again.</p>";
        });
});

function displayPokemon(data) {
    const pokemonContainer = document.getElementById('pokemonDetails');
    pokemonContainer.innerHTML = `
        <img src="${data.sprites.front_default}" alt="${data.name}" class="img-fluid mb-3" />
        <h3>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h3>
        <div class="row">
            <div class="col-md-6">
                <h5>Types:</h5>
                <p>${data.types.map(type => type.type.name).join(', ')}</p>
            </div>
            <div class="col-md-6">
                <h5>Abilities:</h5>
                <p>${data.abilities.map(ability => ability.ability.name).join(', ')}</p>
            </div>
        </div>
        <h5>Stats:</h5>
        <ul>
            ${data.stats.map(stat => `<li><strong>${stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}:</strong> ${stat.base_stat}</li>`).join('')}
        </ul>
    `;
}

// Fetch Pokémon details based on query parameter (name)
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonName = urlParams.get('name'); // Get Pokémon name from URL

    if (pokemonName) {
        fetchPokemonDetails(pokemonName);
    } else {
        document.getElementById('pokemonDetails').innerHTML = '<p>No Pokémon found.</p>';
    }
});

// Function to fetch Pokémon details
function fetchPokemonDetails(name) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(response => response.json())
        .then(data => {
            displayPokemonDetails(data);
        })
        .catch(error => {
            console.log("Error fetching data", error);
            document.getElementById('pokemonDetails').innerHTML = "<p>Pokémon not found. Please try again.</p>";
        });
}

// Function to display Pokémon details
function displayPokemonDetails(data) {
    const pokemonContainer = document.getElementById('pokemonDetails');
    pokemonContainer.innerHTML = `
        <img src="${data.sprites.front_default}" alt="${data.name}" class="img-fluid mb-3" />
        <h3>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h3>
        <div class="row">
            <div class="col-md-6">
                <h5>Types:</h5>
                <p>${data.types.map(type => type.type.name).join(', ')}</p>
            </div>
            <div class="col-md-6">
                <h5>Abilities:</h5>
                <p>${data.abilities.map(ability => ability.ability.name).join(', ')}</p>
            </div>
        </div>
        <h5>Stats:</h5>
        <ul>
            ${data.stats.map(stat => `<li><strong>${stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}:</strong> ${stat.base_stat}</li>`).join('')}
        </ul>
    `;
}
