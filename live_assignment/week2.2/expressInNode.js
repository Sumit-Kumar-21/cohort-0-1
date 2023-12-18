const express = require('express');
const app = express();

const port = 3000;

function calculateSum(n) {
    let a=0;
    for (let i = 1; i <= n; i++) {
        a+=i;   
    }
    return a;
}

app.get('/', function(req,res){
    const n= req.query.n;
    const ans=calculateSum(n);
    const responseString = `Type '/?n=<any number>' in the search bar. You typed: ${n} and the sum is ${ans.toString()}`;
    res.send(responseString);
})

app.listen(port, function(){
    console.log(`please type this --> localhost:${port} on your browser`);
})
