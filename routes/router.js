var express = require("express");
var router = express.Router();

var pg = require("pg");

var config = { database: "upsilon" };

// initialize connection Pool
// think of as 'how I connect to DB'
var pool = new pg.Pool(config);

// router.get("/", function(req, res) {
//   // err - an error object, will be non-null if there was some error
//   //       connecting to the DB. ex. DB not running, config is incorrect
//   // client - used to make actual queries against DB
//   // done - function to call when we are finished
//   //        returns the connection back to the pool
//   pool.connect(function(err, client, done) {
//     if (err) {
//       console.log("Error connecting to DB", err);
//       res.sendStatus(500);
//       done();
//     } else {
//       // no error occurred, time to query
//       // 1. sql string - the actual SQL query we want to running
//       // 2. callback - function to run after the database gives us our result
//       //               takes an error object and the result object as it's args
//       client.query("SELECT * FROM pets JOIN owners ON pets.owners_id = owners.id JOIN visits ON pets.id = visits.pets_id", function(err, result) {
//         done();
//         if (err) {
//           console.log("Error querying DB", err);
//           res.sendStatus(500);
//         } else {
//           console.log("Got info from DB", result.rows);
//           res.send(result.rows);
//         }
//       });
//     }
//   });
// });

router.get("/owners", function(req, res) {
  // err - an error object, will be non-null if there was some error
  //       connecting to the DB. ex. DB not running, config is incorrect
  // client - used to make actual queries against DB
  // done - function to call when we are finished
  //        returns the connection back to the pool
  pool.connect(function(err, client, done) {
    if (err) {
      console.log("Error connecting to DB", err);
      res.sendStatus(500);
      done();
    } else {
      // no error occurred, time to query
      // 1. sql string - the actual SQL query we want to running
      // 2. callback - function to run after the database gives us our result
      //               takes an error object and the result object as it's args
      client.query("SELECT id,first_name,last_name FROM owners ", function(err, result) {
        done();
        if (err) {
          console.log("Error querying DB", err);
          res.sendStatus(500);
        } else {
          console.log("Got info from DB", result.rows);
          res.send(result.rows);
        }
      });
    }
  });
});

router.post("/owners", function(req, res) {
  // err - an error object, will be non-null if there was some error
  //       connecting to the DB. ex. DB not running, config is incorrect
  // client - used to make actual queries against DB
  // done - function to call when we are finished
  //        returns the connection back to the pool
  pool.connect(function(err, client, done) {
    if (err) {
      console.log("Error connecting to DB", err);
      res.sendStatus(500);
      done();
    } else {
      // no error occurred, time to query
      // 1. sql string - the actual SQL query we want to running
      // 2. array of data - any data we want to pass to a parameterized statement
      // 3. callback - function to run after the database gives us our result
      //               takes an error object and the result object as it's args
      client.query(
        "INSERT INTO owners (first_name,last_name) VALUES ($1, $2) RETURNING *;",
        [ req.body.firstName, req.body.lastName],
        function(err, result) {
          done();
          if (err) {
            console.log("Error querying DB", err);
            res.sendStatus(500);
          } else {
            console.log("Got info from DB", result.rows);
            res.send(result.rows);
          }
        }
      );
      // client.query(
      //   "INSERT INTO pets (name, breed, color, owners_id) VALUES ($1, $2, $3, $4) RETURNING *;",
      //   [ req.body.name, req.body.breed, req.body.color, req.body.owners_id],
      //   function(err, result) {
      //     done();
      //     if (err) {
      //       console.log("Error querying DB", err);
      //       res.sendStatus(500);
      //     } else {
      //       console.log("Got info from DB", result.rows);
      //       res.send(result.rows);
      //     }
      //   }
      // );
      // client.query(
      //   "INSERT INTO visits (check_in_date, check_out_date, pets_id) VALUES ($1, $2, $3) RETURNING *;",
      //   [ req.body.check_in_date, req.body.check_out_date, req.body.pets_id],
      //   function(err, result) {
      //     done();
      //     if (err) {
      //       console.log("Error querying DB", err);
      //       res.sendStatus(500);
      //     } else {
      //       console.log("Got info from DB", result.rows);
      //       res.send(result.rows);
      //     }
      //   }
      // );
    }
  });
});


