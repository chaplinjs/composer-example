Controller = require 'controllers/base/controller'
InfoView = require 'views/info-view'

module.exports = class SiteController extends Controller
  index: (params, route) ->
    @view = new InfoView region: 'content', name: route.name

  other: (params, route) ->
    @view = new InfoView region: 'content', name: route.name
