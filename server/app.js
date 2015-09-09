var express = require('express');
var app = express();
var secret_stuff = require('./secret_stuff.json');

var anvil = require('anvil-connect-nodejs');

anvil.configure({
  provider: {
    uri: secret_stuff["URI"]
  },
  client: {
    id: secret_stuff["CLIENT_ID"],
    secret: secret_stuff["CLIENT_SECRET"]
  },
  params: {
    redirectUri: secret_stuff["REDIRECT_URI"]
  }
});

app.use(anvil.verify());

//var authorize = anvil.verify({ scope: 'research' });


app.get('/', function (req, res, next) {
  res.send('Hello World!');
});

app.get('/callback', function (req, res, next) {
  res.send('Hello from the Callback');
});

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
