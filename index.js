const falabella = require('./lib/scrapers/falabella')
const paris = require('./lib/scrapers/paris')
const sally = require('./lib/scrapers/sallybeauty')
const products = require('./db/products')

async function scrap() {
    //let productFalabella = await falabella.getProduct();
    //let productParis = await paris.getProduct();
    let productSally = await sally.getProduct();
    console.log(productSally)
    //let allProducts = await productFalabella.concat(productParis);
    //products.createProducts(allProducts);

}

scrap();