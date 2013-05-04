Controller = require 'controllers/base/controller'
HomePageView = require 'views/home-page-view'
InfoView = require 'views/info-view'

module.exports = class HomeController extends Controller
  index: (params, route) ->
    @view = new HomePageView
    @infoView = new InfoView region: 'info', name: route.name
