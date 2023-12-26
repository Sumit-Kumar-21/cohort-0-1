/* ## Write to a file
Using the fs library again, try to write to the contents of a file.
You can use the fs library to as a black box, the goal is to understand async tasks. */

const fs = require('fs')

function writefile(content, callback) {
    
    fs.writeFile("./a.txt",content,"utf-8", function(err){
        if (err) {
            console.log(err);
        }else{
            console.log("Write in file is successful!");
        }
    })
    callback(readfile)
}

function readfile() {
    fs.readFile("./a.txt", "utf-8", function(err, data){
        if (err) {
            console.log(err);
        }else{
            console.log(data);
        }
    })
}

let contentToWrite= "helldoajfoajksdhksnfukjndfkuhkjcnafbkjdabfbsdjflvb"

writefile(contentToWrite, readfile)