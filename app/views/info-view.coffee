template = require 'views/templates/info'
View = require 'views/base/view'

module.exports = class InfoView extends View
  className: 'info-view'
  template: template

  initialize: (params) ->
    super
    @name = params.name

  getTemplateData: ->
    {@name, @cid, timestamp: Date.now(), @region}
