const path = require('path')
const express = require('express')
const hbs = require('hbs')
const orders = require('./util/orders')


const app = express()

const pathPublic = path.join(__dirname, '../public')
const pathViews = path.join(__dirname, '../templates/views')
const pathPartials = path.join(__dirname, '../templates/partials')

const hostApi = 'http://localhost:3000/orders/'

app.set('view engine', 'hbs')
app.set('views', pathViews)

hbs.registerPartials(pathPartials)

app.use(express.static(pathPublic))

app.get('/orders', (req, res) => {

    orders(`${hostApi}`, (err, body) => {
        if(err){

            return res.status(err.code).json({error : {
                message : 'Not Found',
                code : err.code
            }})
        }

        res.status(200).json(body)
    }) 
})

app.get('/orders/:id', (req, res) => {

    const _id = req.params.id

    orders(`${hostApi}${_id}`, (err, body) => {
        if(err){

            return res.status(err.code).json({error : {
                message : 'Not Found',
                code : err.code
            }})
        }
        res.status(200).json(body)
    }) 
})


app.get('', (req, res) => {
    res.render('index')
})

//const port = process.env.port || 3000

app.listen(3001, () => {
    console.log(`Server is up at the port `)
})