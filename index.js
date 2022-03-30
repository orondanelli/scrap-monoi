let request = require('request');
let cheerio = require('cheerio');

var url = 'https://www.paris.cl/monoi-tiki-tahiti?q=monoi'
request(url, function (error, response, html) {
    if (!error && response.statusCode == 200) {
        let $ = cheerio.load(html);
        let content = $("ul#search-result-items .main");
        let response = content.map(function() {
            return {
                name: $(this).find('.name-product-plp span').text().trim(),
                price: $(this).find('.price__text').text().trim(),
            }
        });

        console.log(response.toArray());
    }
});
