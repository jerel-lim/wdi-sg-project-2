require('dotenv').config({silent: true})
var express = require('express')
var app = express()
var port = process.env.PORT || 4000

// mongoose setup
var dbURI = process.env.PROD_MONGODB || 'mongodb://localhost:27017/project2'
var mongoose = require('mongoose')
mongoose.connect(dbURI)

// app.use(express.static('public'))

// check if our connection is okay
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  // we're connected!
  console.log('really really connected')
})

// setup body parser
var bodyParser = require('body-parser')

// transform form data to req.body
app.use(bodyParser.urlencoded({
  extended: true
}))

// transform json data to req.body
app.use(bodyParser.json())

// setup the ejs template
var expressLayouts = require('express-ejs-layouts')
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.use(require('morgan')('dev'))
app.use(express.static('assets')) // to edit

// setup the method override
var methodOverride = require('method-override')
app.use(methodOverride('_method'))

// setting up sessions
var session = require('express-session')
const MongoStore = require('connect-mongo')(session)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({url: dbURI})
}))

// setting up passport

var passport = require('./config/passport')
app.use(passport.initialize())
app.use(passport.session())

// setting up flash
var flash = require('connect-flash')
app.use(flash())
app.use(function (req, res, next) {
  res.locals.alerts = req.flash()
  res.locals.currentUser = req.user
  next()
})

// setting up global promise
mongoose.Promise = global.Promise

// start of routes
app.get('/', function (req, res) {
  if (req.isAuthenticated() === true) {
    return res.redirect('/users/' + req.user.id)
  }
  res.render('static/homepage')
})

var userRouter = require('./routes/user_router')
app.use('/', userRouter)

var userRoomRouter = require('./routes/userRoom_router')
app.use('/rooms', userRoomRouter)

app.use(function (req, res) {
  res.send('error found')
})

app.listen(port, function () {
  console.log('app is running at ' + port)
})
