
const BASE_URL = `https://javascript-25g-ba0a0-default-rtdb.firebaseio.com`;

let petObject = {};
let newPetObject = {};

document.querySelectorAll("#new-pet-form input").forEach((field) => {
    field.addEventListener("keyup", (event) => {
        let property = event.target.name;
        let value = event.target.value;
        newPetObject[property] = value;
        console.log(newPetObject)
    });
});
const savePet = async (pet) => {
    let response = await fetch(`${BASE_URL}/mascotas.json`, {
        method: "POST",
        body: JSON.stringify(pet),
    });
    let data = await response.json();
    return data;
};
document.querySelectorAll("#pet-form input").forEach((field) => {
    field.addEventListener("keyup", (event) => {
        let property = event.target.name;
        let value = event.target.value;
        petObject[property] = value;
        console.log(petObject);
    });
});
const updatePet = async (pet, clave) => {
    let response = await fetch(`${BASE_URL}/mascotas/${clave}.json`, {
        method: "PATCH",
        body: JSON.stringify(pet),
    });
    let data = await response.json();
    return data;
};
document.getElementById("save-pet").addEventListener("click", async (event) => {
    event.preventDefault();
    let response = await savePet(petObject);
    console.log(response);
    if (response) {
        printAllPets("pet-list");
    }
});

const createPetCard = (petData, petKey) => {
    let { petname, age, type, breed, picture } = petData;
    let cardCol = document.createElement("div");
    cardCol.classList.add("col");

    let cardWrapper = document.createElement("div");
    cardWrapper.classList.add("pet-card", "card", "mb-3", "bg-secondary-subtle", "p-2", "border", "border-secondary-subtle");

    let cardRow = document.createElement("div");
    cardRow.classList.add("row", "g-0");

    let imageCol = document.createElement("div");
    imageCol.classList.add("col-md-4");

    let cardPicture = document.createElement("img");
    cardPicture.classList.add("card-picture", "rounded", "shadow-lg");
    cardPicture.setAttribute("src", picture);

    let contentCol = document.createElement("div");
    contentCol.classList.add("col-md-6");

    let cardBody = document.createElement("div");
    cardBody.classList.add(
        "card-body",
        "h-100",
        "d-flex",
        "flex-column",
        "justify-content-between",
    );

    let cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title", "text-secondary-emphasis");
    let cardTitleText = document.createTextNode(`Nombre | ${petname}`);
    cardTitle.append(cardTitleText);

    let cardType = document.createElement("p");
    cardType.classList.add("card-text", "text-secondary");
    let typeText = document.createTextNode(type);
    cardType.append(typeText);

    let cardBreed = document.createElement("p");
    cardBreed.classList.add("card-text", "text-secondary");
    let breedText = document.createTextNode(`[${breed}]`);
    cardBreed.append(breedText);

    let cardAge = document.createElement("p");
    cardAge.classList.add("card-text", "text-secondary");
    let ageText = null
    if (age == 1) {
        ageText = document.createTextNode(`Edad: ${age} año`)
    } else {
        ageText = document.createTextNode(`Edad: ${age} años`)
    };
    cardAge.append(ageText);

    let buttonWrapper = document.createElement("div");
    buttonWrapper.classList.add(
        "d-flex",
        "justify-content-between",
        "flex-column",
        "flex-md-row",
        "gap-3"
    );

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-outline-danger");
    let deleteText = document.createTextNode("Borrar");
    deleteButton.append(deleteText);
    deleteButton.addEventListener("click", () => {
        console.log("borrando auto");
        deletePet(petKey);
    });

    let detailButton = document.createElement("button");
    detailButton.classList.add("btn", "btn-primary");
    detailButton.setAttribute("type","button")
    detailButton.setAttribute("data-bs-toggle", "modal")
    detailButton.setAttribute("data-bs-target", "#modalDetail")
    let detailText = document.createTextNode("Detalle");
    detailButton.append(detailText);
    detailButton.addEventListener("click", () => {
        let h5modalElement = document.getElementById("h5modalDetail")
        h5modalElement.textContent= petname
        let imgmodalElement = document.getElementById("imgmodalDetail")
        imgmodalElement.setAttribute("src", picture)
    });

    let editButton = document.createElement("button");
    editButton.classList.add("btn", "btn-success");
    editButton.setAttribute("type","button")
    editButton.setAttribute("data-bs-toggle", "modal")
    editButton.setAttribute("data-bs-target", "#modalEdit")
    let editText = document.createTextNode("Editar");
    editButton.append(editText);
    editButton.addEventListener("click", () => {
        let h5modalEditElement = document.getElementById("h5modalEdit")
        h5modalEditElement.textContent= `Modificar los datos de: ${petname}`
        document.getElementById("new-pet-name").setAttribute("placeholder", `Actual: ${petname}`)
        document.getElementById("new-age").setAttribute("placeholder", `Actual: ${age}`)
        document.getElementById("new-type").setAttribute("placeholder", `Actual: ${type}`)
        document.getElementById("new-breed").setAttribute("placeholder", `Actual: ${breed}`)
        document.getElementById("new-picture").setAttribute("placeholder", `Actual: ${picture}`)

        document.getElementById("new-save-pet").addEventListener("click", async (event) => {
            event.preventDefault();
            let response = await updatePet(newPetObject, petKey);
            location.reload();
            return response
        });
    });

    buttonWrapper.append(deleteButton, detailButton, editButton);
    cardBody.append(cardTitle, cardType, cardBreed, cardAge, buttonWrapper);
    contentCol.append(cardBody);
    imageCol.append(cardPicture);
    cardRow.append(imageCol, contentCol);
    cardWrapper.append(cardRow);
    cardCol.append(cardWrapper);
    
    return cardCol;
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

printAllPets("pet-list");