router.post("/pet", function(req, res) {
  // err - an error object, will be non-null if there was some error
  //       connecting to the DB. ex. DB not running, config is incorrect
  // client - used to make actual queries against DB
  // done - function to call when we are finished
  //        returns the connection back to the pool
  pool.connect(function(err, client, done) {
    if (err) {
      console.log("Error connecting to DB", err);
      res.sendStatus(500);
      done();
    } else {
      // no error occurred, time to query
      // 1. sql string - the actual SQL query we want to running
      // 2. array of data - any data we want to pass to a parameterized statement
      // 3. callback - function to run after the database gives us our result
      //               takes an error object and the result object as it's args

      client.query(
        "INSERT INTO pets (name, breed, color, owners_id) VALUES ($1, $2, $3, $4) RETURNING *;",
        [ req.body.petName, req.body.breed, req.body.color, req.body.id],
        function(err, result) {
          done();
          if (err) {
            console.log("Error querying DB", err);
            res.sendStatus(500);
          } else {
            console.log("Got info from DB", result.rows);
            res.send(result.rows);
          }
        }
      );

    }
  });
});


router.get("/pet", function(req, res) {
  // err - an error object, will be non-null if there was some error
  //       connecting to the DB. ex. DB not running, config is incorrect
  // client - used to make actual queries against DB
  // done - function to call when we are finished
  //        returns the connection back to the pool
  pool.connect(function(err, client, done) {
    if (err) {
      console.log("Error connecting to DB", err);
      res.sendStatus(500);
      done();
    } else {
      // no error occurred, time to query
      // 1. sql string - the actual SQL query we want to running
      // 2. callback - function to run after the database gives us our result
      //               takes an error object and the result object as it's args
      client.query("SELECT * FROM owners RIGHT JOIN pets ON pets.owners_id=owners.id", function(err, result) {
        done();
        if (err) {
          console.log("Error querying DB", err);
          res.sendStatus(500);
        } else {
          console.log("Got info from DB", result.rows);
          res.send(result.rows);
        }
      });
    }
  });
});

router.get("/visits", function(req, res) {
  // err - an error object, will be non-null if there was some error
  //       connecting to the DB. ex. DB not running, config is incorrect
  // client - used to make actual queries against DB
  // done - function to call when we are finished
  //        returns the connection back to the pool
  pool.connect(function(err, client, done) {
    if (err) {
      console.log("Error connecting to DB", err);
      res.sendStatus(500);
      done();
    } else {
      // no error occurred, time to query
      // 1. sql string - the actual SQL query we want to running
      // 2. callback - function to run after the database gives us our result
      //               takes an error object and the result object as it's args
      client.query("SELECT * FROM visits", function(err, result) {
        done();
        if (err) {
          console.log("Error querying DB", err);
          res.sendStatus(500);
        } else {
          console.log("Got info from DB", result.rows);
          res.send(result.rows);
        }
      });
    }
  });
});


//localhost:3000/books/4
//req.params.id ==='4'
router.put("/pet/:id",function(req,res){
  console.log(req.params.id);
  console.log(req.body.petName);
  console.log(req.body.petBreed);
  console.log(req.body.petColor);
  pool.connect(function(err,client,done){
      if (err){
        console.log('error connecting to DB',err);
        res.sendStatus(500);
        done();
      }else{
        client.query('UPDATE pets SET name=$2,breed=$3,color=$4 WHERE id=$1 RETURNING *',
                      [req.params.id,req.body.petName,req.body.petBreed,req.body.petColor],
                      function(err,result){
                        if (err){
                          console.log('error updating book');
                          res.sendStatus(500);

                        }else {

                          res.send(result.rows);
                        }
                        done();
                      }
                    )
      }

  });

});


router.put("/visits/:id",function(req,res){
  console.log(req.body.state);
  pool.connect(function(err,client,done){
      if (err){
        console.log('error connecting to DB',err);
        res.sendStatus(500);
        done();
      }else{
        client.query('UPDATE pets SET name=$2,breed=$3,color=$4 WHERE id=$1 RETURNING *',
                      [req.params.id,req.body.petName,req.body.petBreed,req.body.petColor],
                      function(err,result){
                        if (err){
                          console.log('error updating book');
                          res.sendStatus(500);

                        }else {

                          res.send(result.rows);
                        }
                        done();
                      }
                    )
      }

  });

});


router.delete("/pet/:id",function(req,res){
  pool.connect(function(err,client,done){
      if (err){
        console.log('error connecting to DB',err);
        res.sendStatus(500);
        done();
      }else{

        client.query('DELETE FROM pets WHERE id=$1;',
                      [req.params.id],
                      function(err,result){
                        if (err){
                          console.log('error deleting pet');
                          res.sendStatus(500);

                        }else {
                          res.sendStatus(204);
                        }
                        done();
                      }
                    )
      }

  });
});
module.exports = router;
