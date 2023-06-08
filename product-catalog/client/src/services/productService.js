async function getProducts(query) {
    let queryString = query ? `category/${query}` : ''

    let result = await fetch(`https://fakestoreapi.com/products/${queryString}`)
    return result.json()

}

async function getOneProduct(productId) {
    let result = await fetch(`https://fakestoreapi.com/products/${productId}`)
    return result.json()
    
}


export default {
    getProducts,
    getOneProduct
}