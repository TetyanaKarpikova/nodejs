const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');
const fs = require('fs');
const { json } = require('express');

const app = express();

const filePath = path.join(__dirname, 'lesson2', 'users.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'views ')));

app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({
    defaultLayout: false
}))

app.set('views', path.join(__dirname, 'views'));

app.listen(5000, () => {
    console.log('App listen 5000');
})


app.get('/register', (req, res) => {
    res.render('register');
})

app.post('/register', (req, res) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        
        let jsonData = JSON.parse(data.toString());
        let {email} = req.body;
        let findUser = jsonData.find(item => {
            return item.email === email;
        })

        if (findUser) {
            res.redirect('/error');
            return;            
        }

        jsonData.push(req.body);
        fs.writeFile(filePath, JSON.stringify(jsonData), errW => {
            if (errW) {
                console.log(errW);
                return;
            }
        })

        res.redirect('/users');
    })
  
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/login', (req, res) => {  
    let {email, password} = req.body;
    
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        let jsonData = JSON.parse(data.toString());
        let findUserId = jsonData.findIndex( (item, index) => {                       
            return item.email === email && item.password === password;
        })
        if (findUserId === -1) {                        
            res.redirect('/register');
            return;
        }
        res.redirect(`/users/${findUserId}`)
        
    })
})


app.get('/users', (req, res) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        let users = JSON.parse(data.toString());
        res.render('users', {users});
    })
})

app.get('/users/:userId', (req, res) => {
    fs.readFile(filePath, (err,  data) => {
        if (err) {
            console.log(err);
            return;
        }
        let jsonData = JSON.parse(data.toString());
        const {userId} = req.params;   

        res.render('users', {user: jsonData[userId]});
    })
})


app.get('/error', (req, res) => {
    res.render('error');
})
