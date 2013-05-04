template = require 'views/templates/inner'
View = require 'views/base/view'

module.exports = class InnerView extends View
  className: 'inner-view'
  regions:
    '#inner-container': 'inner'
  template: template
