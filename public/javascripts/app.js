(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("application", function(exports, require, module) {
var Application, Layout, routes, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Layout = require('views/layout');

routes = require('routes');

module.exports = Application = (function(_super) {
  __extends(Application, _super);

  function Application() {
    _ref = Application.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Application.prototype.title = 'Composing with Chaplin';

  Application.prototype.initLayout = function(options) {
    return this.layout = new Layout(options);
  };

  return Application;

})(Chaplin.Application);
});

;require.register("controllers/base/controller", function(exports, require, module) {
var Controller, InfoView, ThreePaneView, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ThreePaneView = require('views/three-pane-view');

InfoView = require('views/info-view');

module.exports = Controller = (function(_super) {
  __extends(Controller, _super);

  function Controller() {
    _ref = Controller.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Controller.prototype.beforeAction = function(params, route) {
    var _ref1;
    if ((_ref1 = route.controller) === 'inner' || _ref1 === 'site') {
      this.reuse('site', ThreePaneView);
      this.reuse('header', function() {
        return this.view = new InfoView({
          region: 'header',
          name: 'header'
        });
      });
      return this.reuse('footer', function() {
        return this.view = new InfoView({
          region: 'footer',
          name: 'footer'
        });
      });
    }
  };

  return Controller;

})(Chaplin.Controller);
});

;require.register("controllers/home-controller", function(exports, require, module) {
var Controller, HomeController, HomePageView, InfoView, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Controller = require('controllers/base/controller');

HomePageView = require('views/home-page-view');

InfoView = require('views/info-view');

module.exports = HomeController = (function(_super) {
  __extends(HomeController, _super);

  function HomeController() {
    _ref = HomeController.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  HomeController.prototype.index = function(params, route) {
    this.view = new HomePageView;
    return this.infoView = new InfoView({
      region: 'info',
      name: route.name
    });
  };

  return HomeController;

})(Controller);
});

;require.register("controllers/inner-controller", function(exports, require, module) {
var Controller, InfoView, InnerController, InnerView, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Controller = require('controllers/base/controller');

InfoView = require('views/info-view');

InnerView = require('views/inner-view');

module.exports = InnerController = (function(_super) {
  __extends(InnerController, _super);

  function InnerController() {
    _ref = InnerController.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  InnerController.prototype.beforeAction = function() {
    InnerController.__super__.beforeAction.apply(this, arguments);
    return this.reuse('inner-container', function() {
      return this.view = new InnerView({
        region: 'content'
      });
    });
  };

  InnerController.prototype.index = function(params, route) {
    return this.view = new InfoView({
      region: 'inner',
      name: route.name
    });
  };

  InnerController.prototype.other = function(params, route) {
    return this.view = new InfoView({
      region: 'inner',
      name: route.name
    });
  };

  return InnerController;

})(Controller);
});

;require.register("controllers/site-controller", function(exports, require, module) {
var Controller, InfoView, SiteController, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Controller = require('controllers/base/controller');

InfoView = require('views/info-view');

module.exports = SiteController = (function(_super) {
  __extends(SiteController, _super);

  function SiteController() {
    _ref = SiteController.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  SiteController.prototype.index = function(params, route) {
    return this.view = new InfoView({
      region: 'content',
      name: route.name
    });
  };

  SiteController.prototype.other = function(params, route) {
    return this.view = new InfoView({
      region: 'content',
      name: route.name
    });
  };

  return SiteController;

})(Controller);
});

;require.register("initialize", function(exports, require, module) {
var Application, routes;

Application = require('application');

routes = require('routes');

$(function() {
  return new Application({
    routes: routes,
    controllerSuffix: '-controller',
    pushState: false
  });
});
});

;require.register("lib/view-helper", function(exports, require, module) {
var __slice = [].slice;

Handlebars.registerHelper('url', function() {
  var options, params, routeName, _i;
  routeName = arguments[0], params = 3 <= arguments.length ? __slice.call(arguments, 1, _i = arguments.length - 1) : (_i = 1, []), options = arguments[_i++];
  return Chaplin.utils.reverse(routeName, params);
});

Handlebars.registerHelper('formatDate', function(param, options) {
  var date;
  date = new Date(param);
  return "" + (date.getHours()) + ":" + (date.getMinutes()) + ":" + (date.getSeconds()) + "." + (date.getMilliseconds());
});
});

;require.register("routes", function(exports, require, module) {
module.exports = function(match) {
  match('', 'home#index');
  match('site', 'site#index');
  match('site/other', 'site#other');
  match('site/inner', 'inner#index');
  return match('site/inner/other', 'inner#other');
};
});

;require.register("views/base/collection-view", function(exports, require, module) {
var CollectionView, View, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('views/base/view');

module.exports = CollectionView = (function(_super) {
  __extends(CollectionView, _super);

  function CollectionView() {
    _ref = CollectionView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  CollectionView.prototype.getTemplateFunction = View.prototype.getTemplateFunction;

  return CollectionView;

})(Chaplin.CollectionView);
});

;require.register("views/base/view", function(exports, require, module) {
var View, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

require('lib/view-helper');

module.exports = View = (function(_super) {
  __extends(View, _super);

  function View() {
    _ref = View.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  View.prototype.autoRender = true;

  View.prototype.getTemplateFunction = function() {
    return this.template;
  };

  return View;

})(Chaplin.View);
});

;require.register("views/home-page-view", function(exports, require, module) {
var HomePageView, View, template, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('views/base/view');

template = require('views/templates/home-page');

module.exports = HomePageView = (function(_super) {
  __extends(HomePageView, _super);

  function HomePageView() {
    _ref = HomePageView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  HomePageView.prototype.id = 'home-page-view';

  HomePageView.prototype.region = 'main';

  HomePageView.prototype.regions = {
    info: '#item-view-container'
  };

  HomePageView.prototype.template = template;

  return HomePageView;

})(View);
});

;require.register("views/info-view", function(exports, require, module) {
var InfoView, View, template, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

template = require('views/templates/info');

View = require('views/base/view');

module.exports = InfoView = (function(_super) {
  __extends(InfoView, _super);

  function InfoView() {
    _ref = InfoView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  InfoView.prototype.className = 'info-view';

  InfoView.prototype.template = template;

  InfoView.prototype.initialize = function(params) {
    InfoView.__super__.initialize.apply(this, arguments);
    return this.name = params.name;
  };

  InfoView.prototype.getTemplateData = function() {
    return {
      name: this.name,
      cid: this.cid,
      timestamp: Date.now(),
      region: this.region
    };
  };

  return InfoView;

})(View);
});

;require.register("views/inner-view", function(exports, require, module) {
var InnerView, View, template, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

template = require('views/templates/inner');

View = require('views/base/view');

module.exports = InnerView = (function(_super) {
  __extends(InnerView, _super);

  function InnerView() {
    _ref = InnerView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  InnerView.prototype.className = 'inner-view';

  InnerView.prototype.regions = {
    inner: '#inner-container'
  };

  InnerView.prototype.template = template;

  return InnerView;

})(View);
});

;require.register("views/layout", function(exports, require, module) {
var Layout, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = Layout = (function(_super) {
  __extends(Layout, _super);

  function Layout() {
    _ref = Layout.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Layout.prototype.listen = {
    'dispatcher:dispatch mediator': 'navigate'
  };

  Layout.prototype.regions = {
    main: ''
  };

  Layout.prototype.navigate = function(controller, params, route) {
    var name,
      _this = this;
    name = route.name;
    return setTimeout(function() {
      var elems, selector;
      elems = _this.$('nav > a[data-name]');
      elems.removeClass('active');
      selector = name === 'inner#other' ? "#content-container > nav > a[data-name='inner#index'], .inner-view > nav > a[data-name='inner#other']" : "nav > a[data-name='" + name + "']";
      return _this.$(selector).addClass('active');
    }, 25);
  };

  return Layout;

})(Chaplin.Layout);
});

;require.register("views/templates/home-page", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<div class=\"page-header\">\n  <h1>Composing <small>with <strong>Chaplin</strong></small></h1>\n</div>\n<p>\n  <a href=\"#"
    + escapeExpression((helper = helpers.url || (depth0 && depth0.url),options={hash:{},data:data},helper ? helper.call(depth0, "site#index", options) : helperMissing.call(depth0, "url", "site#index", options)))
    + "\" class=\"btn btn-inverse btn-large\">\n    <strong>Explore</strong>\n  </a>\n</p>\n<div id=\"item-view-container\"></div>\n";
  return buffer;
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/info", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  buffer += "<h3>";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h3>\n<dl>\n  <dt>cid</dt>\n  <dd><code>";
  if (helper = helpers.cid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</code></dd>\n\n  <dt>timestamp</dt>\n  <dd><code>"
    + escapeExpression((helper = helpers.formatDate || (depth0 && depth0.formatDate),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.timestamp), options) : helperMissing.call(depth0, "formatDate", (depth0 && depth0.timestamp), options)))
    + "</code></dd>\n\n  <dt>region</dt>\n  <dd><code>";
  if (helper = helpers.region) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.region); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</code></dd>\n</dl>\n";
  return buffer;
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/inner", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<nav>\n  <h3>Inner</h3>\n  <a data-name=\"inner#index\" href=\"#"
    + escapeExpression((helper = helpers.url || (depth0 && depth0.url),options={hash:{},data:data},helper ? helper.call(depth0, "inner#index", options) : helperMissing.call(depth0, "url", "inner#index", options)))
    + "\">Index</a>\n  <a data-name=\"inner#other\" href=\"#"
    + escapeExpression((helper = helpers.url || (depth0 && depth0.url),options={hash:{},data:data},helper ? helper.call(depth0, "inner#other", options) : helperMissing.call(depth0, "url", "inner#other", options)))
    + "\">Other</a>\n</nav>\n<div id=\"inner-container\"></div>\n";
  return buffer;
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/three-pane", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<div id=\"header-container\">\n  <a href=\"#"
    + escapeExpression((helper = helpers.url || (depth0 && depth0.url),options={hash:{},data:data},helper ? helper.call(depth0, "home#index", options) : helperMissing.call(depth0, "url", "home#index", options)))
    + "\"><strong>Return</strong></a>\n  <header id=\"header\"></header>\n</div>\n<div id=\"content-container\">\n  <nav>\n    <h2>Content</h2>\n    <a data-name=\"site#index\" href=\"#"
    + escapeExpression((helper = helpers.url || (depth0 && depth0.url),options={hash:{},data:data},helper ? helper.call(depth0, "site#index", options) : helperMissing.call(depth0, "url", "site#index", options)))
    + "\">Index</a>\n    <a data-name=\"site#other\" href=\"#"
    + escapeExpression((helper = helpers.url || (depth0 && depth0.url),options={hash:{},data:data},helper ? helper.call(depth0, "site#other", options) : helperMissing.call(depth0, "url", "site#other", options)))
    + "\">Other</a>\n    <a data-name=\"inner#index\" href=\"#"
    + escapeExpression((helper = helpers.url || (depth0 && depth0.url),options={hash:{},data:data},helper ? helper.call(depth0, "inner#index", options) : helperMissing.call(depth0, "url", "inner#index", options)))
    + "\">Inner</a>\n  </nav>\n  <section id=\"content\"></section>\n</div>\n<div id=\"footer-container\">\n  <footer id=\"footer\"></footer>\n</div>\n";
  return buffer;
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/three-pane-view", function(exports, require, module) {
var ThreePaneView, View, template, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('views/base/view');

template = require('views/templates/three-pane');

module.exports = ThreePaneView = (function(_super) {
  __extends(ThreePaneView, _super);

  function ThreePaneView() {
    _ref = ThreePaneView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  ThreePaneView.prototype.id = 'three-pane-view';

  ThreePaneView.prototype.region = 'main';

  ThreePaneView.prototype.regions = {
    header: '#header-container',
    content: '#content',
    footer: '#footer-container'
  };

  ThreePaneView.prototype.template = template;

  return ThreePaneView;

})(View);
});

;
//# sourceMappingURL=app.js.map