module.exports = class Layout extends Chaplin.Layout
  listen:
    'dispatcher:dispatch mediator': 'navigate'

  regions:
    main: ''

  # Toggles nav links based on current route name.
  navigate: (controller, params, route) ->
    name = route.name
    setTimeout =>
      elems = @$('nav > a[data-name]')
      # debugger
      elems.removeClass 'active'
      selector = if name is 'inner#other'
        "#content-container > nav > a[data-name='inner#index'], .inner-view > nav > a[data-name='inner#other']"
      else
        "nav > a[data-name='#{name}']"
      @$(selector).addClass 'active'
    , 25
