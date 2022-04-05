const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
let cheerio = require('cheerio');

const helper = require('../../helpers/numbers')

let baseURL = 'https://www.sallybeauty.cl'
let complementURL = '/piel/cuerpo-y-manos/monoi-tiki-tahiti?PS=72'
let fullURL = baseURL+complementURL

exports.getProduct = async () => {
    console.log('scrapping Sallybeauty.cl')
    const resp = await fetch(fullURL);
    const html = await resp.text();

    if (resp.ok && resp.status == 200) {
        let $ = cheerio.load(html);
    let content = $(".main .resultItemsWrapper");
    let response = content.map(function() {
        return {
            origin: 'Sally',
            name: $(this).find('.product-image-hover').attr('title'),
            brand: $(this).find('texto .brand').text(),
            src: $(this).find('.product-image-hover').attr('href')
        }
    });
    return response.toArray()
    } else {
        return false
    }
}
