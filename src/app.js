const path = require('path')
const express = require('express')
const hbs = require('hbs')

const bodyParser = require('body-parser');


const app = express()

const pathPublic = path.join(__dirname, '../public')
const pathViews = path.join(__dirname, '../templates/views')
const pathPartials = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', pathViews)

hbs.registerPartials(pathPartials)

app.use(express.static(pathPublic))

app.use(bodyParser.urlencoded({ extended: true }));

app.get('', (req, res) => {
    res.render('index')
})

app.get('/teste', (req, res) => {
    res.render('teste')
})

app.post('/game', function (req, res) {
    console.log(req.body.name)
    res.render('teste', { name: req.body.name });
});

//const port = process.env.port || 3000

app.listen(3001, () => {
    console.log(`Server is up at the port `)
})