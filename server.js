/*------------------------------------------------------------------------------
*-------------------------[Get all necessary modules]---------------------------
*-----------------------------------------------------------------------------*/
var rootDir = __dirname;

var express = require('express'),
    app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

var bodyParser = require('body-parser');
var morgan = require('morgan');
var mysql = require('mysql');
var winston = require('winston');

// authenticated session
// https://github.com/expressjs/session
var session = require('express-session')

app.use(session({
    secret: 'ODSC',
    cookie: { maxAge: 2592000000 },
    resave: false,
    saveUninitialized: false
}));

//var schedule = require('node-schedule');

//var fs = require('fs');
// var redis = require('redis');
// // var readChunk = require('read-chunk');
// // var fileType = require('file-type');
//
// var https = require('https');
// var privateKey  = fs.readFileSync('/etc/letsencrypt/live/findlove.cf/privkey.pem', 'utf8');
// var certificate = fs.readFileSync('/etc/letsencrypt/live/findlove.cf/fullchain.pem', 'utf8');
//
// var credentials = {key: privateKey, cert: certificate};
//
// var httpsServer = https.createServer(credentials, app);

// get our predefined file
var config = require('./config');
var errcode = require('./errcode');
var utils = require('./utils');
var show_clientip = require('./middleware/show_clientip');
var check_session = require('./middleware/check_session');
app.set('check_session',check_session);

// load ORM db instance
// var sequelize = require('./dbconnection/mysql/connection');
var ORM = require('./model/ORM-Header');
app.set('ORM',ORM);
// create instance of "pool" mySql connection
//var pool = mysql.createPool(config.db_config);

// plug config and module
app.set('port', config.PORT || process.env.port || 1234);
//app.set('super_secret', config.super_secret); // secret variable
app.set('utils',utils);
app.set('errcode',errcode);
app.set('upload_dir',__dirname + '/uploaded_image');
app.set('download-folder',__dirname + '/download-folder');
/*
// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin',  '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});
*/

// setup parser for request body content
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(show_clientip);

// redirect to [right] route
app.use(function(req, res, next) {
    console.log(req.url);
    if(req.url.substr(-1) == '/' && req.url.length > 1) {
       res.redirect(301, req.url.substring(0, req.url.length - 2));
    } else {
       next();
    }
});

//=========================== write log to file ================================
var logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level:            'debug',
      filename:         './all-logs.log',
      handleExceptions: true,
      json:             false,
      maxsize:          104857600, //100MB
      maxFiles:         10,
      colorize:         false
    })
    // ,
    // new winston.transports.Console({
    //   level:            'debug',
    //   handleExceptions: true,
    //   json:             false,
    //   colorize:         true
    // })
  ],
  exitOnError: false
});

logger.stream = {
  write: function(message, encoding){
    logger.info(message);
  }
};

app.use(morgan(
	'{"remote_addr": ":remote-addr", "date": ":date[clf]", "method": ":method", "url": ":url", "http_version": ":http-version", "status": ":status", "result_length": ":res[content-length]", "user_agent": ":user-agent", "response_time": ":response-time"}', {stream: logger.stream}));
//=========================== write log to file ================================

server.listen(process.env.PORT || app.get('port'), function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

//var mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
// mongoose.connect(config.mongoose_connect);

// Load API's handler
var api_router = express.Router();
app.use(config.api_path,api_router);

controllers = require('./controllers')(app, api_router, config);

// create static path for common file
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/views/common'));

// Load Views render
var views_router = express.Router();
app.use(config.views_path,views_router);

views = require('./views')(app, views_router, config);
socketchat = require('./socketchat')(io);

// websocketchat = require('websocketchat')(server);
// console.log('==============[GET MY IP]==================');
// var os = require('os');
// var ifaces = os.networkInterfaces();
//
// Object.keys(ifaces).forEach(function (ifname) {
//   var alias = 0;
//
//   ifaces[ifname].forEach(function (iface) {
//     if ('IPv4' !== iface.family || iface.internal !== false) {
//       // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
//       return;
//     }
//
//     if (alias >= 1) {
//       // this single interface has multiple ipv4 addresses
//       console.log(ifname + ':' + alias, iface.address);
//     } else {
//       // this interface has only one ipv4 adress
//       console.log(ifname, iface.address);
//     }
//     ++alias;
//   });
// });
