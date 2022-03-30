let request = require('request');
let cheerio = require('cheerio');
const helper = require('./helpers/numbers')

var url = 'https://www.falabella.com/falabella-cl/category/cat7660002/Belleza--higiene-y-salud?f.product.brandName=monoi%3A%3Amonoi+tiki+tahiti&sred=monoi'
request(url, function (error, response, html) {
    if (!error && response.statusCode == 200) {
        let $ = cheerio.load(html);
        let content = $("div#testId-searchResults-products .grid-pod .pod");

        let response = content.map(function() {
            return {
                origin: 'Falabella',
                src: $(this).find('a').attr('href'),
                name: $(this).find('div a span .pod-subTitle').text().trim(),
                price: helper.cleanNumber($(this).find('a div ol li div .copy10').text().trim()),
                brand: $(this).find('.pod-title').text().trim()
            }
        });
        //console.log($('.prices ol li[class=prices-0] div span'))
        console.log(response.toArray());

    }
});
