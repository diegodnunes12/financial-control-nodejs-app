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
    'url': 'http://localhost:3000/orders',
    'headers': {
    }
  }

  request(options, function (error, response) {
    if (error) throw new Error(error);

    let orders = JSON.parse(response.body)

    res.render('index', {
      orders: orders
    })
  })
  
})

app.post('/addOrder', function (req, res) {
    
  var options = {
      'method': 'POST',
      'url': 'http://localhost:3000/orders',
      'headers': {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"date":"" + req.body.date + "","name":"" + req.body.name + "","description":"" + req.body.description + "","value":"" + req.body.value + "","revenue":false,"settled":false,"category_id":"5effb2b80b241e1830fa098e"})
    
    }
    request(options, function (error, response) {
      if (error) throw new Error(error)
      console.log(response.body)

      
    })
    res.render('index', { name: req.body.name });
})


/* Get all categories */
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

/* Add a new category */
app.post('/add-category', function (req, res) {

  var options = {
      'method': 'POST',
      'url': 'http://localhost:3000/categories',
      'headers': {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"name": "" + req.body.name + ""})
    
    };
    request(options, function (error, response) {
      if (error) throw new Error(error)

      res.redirect('/categories')
    })    
})

/* Update a category */
app.post('/update-category', function (req, res) {
  var options = {
    'method': 'PATCH',
    'url': `http://localhost:3000/categories/${req.body.id}`,
    'headers': {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"name":"" + req.body.name + ""})  
  }

  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);

    res.redirect('/categories')
  })  
})

/* Delete a category */
app.get('/delete-category', (req, res) => {
  let options = {
    'method': 'DELETE',
    'url': `http://localhost:3000/categories/${req.query.id}`,
    'headers': {
    }
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);

    res.redirect('/categories')
  })  
})

//const port = process.env.port || 3000

app.listen(3001, () => {
    console.log(`Server is up at the port `)
})