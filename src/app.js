const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')

const app = express()

const pathPublic = path.join(__dirname, '../public')
const pathViews = path.join(__dirname, '../templates/views')
const pathPartials = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', pathViews)

hbs.registerPartials(pathPartials)

app.use(express.static(pathPublic))

const ords = (callback) => {   

    const url = `http://localhost:3000/orders`

    request({url: url, json: true}, (err, response) => {
        if(err){
            callback({
                message : `Something went wrong ${err}`,
                code : 500
            }, undefined)
           
        }

        console.log(response.body[0])
        
        if(response.body === undefined){
            callback({
                message : `No data found`,
                code : 404
            }, undefined)
        }else{
            const parseJson = response.body[0]

            const {name} = parseJson

            callback(undefined, {name})     
        }   
    })
}

app.get('/orders', (req, res) => {

    ords((err, body) => {
        if(err){

            return res.status(err.code).json({error : {
                message : 'Not Found',
                code : err.code
            }})
        }

        console.log(body)
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