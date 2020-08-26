var express = require("express");
var app = express();
var logger = require("morgan");
var bodyParser = require("body-parser");
var session = require("express-session");
var exphs = require("express-handlebars");
var expressValidator = require("express-validator");
var flash = require("connect-flash");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var passportLocalMongoose = require("passport-local-mongoose");
var mongose = require("mongoose");

var indexRoute = require("./routes/index");
var userRoute = require("./routes/index/users");

//view engine setuo
app.engine(".hbs", exphs({defaultLayout: "layout"}))
app.set("view engine", ".hbs");

//bodyparser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
// morgan setup
app.use(logger("dev"));
//public directory
app.use(express.static(_dirname +"/public"));
//handle express-session
app.use(session({
	secret: "my secret",
	resave: false,
	saveUninitialized: false 
}));
//passport setup
app.use(passport.initialize());
app.use(passport.session());


app.use("/", "indexRoute");
app.use("/users", "userRoute");