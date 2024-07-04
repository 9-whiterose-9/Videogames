var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var itemsRouter = require('./routes/items');
var cors = require('cors');
var app = express();

app.use(cors());


//----------------------
// MONGODB connection
//Import the mongoose module
var mongoose = require('mongoose');
//let bd = "mongodb+srv://";
//let dbstring = "@cluster1.tjmtn7i.mongodb.net/?retryWrites=true&w=majority";
//let dbUser = "";
//let dbPword= "";
//Set up default mongoose connection

//Bia
//var mongoDB = "mongodb+srv://db_b_r:3EmilyInParisKomi9@cluster0.mjv3b.mongodb.net/?retryWrites=true&w=majority";

//JP
//var mongoDB = "mongodb+srv://fc52772:Luffy_1998@cluster1.tjmtn7i.mongodb.net/?retryWrites=true&w=majority"

//FGO
//var mongoDB = "mongodb+srv://fgo:fgo1094@cluster0.waodv.mongodb.net/videogames";

//BD generica a usar a partir de hoje:
//var mongoDB =bd.concat("",dbUser,":",dbPword,"",dbstring); 

//appserver
var mongoDB = "mongodb://psi004:psi004@localhost:27017/psi004?retryWrites=true&authSource=psi004"
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// view engine setups
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/items',itemsRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.get('/profile_pics/:filename', (req,res)=>{
  let filename = req.params.filename;
  const profilePicPath = path.join(__dirname, '../profilePics', filename);
  console.log(profilePicPath);
  res.sendFile(profilePicPath);

});
module.exports = app;
