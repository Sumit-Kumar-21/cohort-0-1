const express = require('express');
const app = express();

const port = 3000;

app.get('/', function(req,res){
    res.send("hello i am sumit")
})

app.listen(port, function(){
    console.log(`please type this --> localhost:${port} on your browser`);
})
