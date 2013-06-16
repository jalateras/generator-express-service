var app = require('./app');
var logger = require('log4js').getLogger('app');

var port = process.env.PORT || 3000;
var host = process.env.HOST || 'localhost';

app.listen(port, host, function () {
  logger.info("Express app listening on port %d", port);
});
