const fs = require('fs'); //file system
const http = require('http');

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
const server = http.createServer((req, res) => {
    res.end('Hello from the server!');
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
});