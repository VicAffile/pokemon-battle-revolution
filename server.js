const express = require('express');
const swig = require('swig');
const path = require('path');
const bodyParser = require('body-parser');

let app = express();
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.get('/', function(req, res) {
    let data = { titre: 'Liste des Pokémons' };
    res.render('index', data);
});

app.listen(8080);
console.log("L'application tourne.");