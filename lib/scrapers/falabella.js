const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
let cheerio = require('cheerio');
const helper = require('../../helpers/numbers')

var url = 'https://www.falabella.com/falabella-cl/category/cat7660002/Belleza--higiene-y-salud?f.product.brandName=monoi%3A%3Amonoi+tiki+tahiti&sred=monoi'

exports.getProduct = async () => {
    console.log('scrapping Falabella.cl ')
    const resp = await fetch(url);
    const html = await resp.text();
    if (resp.ok && resp.status == 200) {
        
        let $ = cheerio.load(html);
        let content = $("div#testId-searchResults-products .grid-pod .pod");

        let response = content.map(function () {
            return {
                origin: 'Falabella',
                src: $(this).find('a').attr('href'),
                name: $(this).find('div a span .pod-subTitle').text().trim(),
                price: helper.cleanPrice($(this).find('a div ol li div .copy10').text().trim()),
                brand: $(this).find('.pod-title').text().trim(),
                key: $(this).attr('data-key')
            }
        });
    return response.toArray()
    } else {
        return false
    }
}
