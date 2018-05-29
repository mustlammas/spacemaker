var connect = require('connect');
var serveStatic = require('serve-static');
var __dirname = 'public';
connect().use(serveStatic(__dirname)).listen(3000, function(){
    console.log('Server running on 3000...');
});