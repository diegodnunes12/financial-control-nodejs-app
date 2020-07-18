const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const bodyParser = require('body-parser');


const app = express()

const pathPublic = path.join(__dirname, '../public')
const pathViews = path.join(__dirname, '../templates/views')
const pathPartials = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', pathViews)

hbs.registerPartials(pathPartials)

app.use(express.static(pathPublic))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('', (req, res) => {

  var options = {
    'method': 'GET',
    'url': 'http://localhost:3000/categories',
    'headers': {
    }
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);

    let categories = JSON.parse(response.body)

    categories.forEach(element => {
      console.log(element.name);
    });

    
  });

    res.render('index')
})

app.get('/categories', (req, res) => {

  var options = {
    'method': 'GET',
    'url': 'http://localhost:3000/categories',
    'headers': {
    }
  }

  request(options, (error, response) => {
    if (error) throw new Error(error)

    let categories = JSON.parse(response.body)
    
    res.render('category', {
      categories: categories
    })
  })  
})

app.post('/categories', function (req, res) {
    
  var options = {
      'method': 'POST',
      'url': 'http://localhost:3000/categories',
      'headers': {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"name": "" + req.body.name + ""})
    
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
    });

    var options1 = {
      'method': 'GET',
      'url': 'http://localhost:3000/categories',
      'headers': {
      }
    }
  
    request(options1, (error1, response1) => {
      if (error1) throw new Error(error1)
  
      let categories1 = JSON.parse(response1.body)
      
      res.render('category', {
        categories: categories1
      })
    })
    //res.render('category')
})

app.post('/teste', function (req, res) {
  res.send('tsete')
})

app.post('/addOrder', function (req, res) {
    
    var options = {
        'method': 'POST',
        'url': 'http://localhost:3000/orders',
        'headers': {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"date":"" + req.body.date + "","name":"" + req.body.name + "","description":"" + req.body.description + "","value":"" + req.body.value + "","revenue":false,"settled":false,"category_id":"5effb2b80b241e1830fa098e"})
      
      };
      request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
      });

    console.log(req.body.name)
    res.render('index', { name: req.body.name });
});



//const port = process.env.port || 3000

app.listen(3001, () => {
    console.log(`Server is up at the port `)
})