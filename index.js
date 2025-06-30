const section = document.querySelector("section");
const loadMore = document.getElementById("loadMore");
const typeSelect = document.getElementById("select");
const searchInput = document.getElementById("searchInput");

let limit = 20;
let offset = 0;
let allPokemonList = [];
let selectedType = "";
let searchName = "";

async function fetchData(url) {
  const response = await fetch(url);
  return await response.json();
}

async function loadPokemon() {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  const data = await fetchData(url);

  for (let i = 0; i < data.results.length; i++) {
    const detail = await fetchData(data.results[i].url);
    allPokemonList.push(detail);
  }

  showFilteredPokemon();
}

function showFilteredPokemon() {
  section.innerHTML = "";

  for (let i = 0; i < allPokemonList.length; i++) {
    const p = allPokemonList[i];
    const types = p.types.map((t) => t.type.name);
    const nameMatch = p.name.toLowerCase().includes(searchName);
    const typeMatch = selectedType === "" || types.includes(selectedType);

    if (nameMatch && typeMatch) {
      const flip = document.createElement("div");
      flip.classList.add("flip-card");

      const flipInner = document.createElement("div");
      flipInner.classList.add("flip-card-inner");

      const flipFront = document.createElement("div");
      flipFront.classList.add("flip-card-front");

      const img = document.createElement("img");
      img.src = p.sprites.other.dream_world.front_default || p.sprites.front_default;

      const name = document.createElement("h1");
      name.textContent = p.name;

      const type = document.createElement("p");
      type.textContent = "Type: " + types.join(", ");

      flipFront.append(img, name, type);

      const flipBack = document.createElement("div");
      flipBack.classList.add("flip-card-back");

      const height = document.createElement("h2");
      height.textContent = "Height: " + p.height;

      const weight = document.createElement("h2");
      weight.textContent = "Weight: " + p.weight;

      flipBack.append(height, weight);

      for (let j = 0; j < p.stats.length; j++) {
        const stat = document.createElement("h3");
        stat.textContent = p.stats[j].stat.name + ": " + p.stats[j].base_stat;
        flipBack.append(stat);
      }

      flipInner.append(flipFront, flipBack);
      flip.append(flipInner);
      section.append(flip);
    }
  }
}

async function loadTypes() {
  const data = await fetchData("https://pokeapi.co/api/v2/type");
  for (let i = 0; i < data.results.length; i++) {
    const option = document.createElement("option");
    option.value = data.results[i].name;
    option.textContent = data.results[i].name.toUpperCase();
    typeSelect.appendChild(option);
  }
}

typeSelect.addEventListener("change", function () {
  selectedType = this.value;
  showFilteredPokemon();
});

searchInput.addEventListener("input", function () {
  searchName = this.value.toLowerCase().trim();
  showFilteredPokemon();
});

loadMore.addEventListener("click", function () {
  offset += limit;
  loadPokemon();
});

window.addEventListener("load", function () {
  loadPokemon();
  loadTypes();
});
