var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg') // Programmatic (https://node-postgres.com/features/connecting)

// Connect db
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'nodepostgre',
  password: 'xxx',
  port: 5432,
})

/* GET home page. */
router.get('/', function(req, res, next) {
    pool.query('SELECT * FROM contact', (err, res) => {
    console.log(err, res)
    pool.end()
  })
  res.render('index', { title: 'Express' });
});

// CREATE db - GET
router.get('/new', function(req, res, next) {
  res.render('new', { title: 'Add New Data' });
});

// CREATE db - POST
router.post('/new', function(req, res, next) {
  // Get data
  var name = req.body.name, age = req.body.age;
  pool.query('INSERT INTO contact (name, age) VALUES ($1, $2)', [name, age], (err, res) => {
    pool.end()
  });
  res.render('new', { title: 'Add New Data' });
});

module.exports = router;