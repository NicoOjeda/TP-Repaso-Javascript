const fs = require("fs");

const urlBase = "https://thronesapi.com/api/v2/";

function readPersonajes() {
    return JSON.parse(fs.readFileSync('./personajes.json', 'utf-8'))
}

async function getDatos(endpoint) {
    try {
        const response = await fetch(urlBase + endpoint);
        if (!response.ok) {
            throw new Error("Error", response.status);
        }

        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}

async function getTodosLosPersonajes() {
    try {
        const personajes = await getDatos("Characters"); 
        console.log('2) Personajes disponibles: ');
        console.log(personajes);
        return personajes;
    } catch (error) {
        console.log(error);
    }
}

async function getNedStark() {
    try {
        const nedStark = await getDatos("Characters/6"); 
        console.log('1) Información de Ned Stark:');
        console.log(nedStark);
        return nedStark;
    } catch (error) {
        console.log(error);
    }
}

async function savePersonajes(json) {
    try {
        fs.writeFileSync('./personajes.json', JSON.stringify(json, null, 2))
        console.log('3) Personajes guardados con exito:');
    } catch (error){
    console.log(error);
    }
}

async function getHouseStark() {
    //Filtra los personajes de la familia stark
    const personajes = readPersonajes()
    const houseStark = personajes.filter(obj => obj.family == "House Stark")
    console.log('4a) Personajes de la familia Stark')
    console.log(houseStark)
}

async function addNewPerson(personajes) {
    //Agrega un nuevo personaje 
    const newPers = {
        "id": 53,
        "firstName": "Alex",
        "lastName": "Code",
        "fullName": "House Code",
        "title": "Senior Programmer",
        "family": "Techies",
        "image": "alex-code.jpg",
        "imageUrl": "https://png.pngtree.com/png-vector/20230728/ourlarge/pngtree-programmer-clipart-developer-sitting-behind-his-computer-in-glasses-cartoon-vector-png-image_6815441.png"
    }

    personajes.push(newPers)
    try {
        fs.writeFileSync('./personajes.json', JSON.stringify(personajes, null, 2))
        console.log("4b) Personaje agregado con éxito");
        const updatedData = readPersonajes();
        console.log('Contenido actualizado del archivo JSON:');
        console.log(updatedData);
    } catch (error) {
        console.log(error);
    } 
}


async function deleteMayores() {
    //Elimina personajes con id mayor a 25
    const personajes = readPersonajes()
    const getPerFilter = personajes.filter(obj => obj.id < 26)

    try {
        fs.writeFileSync('./personajes.json', JSON.stringify(getPerFilter, null, 2))
        console.log("4c) Personajes con ID mayor a 25 eliminados con éxito")
    } catch (error) {
        console.log(error)
    } 
}

async function main() {
    try {
        //Punto 1
       await getNedStark();
       //Punto 2
       const personajes = await getTodosLosPersonajes();
       if (personajes) {
           //Punto 3
           await savePersonajes(personajes);
           //Punto 4a
           await getHouseStark();
           //Punto 4b
           await addNewPerson(personajes);
           //Punto 4c
           await deleteMayores();
           
       }
   } catch (error) {
       console.log(error);
   }
}

main();

