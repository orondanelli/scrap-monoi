const falabella = require('./lib/scrapers/falabella')
const paris = require('./lib/scrapers/paris')
const products = require('./db/products')

async function scrap() {
    let productFalabella = await falabella.getProduct()
    let productParis = await paris.getProduct()

    let allProducts = await productFalabella.concat(productParis)
    products.createProducts(allProducts)

}

scrap();