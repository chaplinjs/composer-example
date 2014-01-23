# Application-specific view helpers
# http://handlebarsjs.com/#helpers
# --------------------------------

# Get Chaplin-declared named routes. {{#url "like" "105"}}{{/url}}
Handlebars.registerHelper 'url', (routeName, params..., options) ->
  Chaplin.utils.reverse routeName, params

Handlebars.registerHelper 'formatDate', (param, options) ->
  date = new Date(param)
  "#{date.getHours()}:#{date.getMinutes()}:#{date.getSeconds()}.#{date.getMilliseconds()}"
