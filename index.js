const falabella = require('./lib/scrapers/falabella')
const paris = require('./lib/scrapers/paris')
const sally = require('./lib/scrapers/sallybeauty')
const products = require('./db/products')
const loadControl = require('./db/audit')

const initLoad = async () => {
    let loadNbr = await loadControl.initLoad();
    return loadNbr
};

async function endLoad(loadNbr) {
    let status = await loadControl.endLoad(loadNbr);
    return status
};

async function scrap() {
    try {

        let productFalabella = await falabella.getProduct();
        let productParis = await paris.getProduct();
        let productSally = await sally.getProduct();
        let allProducts = await productFalabella.concat(productParis, productSally);
        await products.createProducts(allProducts);

    } catch (err) {
        console.log(err);
        return false
    }
};

async function run() {
    let loadNbr = await initLoad();
    await scrap();
    await endLoad(loadNbr)
}

run();