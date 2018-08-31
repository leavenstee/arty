
// window.onload = function(){ 
//     document.getElementById('btn').onclick = function() {
//     driver();

//     var canvas = document.getElementById('canvas');
//     var ctx = canvas.getContext('2d');
//     ctx.save();
//     ctx.translate( 600, 600 );
//     ctx.rotate( 45*Math.PI / 180 );
//     ctx.translate( -600, -600 );
//     ctx.drawImage( canvas, 0, 0);
//     ctx.restore();
//     var jpegIMG = canvas.toDataURL("image/jpeg");
//     document.write('<img src="'+jpegIMG+'"/></a>');
//   }

// };

// function driver () {
//   var artistArray = ['foo fighters','queen','styx','metalica']
//   for (var i = 0; i < artistArray.length; i++) {
//     var appleURL = ' https://itunes.apple.com/search?term=' + artistArray[i];    	
// 		addImage(appleURL, i);
//   }

// }

// function addImage (url, position) {
//   $.get(url, function(data,status) {
//     console.log(status);
//     var array = JSON.parse(data).results;
//     var imageURL = array[0].artworkUrl100;
//     var img = generateImage(resizeImage(imageURL));
//     drawImages(img, position);
//   });
// }

// function resizeImage (url) {
//   return url.replace("100x100","600x600")
// }

// function generateImage (url) {      
//   var img = new Image(); // Create new img element
//   img.src = url;
//   return img
// }

// function drawImages (urls) {
//   var positions = [
//     [0,0,60,60],
//     [0,60,60,60],
//     [60,0,60,60],
//     [60,60,60,60]
//   ]
  
//   urls.forEach(function (url, pos) {
//     var img = generateImage(url)
//     img.onload = function() {
//       var canvas = document.getElementById('canvas')
//       var ctx = canvas.getContext('2d')
//       ctx.drawImage(img, 
//         positions[pos][0], 
//         positions[pos][1], 
//         positions[pos][2], 
//         positions[pos][3])
//     }
//   })
// }

window.onload = function(){ 
  document.getElementById('btn').onclick = function() {
    driver();
  }
}

function driver () {
  var imageRequests = []
  var artistArray = ['kanye', 'bob', 'post malone', 'tupac']
  
  artistArray.forEach(function (artist) {
    var appleURL = 'https://itunes.apple.com/search?term=' + artist
    imageRequests.push(addImage(appleURL))
  })
  
  Promise
    .all(imageRequests)
    .then(function (images) {
      return drawImages(images)
    })
    .then(function () {


      // rotate/etc
      var canvas = document.getElementById('canvas');
      var ctx = canvas.getContext('2d');
      var image = new Image()
      image = canvas.toDataURL('image/jpeg', 1.0);

      image.onload = function () {
        ctx.clearRect(canvas.width, canvas.height);
        ctx.save();
        ctx.translate( 600, 600 );
        ctx.rotate(45*Math.PI / 180);
        ctx.translate( -600, -600 );
        ctx.drawImage(image, 0, 0 );
        ctx.restore();
    }
      

    })
    .catch(function (error) {
      console.log('Error!', error)
    })
}

function addImage (url) {
  return $.get(url).then(function (data, status) {
    var array = JSON.parse(data).results
    var imageURL = array[0].artworkUrl100
    return resizeImage(imageURL)
  }).catch(function (error) {
    console.error('Failed to get results for', url)
    return "" // TODO: Return a default image url here
  });
}

function resizeImage (url) {
  return url.replace("100x100","600x600")
}

function drawImages (urls) {
  var positions = [
    [0,0,600,600],
    [0,600,600,600],
    [600,0,600,600],
    [600,600,600,600]
  ]
  
  var imagesPending = urls.map(function (url, i) {
    return getPendingImage(url, positions[i])
  })
  
  return Promise.all(imagesPending)
}

function getPendingImage (url, positions) {
  return new Promise(function (resolve, reject) {
    var img = generateImage(url)
    img.onload = function () {
      var canvas = document.getElementById('canvas')
      var ctx = canvas.getContext('2d')
      ctx.drawImage(img, ...positions)
      resolve()
    }
  })
}

function generateImage (url) {      
  var img = new Image()
  img.src = url
  img.setAttribute('crossOrigin', 'anonymous');
  return img
}
