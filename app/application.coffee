Layout = require 'views/layout'
routes = require 'routes'

# The application object.
module.exports = class Application extends Chaplin.Application
  # Set your application name here so the document title is set to
  # “Controller title – Site title” (see Chaplin.Layout#adjustTitle)
  title: 'Composing with Chaplin'

  initLayout: (options) ->
    @layout = new Layout options
