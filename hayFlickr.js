var express = require('express');
var app = express();
var flikrSearchURL = "https://www.flickr.com/search/?text=";
app.get('/', function(req, res) {
  res.send('Trigger Flikr using Node\n');
});
app.get('/:search', function(req, res) {

   console.log("searching with the term " + req.params.search)
   // console.log("final URL " + flikrSearchURL.concat(req.params.search));
				var request = require('request');
				request(flikrSearchURL.concat(req.params.search), function (error, response, body) {
				    //Check for error
				    if(error){
				        return console.log('Error:', error);
				    }
				    //Check for right status code
				    if(response.statusCode !== 200){
				        return console.log('Invalid Status Code Returned:', response.statusCode);
				    }
				    // var parsed = JSON.parse(body);
				    res.send(body); // Show the HTML for the Modulus homepage.
				    // res.write(body);
				});
});
app.listen(3001);
console.log('Listening on port 3001...');