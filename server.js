var express = require('express');
const path = require('path');
var bodyParser = require('body-parser');
var admin = require('firebase-admin');
var firebase = require("firebase");
var serviceAccount = require('./config/serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://votingapp-9bad6.firebaseio.com',
});
var database = admin.database();
var restaurantsRef = database.ref('/restaurants');
var app = express();
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'views')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .get('/', function(request, response){
        var restaurantsRef = database.ref("/restaurants") 
        restaurantsRef.once('value', function(snapshot){
            var data = snapshot.val()
            console.log(data);
            if ( !data ) {
                data = {}
            }
            response.render('home.ejs', { restaurants: data })        
        })
      })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


// // We want to serve js and html in ejs
// // ejs stands for embedded javascript
// app.set('view engine', 'ejs');

// // We also want to send css, images, and other static files
// app.use(express.static('views'));
// app.set('views', __dirname + '/views');

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))



// app.get('/', function(request, response){
//   var restaurantsRef = database.ref("/restaurants")
  
//   restaurantsRef.once('value', function(snapshot){
//       var data = snapshot.val()
//       console.log(data);
      
//       if ( !data ) {
//           data = {}
//       }
      
//       response.render('home.ejs', { restaurants: data })        
//   });
// })
    




// var port = process.env.PORT || 3000

// app.listen(port, function(){
//     console.log('App running on port ' + port)
// })

