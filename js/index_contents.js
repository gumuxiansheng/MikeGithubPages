const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
var readline = require('readline');
const baseUrl = 'https://home.mikezhu.cn/docs/';
let list = [];

fs.readdir('./docs/', function (error, files) {
    console.log(files)
    files.forEach(file => {
        if(file.substring(file.length-3, file.length) === '.md'){
            list.push(file);
        }
    })
    modifyList();
});

function modifyList() {
    let content = fs.readFileSync('./index.html');
    $ = cheerio.load(content);
    let dom = $('#contents');
    dom.empty();
    let ul = `<ol class="container"></ol>`;
    dom.append(ul);
    let container = $('.container');


    list.forEach((item, index) => {
        let p = path.join('./docs/', item);
        let markdown = fs.readFileSync(p).toString();

        let title = markdown.split('\n')[0].replace('# ', '');
        console.log('title Out: ' + title);
        let url = `${baseUrl}${item.substring(0, item.length - 3)}`;
        let li = `<li><a href=${url}>${title}</a></li>\n`;
        container.append(li);
    });

    fs.writeFile('./index.html', $.html(), function () { });
}