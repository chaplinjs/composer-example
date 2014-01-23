ThreePaneView = require 'views/three-pane-view'
# ContentView = require 'views/content-view'
InfoView = require 'views/info-view'

module.exports = class Controller extends Chaplin.Controller
  beforeAction: (params, route) ->
    if route.controller in ['inner', 'site']
      @reuse 'site', ThreePaneView
      @reuse 'header', ->
        @view = new InfoView region: 'header', name: 'header'
      @reuse 'footer', ->
        @view = new InfoView region: 'footer', name: 'footer'
