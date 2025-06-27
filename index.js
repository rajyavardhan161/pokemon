const section = document.querySelector("section");
const loadMore = document.getElementById("loadMore");

let limit = 20;
let offset = 0;

async function pokemon(url) {
    const response = await fetch(url);
    const result = await response.json();
    return result;
}

    const url = "https://pokeapi.co/api/v2/pokemon?limit=" + limit + "&offset=" + offset;

async function all() {
    const fire = await pokemon(url);
    console.log(fire);

    fire.results.map(async (no) => {
        const obj = await pokemon(no.url);
        console.log(obj);

        const main = document.createElement("div");
        main.classList.add("parent");

        const image = document.createElement("img");
        image.src = obj.sprites.other.dream_world.front_default;

        const name = document.createElement("h1");
        name.textContent = obj.name;

        const type = document.createElement("p");
        type.textContent = obj.types.map((a) => a.type.name);

        main.append(image, name, type);
        section.append(main);
    });
}
    all();

loadMore.addEventListener("click", () => {
    offset += limit;
    all();
});

