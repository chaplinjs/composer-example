ThreePaneView = require 'views/three-pane-view'
# ContentView = require 'views/content-view'
InfoView = require 'views/info-view'

module.exports = class Controller extends Chaplin.Controller
  beforeAction: (params, route) ->
    console.log 121, route.controller
    if route.controller in ['inner', 'site']
      @compose 'site', ThreePaneView
      @compose 'header', ->
        @view = new InfoView region: 'header', name: 'header'
      @compose 'footer', ->
        @view = new InfoView region: 'footer', name: 'footer'
