Application = require 'application'
routes = require 'routes'

# Initialize the application on DOM ready event.
$ ->
  new Application {
    routes: routes, controllerSuffix: '-controller', pushState: false
  }
