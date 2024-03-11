//variables
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');
const pokemonName = document.getElementById('pokemon-name');
const pokemonID = document.getElementById('pokemon-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const types = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const imgContainer = document.getElementById('img-container');
const searchForm = document.getElementById('search-form');

//Fetch Pokemon data
const getPokemon = async () => {
  try {
    // capture input from user and set to lower case for search
    const nameOrId = searchInput.value.toLowerCase();
    // fetch name or id from api
    const response = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${nameOrId}`
    )
    // await response and format in json
    const data = await response.json();
    
    // Set Pokemon information for card
    pokemonName.textContent = `${data.name}`
    pokemonID.textContent = `No: ${data.id}`
    weight.textContent = `Weight: ${data.weight}`
    height.textContent = `Height: ${data.height}`
    imgContainer.innerHTML = `
      <img id="sprite" src="${data.sprites.front_default}" alt="${data.name} front default sprite">`
    // Stats  
    hp.textContent = `HP ${data.stats[0].base_stat}`
    attack.textContent = `${data.stats[1].base_stat}`
    defense.textContent = `${data.stats[2].base_stat}`
    specialAttack.textContent = `${data.stats[3].base_stat}`
    specialDefense.textContent = `${data.stats[4].base_stat}`
    speed.textContent = `${data.stats[5].base_stat}`
    // Type
    types.innerHTML = data.types.map(obj => `<span class="type ${obj.type.name}">${obj.type.name}</span>`).join('')

  } catch (err) {
  resetUI();
  alert("Pokémon not found")
  console.log(`Pokémon not found: ${err}`)
  }
}

// Reset Site Data
const resetUI = () => {
  const sprite = document.getElementById('sprite')
  if (sprite) sprite.remove()

  pokemonName.textContent = '' 
  pokemonID.textContent = ''
  weight.textContent = '' 
  height.textContent = '' 
  hp.textContent = '' 
  attack.textContent = '' 
  defense.textContent = '' 
  specialAttack.textContent = '' 
  specialDefense.textContent = ''
  speed.textContent = ''
}

// Submit Button Listener and Key Press for Enter
searchForm.addEventListener('submit', e => {
  e.preventDefault();
  getPokemon();
})

searchInput.addEventListener('keydown', e => {
  if (e.key === 'enter') {
    e.preventDefault();
    getPokemon();
  }
})