/* ## Reading the contents of a file

Write code to read contents of a file and print it to the console. 
You can use the fs library to as a black box, the goal is to understand async tasks. 
Try to do an expensive operation below the file read and see how it affects the output. 
Make the expensive operation more and more expensive and see how it affects the output. */


const { log } = require('console');
const fs = require('fs')

function readfile(callback) {
    
    fs.readFile("./a.txt", "utf-8", function(err, data){
        if (err) {
            console.log(err);
        }else{
            callback(data)
        }
        console.log('inside the fs.readfile callback fuction');
    })
    console.log("after file read inside the readfile function");
}

function printfilecont(data) {
    console.log(data);
}

function timedelay(n) {
    let a = 0;
    for (let i = 0; i < n; i++) {
        a=a+i;
    }
    return a
}

readfile(printfilecont);
console.log("after calling function readfile");
console.log(timedelay(10000000));