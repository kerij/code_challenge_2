var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/code_challenge';
var random = require('./random.js');


router.get('/', function(req, res) {
  //Retrieve books from database
  pg.connect(connectionString, function(err, client, done){
    if (err) {
      res.sendStatus(500);
    }

    client.query('SELECT * FROM animals', function (err, result){
      done(); //closes connection

      if (err) {
        res.sendStatus(500);
      }

      res.send(result.rows);
    })
  });
});

router.post('/', function(req, res){
  var animal = req.body;
  console.log(animal);

  pg.connect(connectionString, function(err, client, done){
    if (err) {
      res.sendStatus(500);
    }

    client.query('INSERT INTO animals(type_animal, num_animal)'
                + 'VALUES ($1, $2)',
                [animal.type, random(1,100)],
                function (err, result) {
                  done();

                  if (err) {
                    console.log(err);
                    res.sendStatus(500);
                  } else {res.sendStatus(201);
                  }


                });
  });
});



module.exports = router;
