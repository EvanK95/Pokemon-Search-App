document.getElementById('search-button').addEventListener('click', searchPokemon);

async function searchPokemon() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${searchInput}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Pokémon not found');
        }
        const data = await response.json();
        displayPokemon(data);
    } catch (error) {
        alert(error.message);
        clearPokemonInfo();
    }
}

function displayPokemon(data) {
    // Set Pokémon image
    let sprite = document.getElementById('sprite');
    if (!sprite) {
        sprite = document.createElement('img');
        sprite.id = 'sprite';
        document.getElementById('pokemon-info').prepend(sprite);
    }
    sprite.src = data.sprites.front_default;

    // Set Pokémon details
    document.getElementById('pokemon-name').innerText = data.name.toUpperCase();
    document.getElementById('pokemon-id').innerText = `#${data.id}`;
    document.getElementById('weight').innerText = data.weight;
    document.getElementById('height').innerText = data.height;
    document.getElementById('hp').innerText = data.stats[0].base_stat;
    document.getElementById('attack').innerText = data.stats[1].base_stat;
    document.getElementById('defense').innerText = data.stats[2].base_stat;
    document.getElementById('special-attack').innerText = data.stats[3].base_stat;
    document.getElementById('special-defense').innerText = data.stats[4].base_stat;
    document.getElementById('speed').innerText = data.stats[5].base_stat;

    // Set Pokémon types
    const typesContainer = document.getElementById('types');
    typesContainer.innerHTML = ''; // Clear previous types
    data.types.forEach(typeInfo => {
        const typeElement = document.createElement('span');
        typeElement.innerText = typeInfo.type.name.toUpperCase();
        typesContainer.appendChild(typeElement);
    });
}

function clearPokemonInfo() {
    // Clear the sprite image
    const sprite = document.getElementById('sprite');
    if (sprite) {
        sprite.remove();
    }

    // Clear Pokémon details
    document.getElementById('pokemon-name').innerText = '';
    document.getElementById('pokemon-id').innerText = '';
    document.getElementById('weight').innerText = '';
    document.getElementById('height').innerText = '';
    document.getElementById('hp').innerText = '';
    document.getElementById('attack').innerText = '';
    document.getElementById('defense').innerText = '';
    document.getElementById('special-attack').innerText = '';
    document.getElementById('special-defense').innerText = '';
    document.getElementById('speed').innerText = '';
    document.getElementById('types').innerHTML = '';
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
