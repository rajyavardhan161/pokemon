// // const section = document.querySelector("section");

// const section=document.querySelector("section");
// const loadMore=document.getElementById("loadMore");

// async function pokeUrl(url) {
//     const response=await fetch(url);
//     const result=response.json();
//     return result;
    
// }

// const limit=20;
// const offset=0;

// const api="https://pokeapi.co/api/v2/pokemon?limit="+limit+"&offset="+offset;



// function all (obj){
// window.addEventListener("load",async()=>{
// const data=await pokeUrl(api);
// all()
// console.log(data);


// data.results.map(async(a)=>{
//     console.log(a);
    
//     const obj=await pokeUrl(a.url);
//     console.log(obj);
    
//     const parent=document.createElement("div")
//     parent.classList.add("parent");

//     const image=document.createElement("img")
//     image.src=obj.sprites.other.dream_world.front_default;

//     const name=document.createElement("h1");
//     name.textContent=obj.name;

//     const type=document.createElement("p");
//     type.textContent=obj.types.map((a)=> a.type.name).join(",");

//     console.log(type);
    

//     parent.append(image,name,type);
//     section.append(parent);

// });

// });

// }

// all();




// loadMore.addEventListener("click",()=>{

// const api="https://pokeapi.co/api/v2/pokemon?limit="+limit+"&offset="+offset;
// console.log(hii);



// all()
// })



const section = document.querySelector("section");
const loadMore = document.getElementById("loadMore");

let limit = 20;
let offset = 0;

async function pokeUrl(url) {
    const response = await fetch(url);
    const result = await response.json();
    return result;
}

async function all() {
    const api = "https://pokeapi.co/api/v2/pokemon?limit=" + limit + "&offset=" + offset;
    const data = await pokeUrl(api);
    console.log(data);

    data.results.map(async (a) => {
        const obj = await pokeUrl(a.url);
        console.log(obj);

        const parent = document.createElement("div");
        parent.classList.add("parent");

        const image = document.createElement("img");
        image.src = obj.sprites.other.dream_world.front_default;

        const name = document.createElement("h1");
        name.textContent = obj.name;

        const type = document.createElement("p");
        type.textContent = obj.types.map((a) => a.type.name).join(",");

        parent.append(image, name, type);
        section.append(parent);
    });
}

// Call once on page load
window.addEventListener("load", () => {
    all();
});

// Load 20 more Pokémon every time you click the button
loadMore.addEventListener("click", () => {
    offset += limit; // increase offset
    all(); // load more Pokémon
});

