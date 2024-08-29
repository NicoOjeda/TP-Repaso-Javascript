const fs = require("fs");
const urlBase = "https://thronesapi.com/api/v2/";

//Leer personajes desde el archivo JSON
function readPersonajes() {
    try {
        return JSON.parse(fs.readFileSync('./personajes.json', 'utf-8'));
    }catch (error) {
        console.log('Error al leer el archivo JSON', error);
    }
}

//Obtener datos de la API
async function getDatos(endpoint) {
    try {
        const response = await fetch(urlBase + endpoint);
        if (!response.ok) {
            throw new Error('Error al obtener datos de la API', response.status)
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.log('Error al realizar la solicitud HTTP', error);
    }
}

//1.
async function getNedStark() {
    try {
        const nedStark = await getDatos("Characters/6");
        console.log('1) Información de Ned Stark:');
        console.log(nedStark);
    } catch (error) {
        console.log('Error al obtener la información de Ned Stark', error);
    }
}

//2.
async function getTodosLosPersonajes() {
    try {
        const personajes = await getDatos("Characters");
        console.log('2) Todos los personajes recuperados con éxito');
        return personajes;
    } catch (error) {
        console.log('Error al obtener todos los personajes', error);
    }
}

//3.
async function savePersonajes(personajes) {
    try {
        fs.writeFileSync('./personajes.json', JSON.stringify(personajes, null, 2));
        console.log('3) Personajes guardados con éxito');
    } catch (error) {
        console.log('Error al guardar los personajes en el archivo JSON', error);
    }
}

//4a.
async function getHouseStark() {
    try {
        const personajes = readPersonajes();
        if (!personajes) throw new Error("No se pudieron leer los personajes");
        const houseStark = personajes.filter(obj => obj.family === "House Stark");
        console.log('4a) Personajes de la familia Stark:');
        console.log(houseStark);
    } catch (error) {
        console.log("Error al obtener personajes de la familia Stark:", error);
    }
}

//4b.
async function addNewPerson() {
    try {
        const personajes = readPersonajes();
        if (!personajes) throw new Error("No se pudieron leer los personajes.");
        const newPers = {
            id: 53,
            firstName: "Alex",
            lastName: "Code",
            fullName: "House Code",
            title: "Senior Programmer",
            family: "Techies",
            image: "alex-code.jpg",
            imageUrl: "https://png.pngtree.com/png-vector/20230728/ourlarge/pngtree-programmer-clipart-developer-sitting-behind-his-computer-in-glasses-cartoon-vector-png-image_6815441.png"
        };
        
        personajes.push(newPers);
        fs.writeFileSync('./personajes.json', JSON.stringify(personajes, null, 2));
        console.log("4b) Personaje agregado con éxito");
        const updatedData = readPersonajes();
        console.log('Contenido actualizado del archivo JSON:');
        console.log(updatedData);
    } catch (error) {
        console.log('Error al agregar un nuevo personaje', error);
    }
}

//4c.
async function deleteMayores() {
    try{
        const personajes = readPersonajes();
        if (!personajes) throw new Error("No se pudieron leer los personajes");
        const getPerFilter = personajes.filter(obj => obj.id < 26);

        fs.writeFileSync('./personajes.json', JSON.stringify(getPerFilter, null, 2));
        console.log("4c) Personajes con ID mayor a 25 eliminados con éxito");
        const updatedData = readPersonajes();
        console.log('Contenido actualizado del archivo JSON:');
        console.log(updatedData);
    } catch (error) {
        console.log('Error al eliminar personejes con ID mayor a 25', error);
    }
}


async function main() {
    //1. Realizar una función que permita recuperar la información del personaje “Ned Stark”.
    await getNedStark();

    //2. Realizar una función que permita recuperar todos los personajes disponibles.
    const personajes = await getTodosLosPersonajes();

    //3. Persistir el resultado de la segunda consulta localmente en un archivo JSON.
    await savePersonajes(personajes);

    //4a. Leer el archivo local de personajes y mostrar por consola los personajes de la familia Stark.
    await getHouseStark();

    //4b. Agregar un nuevo personaje y sobrescribir el archivo original.
    await addNewPerson();

    //4c. Eliminar los personajes cuyo ID sean mayores a 25 y sobrescribir el archivo original.
    await deleteMayores();
}

main();
