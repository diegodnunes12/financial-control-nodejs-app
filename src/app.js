const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

const pathPublic = path.join(__dirname, '../public')
const pathViews = path.join(__dirname, '../templates/views')
const pathPartials = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', pathViews)

hbs.registerPartials(pathPartials)

app.use(express.static(pathPublic))

app.get('', (req, res) => {
    res.render('index')
})

const port = process.env.port || 3000

app.listen(port, () => {
    console.log(`Server is up at the port ${port}`)
})