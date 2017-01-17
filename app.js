var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var app = express();
var PORT = process.env.PORT || 5000;
var nav = [
  {text: 'Books', link: '/books'},
  {text: 'Authors', link: '/Authors'}
];
var authRouter = require('./src/routes/authRouter')(nav);
var bookRouter = require('./src/routes/bookRouter')(nav);
var adminRouter = require('./src/routes/adminRouter')(nav);

// default folder for express to lookup the files inside the project.
app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.use(session({
  secret: 'library',
  resave: false,
  saveUninitialized: false
}));
// importing all passport functionality into app.js file
require('./src/config/passport')(app);

app.set('views', 'src/views');
app.set('view engine', 'ejs');

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
// writing sample route
app.get('/', function(req, res) {
  res.render('index', {
    nav: nav
  });
});

app.listen(PORT, function(err){
  console.log('Server is running on port: ', PORT);
});
