var connect = require('connect');
var serveStatic = require('serve-static');
var app = require('./app');

/*connect().use(serveStatic('./src/public')).listen(3000, function(){
    console.log('Server running on 3000...');
});*/

var port = 3000;
var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});
