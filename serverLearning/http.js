/* Assignment - we are going to log the user request in our website*/

const http = require('http');
const fs = require('fs');
const requestIp = require('request-ip'); 

let count =1;

const myserver = http.createServer((req, res)=> {
    if (req.url=== '/favicon.ico') return res.end();
    const log = `${count}. Time: (${new Date().toLocaleString()}), search: (${req.url}), clintIP: (${requestIp.getClientIp(req)})\n`;
    count++;

    fs.appendFile('./userlog.txt', log ,'utf-8', (err)=>{
        if(err) console.error(err);
        switch (req.url) {
            case '/':
                res.end("This is Homepage");
                break;
            case '/about':
                res.end("I am Sumit Kumar form Bihar");
                break;
            case '/contact-us':
                res.end("+91 9999555511");
                break;
            default:
                res.end("404 page not found")
                break;
        }
    });

});

myserver.listen(3000, () => {
    console.log("go to localhost:3000");
});