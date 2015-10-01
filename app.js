var express = require('express');
var app = express();

var os = require('os');
var ifaces = os.networkInterfaces();

var port = 8888;
var server = app.listen(port, function(){
    console.log("Server up and running");
    console.log("Go to http://localhost:" + port + " or to http://localhost:" + port+"/remote");


    Object.keys(ifaces).forEach(function (ifname) {
      var alias = 0;

      ifaces[ifname].forEach(function (iface) {
        if ('IPv4' !== iface.family || iface.internal !== false) {
          // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
          return;
        }

        // if (alias >= 1) {
        //   // this single interface has multiple ipv4 addresses
        //   console.log(ifname + ':' + alias, iface.address);
        // } else {
          // this interface has only one ipv4 adress
          // console.log(ifname, iface.address);
        // }

        console.log("OR from an other device on the local network \nGo to http://"+iface.address+":" + port + " or to http://"+iface.address+":" + port+"/remote");

      });
    });

});

var io = require('socket.io').listen(server);

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var remote = require('./routes/remote');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/remote', remote);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


/**
* Socket.IO events
*/
io.on("connection", function(socket){
  console.log('socket io connected');
  /*
    When a client disconnects from the server, the event "disconnect" is automatically
    captured by the server. It will then emit an event called "userDisconnected" to
    all participants with the id of the client that disconnected
  */
  // socket.on("disconnect", function() {
  // });

  socket.on('focusWord', function(data){
    io.sockets.emit('focusWord', data);
  });

});

module.exports = app;
