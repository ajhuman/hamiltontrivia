var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './client/dist')));
app.use(session({secret: 'opensesame'}));

require('./server/config/mongoose.js');

var routes_setter = require('./server/config/routes.js');
routes_setter(app);
app.all('*', (req,res,next) => {
  res.sendfile(path.resolve('./client/dist/index.html'));
});

app.listen(8000, function() {
  console.log('listening on port 8000');
});
