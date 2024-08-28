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
        return personajes;
    } catch (error) {
        console.log(error);
    }
}

async function getNedStark() {
    try {
        const nedStark = await getDatos("Characters/6"); 
        return nedStark;
    } catch (error) {
        console.log(error);
    }
}

async function savePersonajes(json) {
    try {
        fs.writeFileSync('./personajes.json', JSON.stringify(json, null, 2))
    } catch (error){
    console.log(error);
    }
}

async function getHouseStark() {
    const personajes = readPersonajes()
    const houseStark = personajes.filter(obj => obj.family == "House Stark")
    console.log('4)a) Personajes de la familia Stark')
    console.log(houseStark)
}

async function addNewPerson(personajes) {

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
        console.log("4)b) Personaje agregado con éxito");
        const updatedData = readPersonajes();
        console.log('Contenido actualizado del archivo JSON:');
        console.log(updatedData);
    } catch (error) {
        console.log(error);
    } 
}


async function deleteMayores() {
    const personajes = readPersonajes()
    const getPerFilter = personajes.filter(obj => obj.id < 26)

    try {
        fs.writeFileSync('./personajes.json', JSON.stringify(getPerFilter, null, 2))
        console.log("4)c) Personajes con ID mayor a 25 eliminados con éxito")
    } catch (error) {
        console.log(error)
    } 
}

//ULTIMO
async function main() {
     try {
        const nedStark = await getNedStark();
        if (nedStark) {
            console.log('1) Datos de Ned Stark:');
            console.log(nedStark);
        }
        const personajes = await getTodosLosPersonajes();
        if (personajes) {
            console.log('2) Todos los personajes recuperados con éxito');
            await savePersonajes(personajes);
            console.log('3) Se ha creado el json con éxito');
            const updatedData = readPersonajes();
            console.log('Contenido actualizado del archivo JSON (después de agregar el nuevo personaje):');
            console.log(updatedData);
            await getHouseStark();
            await addNewPerson(personajes);
            await deleteMayores();
            const finalData = readPersonajes();
            console.log('Contenido final del archivo JSON:');
            console.log(finalData);
        }
    } catch (error) {
        console.log(error);
    }
}

main();

