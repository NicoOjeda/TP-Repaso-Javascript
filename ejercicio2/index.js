// 1. Recuperar la información de todos los productos (products)

const Api = 'https://fakestoreapi.com/products'

// async function todos(Api) {
//     try{
//         const res = await fetch(Api);
//         if(!res.ok){
//             throw new Error('Error', res.status)
//         }
//         const datos = await res.json()
//         console.log(datos);
//     } catch(error){
//         console.log(error);
//     }
// }

// todos(Api)

// 2. Recuperar la información de un número limitado de productos (products)

async function limitado(id) {
    try{
        const res = await fetch(`https://fakestoreapi.com/products?limit=${id}`)
        if(!res.ok){
            throw new Error('Error', res.status)
        }
        const datos = await res.json()
        console.log(datos);
    } catch(error){
        console.log(error);
    }
}

//limitado(6)

// 3. Agregar un nuevo producto (product).

async function addNewProduct() {

    const url = "https://fakestoreapi.com/products"
    const product = {
        id: 236,
        title: "Snickers Clasico",
        price: 1150,
        description: "Una rica mezcla de cacahuete tostado, caramelo cremoso y la mejor crema de caramelo, cubierta de delicado chocolate con leche.",
        category: "Chocolates",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNwJVn43VN-_aGKMt35Ihrrh5WHXH-940tiw&s",
        rating: {rate: 5.0, coun: 20}
    }

    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(product) 
        })

        if (!response.ok) {
            throw new Error('Error', response.status)
        }

        const data = await response.json()
        console.log(data)

    } catch (error) {
        console.log(error)
    }
}

//addNewProduct()

//! Punto 4
async function retornaProducto(id){
    try{
        const respuesta = await fetch(Api + '/' + id)

        if(!respuesta.ok){
            throw new Error('Error', respuesta.status);
        }

        const datos = await respuesta.json();

        console.log(datos)
    }catch(error){
        console.log(error)
    }
}
//retornaProducto(1)

//! Punto 5
const urlApi5 = 'https://fakestoreapi.com/products/1'

async function eliminarProducto(){
    try{
        const respuesta = await fetch(urlApi5, {
            method:"DELETE"
        })

        if(!respuesta.ok){
            throw new Error('Error', respuesta.status);
        }
        const datos = await respuesta.json();

        console.log(datos)
    }catch(error){
        console.log(error)
    }
}
eliminarProducto()