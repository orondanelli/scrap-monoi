let request = require('request');
let cheerio = require('cheerio');
const sql = require('./config/db');
const helper = require('./helpers/numbers')

let baseURL = 'https://paris.cl'
let complementURL = '/monoi-tiki-tahiti?q=monoi'
let fullURL = baseURL+complementURL

request(fullURL, function (error, response, html) {
    if (!error && response.statusCode == 200) {
        let $ = cheerio.load(html);
        let content = $("ul#search-result-items .main");
        console.log($("ul#search-result-items .main").html())
        let response = content.map(function() {
            return {
                origin: 'Paris',
                src: baseURL + $(this).find('a').attr('href'),
                name: $(this).find('.name-product-plp span').text().trim(),
                price: helper.cleanNumber($(this).find('.price__text').first().text()),
                brand: $(this).find('.brand-product-plp').text().trim()
            }
        });

        console.log(response.toArray());
    }
});
