
const http = require('http');

const hostname = '127.0.0.1';
const port = 3006;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
  res.write("DAB");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


function driver() {
  var artistArray = ['chance','Future','Kanye','Drake']
  var imageArray = []
  var i = 0
    var appleURL = ' https://itunes.apple.com/search?term=' + artistArray[i] + '';
    $.get(appleURL, function(data) {
      var array = JSON.parse(data).results;
      var imageURL = array[0].artworkUrl100;
      var img = generateImage(resizeImage(imageURL));
      imageArray.push(img)
  });
}


function resizeImage(url) {
  return url.replace("100x100","600x600")
}

function generateImage(url) {      
    var img = new Image(); // Create new img element
    img.src = url;
    return img
}

function drawImages(imageArray) {
  var posArrayOne = [0,600,0,600]
  var posArrayTwo = [0,0,600,600] 
  for (var img in imageArray) {
    img.onload = function() {
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        ctx.drawImage(imageArray[img], posArrayOne[img], posArrayTwo[img]);
      }
  }
}
