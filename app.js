var client = require("./connection.js");
var express = require('express');
var app = express();
const path = require('path'); // Require library to help with filepaths
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false })); // Middleware to recognize strings and arrays in requests
app.use(express.json()); // Middleware to recognize json in requests
app.use(express.static("public")); // Must have this or else access to index.js will 404

// Homepage route
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

//**************************************** part A *****************************************/

// Route to search for Articles by title (Child proof)
//http://localhost:3000/search-title/safe/Away (this example removes one PG movie as compared to unsafe (next part))
app.get('/search-title/safe/:random', function (req, res) {
    // Query using slop to allow for unexact matches 
    client.search({
    index: 'netflix',
    body: {
        "size": 5,
        "query": {  
            "bool" : {
                "must" : {
                  "match_phrase" : { "title" : { query: req.params.random} }
                },
                "must_not" : {
                    "match_phrase" : { "rating" : "R" },
                    "match_phrase" : { "rating" : "NC" },
                    "match_phrase" : { "rating" : "PG" }
                },
                
              }
        }
    }
   
    }).then(function(resp) {
        console.log("Successful query! Here is the response:", resp);
        res.send(resp);
    }, function(err) {
        console.trace(err.message);
        res.send(err.message);
    });
  });
  
// Adult version (Unsafe)
// http://localhost:3000/search-title/Away 
app.get('/search-title/:title', function (req, res) {
    // Query using slop to allow for unexact matches 
    client.search({
    index: 'netflix',
    body: {
        "size": 5,
        "query": {  
            "match_phrase": {
              "title": { query: req.params.title, slop: 5}
            }
      }
    }
   
    }).then(function(resp) {
        console.log("Successful query! Here is the response:", resp);
        res.send(resp);
    }, function(err) {
        console.trace(err.message);
        res.send(err.message);
    });
  });

//**************************************** part B *****************************************/
// http://localhost:3000/paginate?pageno=2&pagesize=10&type=Movie
//req.query.pagesize - TV or movies
//req.query.type - name of the tv show or movie

app.get('/paginate', function (req, res) {
    var offset=(req.query.pageno-1) * req.query.pagesize;
    client.search({
    index: 'netflix',
    body: { 
        "from" : offset,
        "size" : req.query.pagesize,
        "query": {
              "bool": { 
                  "must": [{ "match":{ "type": req.query.type } }]
              }
          },
        "sort": [{ "release_year" : { "order": "desc" } } ]
    }
    
    }).then(function(resp) {
        console.log("Successful query! Here is the response:", resp);
        res.send(resp);
    }, function(err) {
        console.trace(err.message);
        res.send(err.message);
    });
  });

    
//**************************************** part C *****************************************/
//a. Exact match Endpoint:
// http://localhost:3000/custom/exact?field=title&value=Away
// http://localhost:3000/custom/exact?field=director&value=David
app.get('/custom/exact', function (req, res) {
    var key={}
    key[req.query.field]={query : req.query.value}
    client.search({
    index: 'netflix',
    body: {
        "query": {
          "bool": { 
            "must": [{ "match": key}]
          }
      },
    }
   
    }).then(function(resp) {
        console.log("Successful query! Here is the response:", resp);
        res.send(resp);
    }, function(err) {
        console.trace(err.message);
        res.send(err.message);
    });
  });

//b. Prefix match Endpoint:
// http://localhost:3000/custom/prefix?value=After
// http://localhost:3000/custom/prefix?value=After%20a%20long
// http://localhost:3000/custom/prefix?value=After%20a%20long%20absence
app.get('/custom/prefix', function (req, res) {
  client.search({
    index: 'netflix',
    body: {
        "query": {
          "match_phrase_prefix": {
            "description": {
              "query": req.query.value
            }
          }
        }
    }
   
    }).then(function(resp) {
        console.log("Successful query! Here is the response:", resp);
        res.send(resp);
    }, function(err) {
        console.trace(err.message);
        res.send(err.message);
    });
  });

//c. Genre Matching Endpoint:
// http://localhost:3000/custom/genre?q="TV AND Comedy"
// http://localhost:3000/custom/genre?q="TV AND (Horror OR Korean)"
// AND and OR must me all capital
app.get('/custom/genre', function (req, res) {
  
  client.search({
    index: 'netflix',
    body: {
      "query": {
        "query_string" : {
            "query" : req.query.q,
            "default_field" : "listed_in"
        }
      }
    }
   
    }).then(function(resp) {
        console.log("Successful query! Here is the response:", resp);
        res.send(resp);
    }, function(err) {
        console.trace(err.message);
        res.send(err.message);
    });
  });


//**************************************** part C End *****************************************/

// Start listening for requests on port 3000
app.listen(3000, function () {
  console.log('App listening for requests...');
});

/*app.get('/search-title/:title', (req, res)=>{
    let query = {
        index: 'netflix',
        id: req.params.id
    }
    client.get(query)
    .then(resp=>{
        if(!resp){
            return res.status(404).json({
                product: resp
            });
        }

        return res.status(200).json({
            product: resp
        });
    }).catch(err => {
        return res.status(500).json({
            msg:'Error, not found',
            err
        });
    });
})*/
/*app.get('/search-title/:title', function (req, res) {
    // Access title like this: req.params.title

    // Query using slop to allow for unexact matches 
    client.search({
    index: 'netflix',
    type: 'string',
    body: {
      "query": {  
        "match_phrase": {
          "Title": { query: req.params.title, slop: 100 }
        }
      }
    }
   
    }).then(function(resp) {
        console.log("Successful query! Here is the response:", resp);
        res.send(resp);
    }, function(err) {
        console.trace(err.message);
        res.send(err.message);
    });
  });
*/