const express = require("express");
const cors = require('cors')
const port = 3080;
const app = express();


app.use(cors());

app.get("/calculate", (req, res)=>{
    const principalamt = parseInt(req.query.a)
    const roi = parseInt(req.query.b)
    const time = parseInt(req.query.c)

    const totalretutn= principalamt*(1 + (roi/100)*time)
    const interest = totalretutn-principalamt

    const html = `<b>Final amount: ${totalretutn}<b><br><p>Profit:${interest}<p>`

    res.json({html});
})

app.listen(port, ()=> {console.log("server is started at port 3080");})