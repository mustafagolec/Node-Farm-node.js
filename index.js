const fs = require('fs'); //file system
const http = require('http');
const url = require('url');
const slugify = require('slugify'); //This is for making urls look better (../product?id=avocados instead of ../product?id=0)
const replaceTemplate = require('./modules/replaceTemplate'); //We have imported our module "replaceTemplate.js" and the function inside it.

///////////////////////////
//FILE OPERATIONS

//Synchronous Way
/* const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
const textOut = `This is what we know about avacados: ${textIn}.\nCreated on ${Date.now()}`;
console.log(textOut);
fs.writeFileSync('./txt/outputTest.txt', textOut);
console.log('File has been successfully written!'); */

//Asynchronous Way
/* fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
    if(err) return console.log(`AN ERROR OCCURED WHILE READING YOUR FILE`);

    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);
        fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
            console.log(data3);

            fs.writeFile('./txt/FINAL.txt', `${data2}\n${data3}`, 'utf-8', err=>{
                console.log('Your file has been written');
            })
        });
    });
});
console.log('Will read file!'); */

///////////////////////////
//SERVER

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8'); //We have seperated api code here to prevent load api data every time when user gets to /api route 
const dataObj = JSON.parse(data); //This code will be executed once when the site loads for the first time.

const slugs = dataObj.map(el => slugify(el.productName, {lower:true}));
console.log(slugs);


const server = http.createServer((req, res) => {  //this section is called each time there is a request

    const { query, pathname } = url.parse(req.url, true);



    //Overview Page
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, { 'content-type': 'text/html' });

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

        res.end(output);
    }//Product Page
    else if (pathname === '/product') {
        res.writeHead(200, { 'content-type': 'text/html' });
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);
    }//API
    else if (pathname === '/api') {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(data);
    }//Not found
    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        }); //it writes an error code to console (check the console in your browser)
        res.end('<h1>404: Not Found</h1>');
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Server is running: 127.0.0.1:8000');
});