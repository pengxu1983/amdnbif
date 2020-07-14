var fs = require('fs'),
xml2js = require('xml2js');
 
var parser = new xml2js.Parser();
fs.readFile('/home/benpeng/Downloads/SearchRequest-85430.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
        console.dir(result.rss.channel[0].item[0].customfields[0].customfield.length);
        console.log('Done');
    });
});
