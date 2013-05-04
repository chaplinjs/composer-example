View = require 'views/base/view'
template = require 'views/templates/home-page'

module.exports = class HomePageView extends View
  id: 'home-page-view'
  region: 'main'
  regions:
    '#item-view-container': 'info'
  template: template
