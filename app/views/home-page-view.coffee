View = require 'views/base/view'
template = require 'views/templates/home-page'

module.exports = class HomePageView extends View
  container: 'body'
  id: 'home-page-view'
  regions:
    '#item-view-container': 'info'
  template: template
