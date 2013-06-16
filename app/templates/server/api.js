/**
 * List all the resources that this services exposes and attach them to the specified app
 *
 * @param app
 */
var _ = require('lodash');

module.exports = function(app) {
  require('./resources/logger-resource')(app);
  require('./resources/version-resource')(app);

  app.get('/api', function(req, res) {
    res.json(200, getApi(app));
  });
};

function getApi(app) {
  var api = {};

  Object.keys(app.routes).forEach(function(action) {
    var routes = app.routes[action];
    routes.forEach(function(route) {
      if (!api[route.path]) {
        api[route.path] = [];
      }

      api[route.path].push(action.toUpperCase());
    });
  });

  var sortedApi = {};
  var sortedKeys = _.sortBy(Object.keys(api));
  sortedKeys.forEach(function(key) {
    sortedApi[key] = api[key];
  });

  return sortedApi;
}