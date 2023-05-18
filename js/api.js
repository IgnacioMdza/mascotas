const BASE_URL = `https://javascript-25g-ba0a0-default-rtdb.firebaseio.com`;

const updatePet = async (pet, clave) => {
    let response = await fetch(`${BASE_URL}/mascotas/${clave}.json`, {
        method: "PATCH",
        body: JSON.stringify(pet),
    });
    let data = await response.json();
    return data;
};

const savePet = async (pet) => {
    let response = await fetch(`${BASE_URL}/mascotas.json`, {
        method: "POST",
        body: JSON.stringify(pet),
    });
    let data = await response.json();
    return data;
};

const getAllPets = async () => {
    let response = await fetch(`${BASE_URL}/mascotas.json`);
    let data = await response.json();
    return data;
};

const deletePet = async (petKey) => {
    let response = await fetch(`${BASE_URL}/mascotas/${petKey}/.json`, {
        method: "DELETE",
    });
    let data = await response.json();
    console.log(data);
    printAllPets("pet-list");
};

const printAllPets = async (listId) => {
    let pets = await getAllPets();
    console.log(pets);
    let listWrapper = document.getElementById(listId);
    while (listWrapper.firstChild) {
        listWrapper.removeChild(listWrapper.firstChild);
    }
    for (key in pets) {
        let petData = pets[key];
        let card = createPetCard(petData, key);
        listWrapper.appendChild(card);
    }
};

export {updatePet, savePet, getAllPets, deletePet, printAllPets} ;