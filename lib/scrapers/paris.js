const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
let cheerio = require('cheerio');

const helper = require('../../helpers/numbers')

let baseURL = 'https://paris.cl'
let complementURL = '/monoi-tiki-tahiti?q=monoi'
let fullURL = baseURL+complementURL

exports.getProduct = async () => {
    const resp = await fetch(fullURL);
    const html = await resp.text();

    if (resp.ok && resp.status == 200) {
        let $ = cheerio.load(html);
    let content = $("ul#search-result-items .main");
    let response = content.map(function() {
        return {
            origin: 'Paris',
            src: baseURL + $(this).find('a').attr('href'),
            name: $(this).find('.name-product-plp span').text().trim(),
            price: helper.cleanPrice($(this).find('.price__text').first().text()),
            brand: $(this).find('.brand-product-plp').text().trim()
        }
    });
    return response.toArray()
    } else {
        return false
    }
}
