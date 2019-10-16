const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
var readline = require('readline');
const baseUrl = 'https://home.mikezhu.cn/';
let list = [];

fs.readdir('./docs/', function (error, files) {
    console.log(files)
    list = [];
    files.forEach(file => {
        if(file.substring(file.length-3, file.length) === '.md'){
            list.push(file);
        }
    })
    modifyList('docs');
});

fs.readdir('./paper-read/', function (error, files) {
    console.log(files)
    list = [];
    files.forEach(file => {
        if(file.substring(file.length-3, file.length) === '.md'){
            list.push(file);
        }
    })
    modifyList('paper-read');
});

function modifyList(folder) {
    let content = fs.readFileSync('./index.html');
    $ = cheerio.load(content);
    let dom = $('#contents');
    dom.empty();
    let containername = '';
    if (folder == 'docs'){
        containername = 'ol_container';
    } else {
        containername = 'ln_container';
    }
    let ul = `<ol id="${containername}" class="container"></ol>`;
    dom.append(ul);
    let container = $(`#${containername}`);


    list.forEach((item, index) => {
        let p = path.join('./' + folder + '/', item);
        console.log(p);
        let markdown = fs.readFileSync(p).toString();

        let markdownLines = markdown.split('\n');
        let title = markdownLines[0].replace('# ', '');
        console.log('title Out: ' + title);
        let url = `${baseUrl}/${folder}/${item.substring(0, item.length - 3)}`;
        
        if (markdownLines.length > 2 && markdownLines[2].startsWith('<!--')){
            let timestamp = markdownLines[2].replace('<!--', '').replace('-->', '');
            let li = `<li><a href=${url}>${title}</a><font size='2' color='#888888'>&nbsp;${timestamp}</font></li>\n`;
            container.append(li);
        } else {
            let li = `<li><a href=${url}>${title}</a></li>\n`;
            container.append(li);
        }

        if (markdownLines.length > 1 && markdownLines[1].startsWith('<!--')){
            let abstruct = markdownLines[1].replace('<!--', '').replace('-->', '');
            let li_abs = `<div class="li_inline">${abstruct}</div>\n`;
            container.append(li_abs);
        }


        
        
    });

    fs.writeFile('./index.html', $.html(), function () { });
}