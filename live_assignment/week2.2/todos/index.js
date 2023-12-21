const express = require('express');
const fs = require('fs');
const data = require('./data.json');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false}));

app.get('/', (req, res)=>{
    const html = `
    <h3>Hello this is todo app</h3>
    `
    res.send(html);
})
app.get('/createdTodos', (req, res)=>{
    res.send(data);
})

app.get('/createdTodos/:date', (req, res)=>{
    const inputDate = req.params.date;
    const findDate = data.find((findDate)=> findDate.date === inputDate)
    res.send(findDate)
})

app.post('/createTodo', (req, res)=>{
    const bodyres= req.body;
    data.push(bodyres);
    fs.writeFile('./data.json', JSON.stringify(data), (err)=>{
        if (err) throw err;
    })
    res.json({ message: "todos Created Successfully", Created: data})

})

app.patch('/changeTodo/:date', (req, res)=>{
    const inputDate = req.params.date;
    const updatedtodos = req.body;
    const dataIndex = data.findIndex((findDate)=> findDate.date === inputDate)

    if ( dataIndex !== -1){
        data[dataIndex] = {...data[dataIndex], ...updatedtodos}
        fs.writeFile('./data.json', JSON.stringify(data), ()=>{});
        res.json({ message: 'Todo updated successfully'});
        } else {
          res.status(404).json({ message: 'date not found' });
        }
})

app.delete('/deleteTodo/:date', (req, res)=>{
    const inputDate = req.params.date;
    const dataIndex = data.findIndex((findDate)=> findDate.date === inputDate)

    if ( dataIndex !== -1){
        data.splice(dataIndex,1);
        fs.writeFile('./data.json', JSON.stringify(data), ()=>{});
        res.json({ message: 'Todo deleted successfully', Preview: data[dataIndex]});
        } else {
          res.status(404).json({ message: 'date not found' });
        }
})

app.listen(port, ()=>{console.log("server started")})