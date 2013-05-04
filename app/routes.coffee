module.exports = (match) ->
  match '', 'home#index'
  match 'site', 'site#index'
  match 'site/other', 'site#other'
  match 'site/inner', 'inner#index'
  match 'site/inner/other', 'inner#other'
