const express = require("express");
const { router } = require("./routes/route");
const PORT = process.env.PORT || 3000
const app = express();

app.use(express.json());
// routing
app.use("/api/v1/surveys", router)


app.listen(PORT, (error)=>{
    if(error){
        console.log(error);
    }else{
        console.log(`server started on port: ${PORT}`);
    }
})
