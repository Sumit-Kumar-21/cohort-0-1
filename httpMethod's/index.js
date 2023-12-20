const express = require('express');
const fs = require('fs')
const bodyParser = require('body-parser');
const port = 3000;
const app = express();
const data = require('./MOCK_DATA.json')
const requestIp = require('request-ip'); 

app.use(express.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res)=>{
    res.send(`Welcome to our website, here is your IP: '${requestIp.getClientIp(req)}'`)
})

app.get('/users', (req, res)=>{
    // res.json(data);
    const html= `
    <ul>
    ${data.map(data => `<li>${data.first_name}</li>`).join("")}
    </ul>
    `
    return res.send(html);
})

app.get('/api/users', (req, res)=>{
    return res.json(data);
})
// Rest api 
app.route('/api/user/:id')
    .get((req, res)=>{
        const id = Number(req.params.id);
        const user = data.find((user)=> user.id === id)
        return res.send(user)
    })
    .patch((req, res)=>{
        const userId = Number(req.params.id);
        const updatedUser = req.body;
        const userIndex = data.findIndex((user)=> user.id === userId);

        if(userIndex !== -1) {
            data[userIndex] = { ...data[userIndex], ...updatedUser };
            fs.writeFile('./MOCK_DATA.json', JSON.stringify(data), ()=>{});
            res.json({ message: 'User updated successfully', user: data[userIndex] });
        } else {
          res.status(404).json({ message: 'User not found' });
        }
    })
    .delete((req, res)=>{
        const userId = Number(req.params.id);
        //let usersData = JSON.parse(fs.readFileSync('./MOCK_DATA.json', 'utf8'));
        const userIndex = data.findIndex((user)=> user.id === userId);

        if (userIndex !== -1) {
            data.splice(userIndex, 1);
        
            // Update the users.json file with the modified data
            fs.writeFileSync('./MOCK_DATA.json', JSON.stringify(data));
        
            res.json({ message: 'User deleted successfully' });
          } else {
            res.status(404).json({ message: 'User not found' });
          }
    })

app.post('/api/users', (req, res)=>{
    const body = req.body;
    data.push({id: data.length+1, ...body})
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(data), (err, response)=>{
        
        return res.json({ status: "Sucess", id: data.length});

    })
})

app.listen(port, ()=>{
    console.log("server started at port 3000")
})
