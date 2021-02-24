class Item {
    constructor(
        title,
        url,
        city,
        country,
        hashtag
    ) {
        this.title = title;
        this.url = url;
        this.city = city;
        this.country = country;
        this.hashtag = hashtag;
    }
}


var itemArray = []

// get objects
let addButton = document.getElementsByClassName("addNewObject");
let addItemDisplay = document.getElementsByClassName('addNewItem');
let newItemSubmit = document.getElementById("newItemSubmit");
let closeFormButton = document.getElementById('closeForm')
let newItemForm = document.getElementsByClassName("newItemForm");
let existingCardsContainer = document.getElementsByClassName('existingCards')





//Add Items

addButton[0].addEventListener('click', displayAddItem);
newItemSubmit.addEventListener('click', submitNewItem)
closeFormButton.addEventListener('click', closeForm)

function displayAddItem(){
    addButton[0].style.display = "none";
    addItemDisplay[0].style.display = "block";
    console.log("modal opened")
}

function closeForm(){
    addButton[0].style.display = "block";
    addItemDisplay[0].style.display = "none";
    newItemForm[0].reset()
}

function createItemFromForm() {
    console.log("started")
    const title = `${document.getElementById('title').value}`;
    const url = `${document.getElementById('url').value}`;
    const city = `${document.getElementById('city').value}`;
    const country = `${document.getElementById('country').value}`;
    const hashtag = `#${document.getElementById('hashtag').value}`;
    return new Item(title, url, city, country, hashtag);
}

function submitNewItem(){
    event.preventDefault();
    let newItem = createItemFromForm();
    console.log(newItem);
    itemArray.push(newItem);
    saveLocal();
    newItemForm[0].reset()
    addButton[0].style.display = "block";
    addItemDisplay[0].style.display = "none";
    render()
}

//render cards from array to board
function render(){
    let length = itemArray.length;
    let existingCards = document.getElementsByClassName('cardFrame')
    console.log(existingCards)

    //remove existing cards
    Array.from(existingCards).forEach(card => existingCardsContainer.removeChild(card));
    console.log("existing cards removed")


    // add cards from array
    for (var i = 0; i < length; i++){
        createItemCard(itemArray[i])
        console.log(itemArray[i].title + " Added")
    }
}

//Create Card from Array and add to existing cards
function createItemCard(card){

    //create divs
    const cardFrame = document.createElement('div')
    const titleDiv = document.createElement('div')
    const urlDiv = document.createElement('div')
    const cityDiv = document.createElement('div')
    const countryDiv = document.createElement('div')
    const hashtagDiv = document.createElement('div')

    //add attributes and build them together
    cardFrame.classList.add('cardFrame');
    cardFrame.setAttribute('id', itemArray.indexOf(card));

    titleDiv.textContent = card.title;
    titleDiv.classList.add('title');
    cardFrame.appendChild(titleDiv);

    urlDiv.textContent = card.url;
    urlDiv.classList.add('url');
    cardFrame.appendChild(urlDiv);

    cityDiv.textContent = card.city;
    cityDiv.classList.add('city');
    cardFrame.appendChild(cityDiv);

    countryDiv.textContent = card.country;
    countryDiv.classList.add('country');
    cardFrame.appendChild(countryDiv);

    hashtagDiv.textContent = card.hashtag;
    hashtagDiv.classList.add('hashtag');
    cardFrame.appendChild(hashtagDiv);

    // add to existing cards
    existingCardsContainer[0].appendChild(cardFrame)
}


//local data
function saveLocal(){
    localStorage.setItem('itemArray', JSON.stringify(itemArray))
    console.log('saved locally')
}

function getLocal(){
    let storedArray = JSON.parse(localStorage.getItem('itemArray'));
    itemArray = storedArray
    return storedArray
}

// get local storage and render
getLocal()
render()
