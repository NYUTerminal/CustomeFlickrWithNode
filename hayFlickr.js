var express = require('express');
var app = express();
// var flikrSearchURL = "https://www.flickr.com/search/?text=";
var api_key = "30451b7aa8e2337ba559dc414e63a45e";
var auth_token = "72157658797079255-f2f7eca7c14bc647" //Optional
var api_sig = "3b14f7c3a8929b2b11c808062f3a657b"//Optional
//.concat("&auth_token=").concat(auth_token).concat("&api_sig=").concat(api_sig)
var flickrSearchURL = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=".concat(api_key).concat("&format=json&nojsoncallback=1")  


//https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=a09bfd56f0e65b3f333ce4199260bca3&tags=panda&format=json&nojsoncallback=1&auth_token=72157658797079255-f2f7eca7c14bc647&api_sig=4adb97a90ff5a51142d7e426106110e3

app.get('/', function(req, res) {
  res.send('Enter Search term after / to search in Flickr API \n');
});
app.get('/:search', function(req, res) {
   console.log("searching with the term " + flickrSearchURL.concat("&tags=").concat(req.params.search))
				var request = require('request');
				request(flickrSearchURL.concat("&tags=").concat(req.params.search), function (error, response, body) {
				    if(error){
				        return console.log('Error:', error);
				    }
				    if(response.statusCode !== 200){
				        return console.log('Invalid Status Code Returned:', response.statusCode);
				    }
				    res.send(response);
				    // var parsed = JSON.parse(body);
				    // res.send(parsed);
				    // res.write(body);
				});
});


app.get('/:search/:count', function(req, res) {
   console.log("\nsearching with the term :" + req.params.search + " , max count : " + req.params.count)
				var request = require('request');
				request(flickrSearchURL.concat("&tags=").concat(req.params.search).concat("&page=1&per_page=").concat(req.params.count), function (error, response, body) {
				    if(error){
				        return console.log('Error:', error);
				    }
				    if(response.statusCode !== 200){
				        return console.log('Invalid Status Code Returned:', response.statusCode);
				    }
				    // var parsed = JSON.parse(body);
				    // res.send(body); 
				    res.send(response);
				    // res.write(body);
				});
});


app.listen(7001);
console.log('Listening on port 7001...');