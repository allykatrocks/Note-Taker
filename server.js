const express = require('express');
const path = require('path');
var db = require('./db/db.json');
var uniqid = require('uniqid');
const fs = require('fs');
const { stringify } = require('querystring');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

app.get('/api/notes', (req, res) => res.json(db));

app.post('/api/notes', (req, res) => {
    console.log(req.body);
    const note = 
    {
        id: uniqid(),
        title: req.body.title,
        text: req.body.text
    }
    console.log(note);
    db.push(note);
    fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {err ? console.log(err): console.log('success')
res.json(db)})
})

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
