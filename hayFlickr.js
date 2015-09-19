var express = require('express');
var app = express();
var api_key = "30451b7aa8e2337ba559dc414e63a45e";
var auth_token = "72157658797079255-f2f7eca7c14bc647" //Optional
var api_sig = "3b14f7c3a8929b2b11c808062f3a657b"//Optional
var flickrSearchURL = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=".concat(api_key).concat("&format=json&nojsoncallback=1")  
var flickrPhotoInfo =  "https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=".concat(api_key).concat("&format=json&nojsoncallback=1")
var flickrImage = "https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_[mstzb].jpg"

/*
* 	General Search to see service is started or not.
*/
app.get('/', function(req, res) {
  res.send('Enter Search term after / to search in Flickr API \n');
});

/*
* 	Flickr Search API invoked from the below code. 
*/
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
				    // console.log(body)
				    var jsonObj = JSON.parse(body);						
				    // console.log(jsonObj)
					var imageLists = '<ul>';
					for (var i = 0; i < jsonObj['photos']['photo'].length; i++) {
						var obj = jsonObj['photos']['photo'][i];
						var imageUrl = "https://farm".concat(obj['farm']).concat(".staticflickr.com/").concat(obj['server']).concat("/").concat(obj['id']).concat("_").concat(obj['secret']).concat("_m.jpg");
						console.log(imageUrl);
						// console.log(flickrPhotoInfo.concat("&photo_id==").concat(jsonObj['photos']['photo'][i]['id']));
						imageLists += '<li  style="float: left; width: 30%; margin-right: 1%; margin-bottom: 0.5em;"><img src="' + imageUrl + '"></li>';
					}
		            imageLists += '</ul>';
		            res.writeHead(200, {'Content-type':'text/html'});
		            res.end(imageLists);
				});
});

/*
* 	Flickr Search with Number of results limited to the Count specified in the URL. 
*/
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
				    // console.log(body)
				    var jsonObj = JSON.parse(body);
					console.log(jsonObj['photos']['photo'][0]['id']);
						
					var imageLists = '<ul>';
					for (var i = 0; i < jsonObj['photos']['photo'].length; i++) {
						var obj = jsonObj['photos']['photo'][i];
						var imageUrl = "https://farm".concat(obj['farm']).concat(".staticflickr.com/").concat(obj['server']).concat("/").concat(obj['id']).concat("_").concat(obj['secret']).concat("_m.jpg");
						console.log(imageUrl);
						// console.log(flickrPhotoInfo.concat("&photo_id==").concat(jsonObj['photos']['photo'][i]['id']));
						imageLists += '<li style="float: left; width: 30%; margin-right: 1%; margin-bottom: 0.5em;"><img src="' + imageUrl + '"></li>';
					}
		            imageLists += '</ul>';
		            res.writeHead(200, {'Content-type':'text/html'});
		            res.end(imageLists);
				});
});


/*
	Port to which Node listens to 7001 . Could be configurable here .
*/
app.listen(7001);
console.log('Listening on port 7001...');