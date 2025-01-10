
const pokemonForm = document.querySelector(".pokemonForm");
const pokemonInput = document.querySelector(".pokemonInput");
const card = document.querySelector(".card");

pokemonForm.addEventListener("submit", async event => {

    event.preventDefault();

    const pokemon = pokemonInput.value.toLowerCase();

    if(pokemon){
        try{
            const pokemonData = await getPokemonData(pokemon);
            displayPokemonInfo(pokemonData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Enter Pokemon name")
    }
})

async function getPokemonData(pokemon) {
    
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Could not fetch data");
    }

    return await response.json();
}

function displayPokemonInfo(data){

    const {name: pokemon, 
           sprites: {other: {showdown: {front_default}}},
           stats: [{base_stat: hp},
                   {base_stat: atk},
                   {base_stat: def},
                   , ,
                   {base_stat: spd}],
           types: [{type: {name: type}}],
           abilities: [{ability: {name: ability1}},
                       {ability: {name: ability2}}]} = data;

    card.textContent = "";
    card.style.display = "flex";

    const nameDisplay = document.createElement("h2");
    const spriteDisplay = document.createElement("img");
    const statsDisplay = document.createElement("div");
    const hpDisplay = document.createElement("p");
    const atkDisplay = document.createElement("p");
    const typeDisplay = document.createElement("p");
    const defDisplay = document.createElement("p");
    const spdDisplay = document.createElement("p");
    const ability1Display = document.createElement("p");
    const ability2Display = document.createElement("p");

    nameDisplay.textContent = pokemon.charAt(0).toUpperCase() + pokemon.slice(1);
    spriteDisplay.src = front_default;
    hpDisplay.textContent = `${hp} HP`;
    atkDisplay.textContent = `${atk} ATK`;
    typeDisplay.textContent = type;
    defDisplay.textContent = `${def} DEF`;
    spdDisplay.textContent = `${spd} SPD`;
    ability1Display.textContent = ability1;
    ability2Display.textContent = ability2;


    nameDisplay.classList.add("nameDisplay");
    spriteDisplay.classList.add("spriteDisplay");
    statsDisplay.classList.add("statsDisplay");
    atkDisplay.classList.add("atkDisplay");
    typeDisplay.classList.add("typeDisplay");
    spdDisplay.classList.add("spdDisplay");
    ability1Display.classList.add("ability1Display");
    ability2Display.classList.add("ability2Display");

    card.appendChild(nameDisplay);
    card.appendChild(spriteDisplay);
    statsDisplay.appendChild(hpDisplay);
    statsDisplay.appendChild(atkDisplay);
    statsDisplay.appendChild(typeDisplay);
    statsDisplay.appendChild(defDisplay);
    statsDisplay.appendChild(spdDisplay);
    card.appendChild(statsDisplay);
    card.appendChild(ability1Display);
    card.appendChild(ability2Display);
}

function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);

}