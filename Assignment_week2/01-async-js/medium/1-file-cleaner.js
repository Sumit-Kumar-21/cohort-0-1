/* File cleaner
Read a file, remove all the extra spaces and write it back to the same file.

For example, if the file input was
```
hello     world    my    name   is       raman
```

After the program runs, the output should be

```
hello world my name is raman
```*/

const fs = require('fs')

function writefile(content) {
    
    fs.writeFile("./b-clear.txt",content,"utf-8", function(err){
        if (err) {
            console.log(err);
        }else{
            console.log("Write in file is successful!");
        }
    })
}

function readfile(callback) {
    fs.readFile("./b.txt", "utf-8", function(err, data){
        if (err) {
            console.log(err);
        }else{
            callback(data, writefile)
        }
    })
}

function cleanText(data, callback2){
    callback2(data.replace(/\s+/g,' ').trim());
}

readfile(cleanText)