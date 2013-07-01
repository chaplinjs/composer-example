View = require 'views/base/view'
template = require 'views/templates/home-page'

module.exports = class HomePageView extends View
  id: 'home-page-view'
  region: 'main'
  regions:
    info: '#item-view-container'
  template: template
