//Access Token and API URL
const ACCESS_TOKEN = '8f2559346b5024ca1c64488a284f5748';
const BASE_URL = `https://superheroapi.com/api.php/${ACCESS_TOKEN}`;

// DIV ID'S
const SearchInput = document.getElementById('searchinput');
const searchBtn = document.getElementById('searchbtn');
const heroTextName = document.getElementById('herotextname');
const heroContainer = document.getElementById('herocontainer');
const heroDetails = document.getElementById('herodetails');
const randomBtn = document.getElementById('randombtn');

//EMOJIS TO REPRESENT THE FEATURES OF EACH SUPERHERO USING AN OBJECT
const stattoEmoji = {
    intelligence : '🧠',
    strength : '💪',
    speed : '⚡',
    durability : '🏋️',
    power : '📊',
    combat : '⚔️'
}

// GETTING THE STATS FOR EACH HERO
const getHerostats = (character) => {
    const stats = Object.keys(character.powerstats).map((stat) => {
        return `<p class="herotext">${stattoEmoji[stat]} ${stat} : ${character.powerstats[stat]}</p>`
    }).join('');

    heroTextName.innerHTML = `<p class="herotext">${character.name}</p>`;
    heroContainer.innerHTML = ` <img class="heroimg" src="${character.image.url}">`;
    heroDetails.innerHTML = `${stats}`;
    heroContainer.appendChild(heroDetails);
    SearchInput.value = '';

}

// FUNCTION THAT FETCHES THE INFO OF A SEARCHED SUPERHERO
const getSearchedSuperheropic = async (name) => {
    try{
        const searchedHeroURL = await fetch(`${BASE_URL}/search/${name}`);
        const dataresponse = await searchedHeroURL.json()
        getHerostats(dataresponse.results[0])
    }catch(err){
        throw new Error("Unable to fetch superhero info");
    } 
}

//ONCLICK OF THE SEARCH BUTTON GET THE SUPERHERO 
searchBtn.addEventListener('click', () => getSearchedSuperheropic(SearchInput.value))



// FUNCTION THAT FETCHES THE INFO OF A RANDOM SUPERHERO
const getRandomSuperHeropic = async (id) => {
    try{
        const superHeroURL = await fetch(`${BASE_URL}/${id}`);
        const data = await superHeroURL.json()
        getHerostats(data)
        // randomHeroinfo(data);
    }catch(err){
        throw new Error("Unable to fetch superhero info");
    }
    
}

//GETTING A RANDOM NUMBER FROM AN ARRAY
const getRandomNum = () => {
    let numofHeroes = 731;
    return Math.floor(Math.random() * numofHeroes) + 1;
}

//ONCLICK OF THE SEARCH BUTTON GET THE SUPERHERO 
randomBtn.addEventListener('click', () => getRandomSuperHeropic(getRandomNum()));