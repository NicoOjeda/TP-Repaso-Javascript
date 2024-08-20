// 1. Recuperar la información de todos los productos (products)

// const Api = 'https://fakestoreapi.com/products'

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

limitado(6)