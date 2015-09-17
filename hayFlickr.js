var flickr = new Flickr({
  api_key: "da68bb5e62015663c5cf069420da3a3e"
});

flickr.photos.search({
  text: "sunset"
}, function(err, result) {
  if(err) { throw new Error(err); }
  console.log()
  // do something with result
}