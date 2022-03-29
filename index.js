let request = require('request');
let cheerio = require('cheerio');

var url = 'https://www.paris.cl/monoi-tiki-tahiti?q=monoi'
request(url, function (error, response, html) {
    if (!error && response.statusCode == 200) {
        //console.log(html);
        let $ = cheerio.load(html)
        let title = $("title").text();
        let div = $("div").text();
        console.log(div)
    }
});