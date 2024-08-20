// 1. Recuperar la información de todos los productos (products)

const Api = 'https://fakestoreapi.com/products'

async function todos(Api) {
    try{
        const res = await fetch(Api);
        if(!res.ok){
            throw new Error('Error', res.status)
        }
        const datos = await res.json()
        console.log(datos);
    } catch(err){
        console.log(err);
    }
}

todos(Api)

