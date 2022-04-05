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
    let content = $(".main .resultItemsWrapper .vitrine div ul li");
    let response = content.map((index,item) => {
        return {
            origin: 'Sally',
            src: $(item).find('.product-image-hover').attr('href'),
            name: $(item).find('.product-image-hover').attr('title'),
            price: helper.cleanPrice($(item).find('.best-price').text().trim()),
            brand: $(item).find('p.brand').text().trim(),
            key: $(item).find('#rr-product-id').text()
        }
    });
    return response.toArray().filter(item => item.name !== undefined)
    } else {
        return false
    }
}