const fs = require('fs').promises;
const path = './personajes.json'; // Ruta del archivo JSON
const urlApi = 'https://thronesapi.com/api/v2/characters';

// 1. Función para ver información de Ned Stark
async function getNedStark() {
    try {
        const response = await fetch(urlApi);
        if (!response.ok) throw new Error('Error en la solicitud');
        const characters = await response.json();

        const nedStark = characters.find(character => character.fullName === 'Ned Stark');

        if (nedStark) {
            console.log('1. Información de Ned Stark:', nedStark);
        } else {
            console.log('Ned Stark no fue encontrado.');
        }
    } catch (error) {
        console.error('Hubo un problema con la solicitud fetch:', error);
    }
}

// 2. Función para ver todos los personajes de la API
async function getPersonajes() {
    try {
        const response = await fetch(urlApi);
        if (!response.ok) throw new Error('Error en la solicitud');
        const characters = await response.json();

        if (Array.isArray(characters)) {
            return characters;
        } else {
            console.error('El formato de los datos no es el esperado.');
            return [];
        }
    } catch (error) {
        console.error('Hubo un problema con la solicitud fetch:', error);
        return [];
    }
}

// 3. Función para guardar datos en json
async function guardarpunto2(filename, data) {
    try {
        await fs.writeFile(filename, JSON.stringify(data, null, 2));
        console.log(`3. Datos guardados en ${filename} con éxito`);
    } catch (err) {
        console.error('Error al guardar el archivo:', err);
    }
}

// 4.a. Funsión para mostrar personajes de la familia Stark 
async function mostrarPersonajesStark(filename) {
    try {
        const data = await fs.readFile(filename, 'utf8');
        const personajes = JSON.parse(data);
        const starkPersonajes = personajes.filter(character => character.family === 'House Stark');

        if (starkPersonajes.length > 0) {
            console.log('4.a. Personajes de la familia Stark:', starkPersonajes);
        } else {
            console.log('No se encontraron personajes de la familia Stark.');
        }
    } catch (err) {
        console.error('Error al procesar el archivo:', err);
    }
}

// 4.b. Función para agregar un nuevo personaje al json
async function agregarNuevoPersonaje(nuevoPersonaje) {
    try {
        const data = await fs.readFile(path, 'utf8');
        const personajes = JSON.parse(data);

        personajes.push(nuevoPersonaje);

        await fs.writeFile(path, JSON.stringify(personajes, null, 2));
        console.log('4.b. Nuevo personaje agregado con éxito.');
    } catch (err) {
        console.error('Error al agregar el nuevo personaje:', err);
    }
}

// Ejemplo de uso para agregar un nuevo personaje
const nuevoPersonaje = {
    id: 53,
    fullName: 'Dragon',
    family: 'House Dragon',
    title: 'No vi la serie XD'
}

async function mostrarTodosLosPersonajes(filename) {
    try {
        const data = await fs.readFile(filename, 'utf8');
        const personajes = JSON.parse(data);
        console.log('4.b. Contenido actual del archivo:', personajes);
    } catch (err) {
        console.error('Error al leer el archivo:', err);
    }
}

// 4.c. Función para eliminar personajes mayores a 25
async function eliminarPersonajesIDMayorA25() {
    try {
        // Leer el archivo JSON existente
        const data = await fs.readFile(path, 'utf8');
        const personajes = JSON.parse(data);

        // Filtrar los personajes cuyo ID sea menor o igual a 25
        const personajesFiltrados = personajes.filter(character => character.id <= 25);

        // Escribir el array filtrado en el archivo
        await fs.writeFile(path, JSON.stringify(personajesFiltrados, null, 2));
        console.log('4.c. Personajes eliminados con éxito.');
    } catch (err) {
        console.error('Error al eliminar personajes:', err);
    }
}

// Función para imprimir por consola en orden de ejercicios
async function main() {
    await getNedStark(); // 1.

    const personajes = await getPersonajes(); // 2.
    console.log('2. Todos los personajes obtenidos de la API:', personajes); // 2.

    await guardarpunto2(path, personajes); // 3.

    await mostrarPersonajesStark(path); // 4.a. 

    await agregarNuevoPersonaje(nuevoPersonaje); // 4.b.
    await mostrarTodosLosPersonajes(path);

    await eliminarPersonajesIDMayorA25(); // 4. c.
    const archivoFiltrado = await fs.readFile(path, 'utf8');
    console.log('4.c Contenido despues del borrado:', JSON.parse(archivoFiltrado));
}


// Ejecutar la función principal
main();