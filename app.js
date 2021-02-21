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
//http://localhost:3000/search-title/safe/Away (removes one PG movie compared to unsafe)
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
// Route to search for Articles by title
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
//TV
app.get('/paginate/tv', function (req, res) {
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
  
//Mpvies
app.get('/paginate/movies', function (req, res) {
    // Query using slop to allow for unexact matches 
    client.search({
    index: 'netflix',
    body: { 
        "from" : offset,
        "size" : inp['pageSize'],
        "query": {
              "bool": { 
                  "must": [{ "match":{ "type": inp['type'] } }]
              }
          },
        "sort": [{ "release_year" : { "order": "desc" } } ]
    }
    
    /*{
        "size": 5,
        "query": {  
            "match_phrase": {
              "title": { query: req.params.title, slop: 5}
            }
      }*/
    
    
    }).then(function(resp) {
        console.log("Successful query! Here is the response:", resp);
        res.send(resp);
    }, function(err) {
        console.trace(err.message);
        res.send(err.message);
    });
  });


//**************************************** part C *****************************************/
app.get('/custom', function (req, res) {
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