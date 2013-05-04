Controller = require 'controllers/base/controller'
InfoView = require 'views/info-view'
InnerView = require 'views/inner-view'

module.exports = class InnerController extends Controller
  beforeAction: ->
    super
    @compose 'inner-container', ->
      @view = new InnerView region: 'content'

  index: (params, route) ->
    @view = new InfoView region: 'inner', name: route.name

  other: (params, route) ->
    @view = new InfoView region: 'inner', name: route.name
