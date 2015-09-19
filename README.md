# FlickrWithNodeJS

This script was build to retrieve images using Flickr Search API's.

Steps to run:<br>
1)Take a clone of the repo.<br>
2)Do NPM install in the directory . You will be installed with request and express npm modules.<br>
3)Run "node hayFlickr.js" and the server starts and listning to the port "7001"<br>
4)Open your browser and you can do below tasks.<br>
    a)Ex1: <b>http://localhost:7001/sunset</b>  - will search for "sunset" images through Flickr API.<br>
    b)Ex2: <b>http://localhost:7001/sunset/5</b>  - will search for "sunset" but retrieves only 5 images from Flickr API.<br>

<br>
Reference : <br>
https://www.flickr.com/services/api/misc.urls.html<br>
http://bigspaceship.github.io/blog/2014/05/14/how-to-create-a-rest-api-with-node-dot-js/<br>
http://www.codexpedia.com/node-js/node-js-http-server-displaying-images-from-a-directory/<br>
