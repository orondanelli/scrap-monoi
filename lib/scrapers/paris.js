const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
let cheerio = require('cheerio');

const utils = require('../../helpers/utils')

let baseURL = 'https://paris.cl'
let complementURL = '/monoi-tiki-tahiti?q=monoi'
let fullURL = baseURL + complementURL

exports.getProduct = async () => {
    console.log('scrapping Paris.cl ')
    const resp = await fetch(fullURL);
    const html = await resp.text();

    if (resp.ok && resp.status == 200) {
        let $ = cheerio.load(html);
        let content = $("ul#search-result-items .product-tile");
        let response = content.map(function () {
            return {
                origin: 'Paris',
                src: baseURL + $(this).find('a').attr('href'),
                name: $(this).find('.main .name-product-plp span').text().trim(),
                price: utils.cleanPrice($(this).find('.price__text').first().text()),
                brand: $(this).find('.main .brand-product-plp').text().trim(),
                key: $(this).attr('data-itemid')
            }
        });
        return response.toArray()
    } else {
        return false
    }
}
