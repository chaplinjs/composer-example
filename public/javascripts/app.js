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
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
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

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.brunch = true;
})();

window.require.register("application", function(exports, require, module) {
  var Application, Chaplin, Layout, routes,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  Layout = require('views/layout');

  routes = require('routes');

  module.exports = Application = (function(_super) {

    __extends(Application, _super);

    function Application() {
      Application.__super__.constructor.apply(this, arguments);
    }

    Application.prototype.title = 'Composing with Chaplin';

    Application.prototype.initialize = function() {
      Application.__super__.initialize.apply(this, arguments);
      this.initRouter(routes, {
        pushState: false
      });
      this.initDispatcher({
        controllerSuffix: '-controller'
      });
      this.initLayout();
      this.initComposer();
      this.initMediator();
      this.startRouting();
      return typeof Object.freeze === "function" ? Object.freeze(this) : void 0;
    };

    Application.prototype.initLayout = function(options) {
      return this.layout = new Layout(options);
    };

    Application.prototype.initMediator = function() {
      return Chaplin.mediator.seal();
    };

    return Application;

  })(Chaplin.Application);
  
});
window.require.register("controllers/base/controller", function(exports, require, module) {
  var Chaplin, Controller, InfoView, ThreePaneView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  ThreePaneView = require('views/three-pane-view');

  InfoView = require('views/info-view');

  module.exports = Controller = (function(_super) {

    __extends(Controller, _super);

    function Controller() {
      Controller.__super__.constructor.apply(this, arguments);
    }

    Controller.prototype.beforeAction = function(params, route) {
      var _ref;
      if ((_ref = route.controller) === 'inner' || _ref === 'site') {
        this.compose('site', ThreePaneView);
        this.compose('header', function() {
          return this.view = new InfoView({
            region: 'header',
            name: 'header'
          });
        });
        return this.compose('footer', function() {
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
window.require.register("controllers/home-controller", function(exports, require, module) {
  var Controller, HomeController, HomePageView, InfoView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('controllers/base/controller');

  HomePageView = require('views/home-page-view');

  InfoView = require('views/info-view');

  module.exports = HomeController = (function(_super) {

    __extends(HomeController, _super);

    function HomeController() {
      HomeController.__super__.constructor.apply(this, arguments);
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
window.require.register("controllers/inner-controller", function(exports, require, module) {
  var Controller, InfoView, InnerController, InnerView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('controllers/base/controller');

  InfoView = require('views/info-view');

  InnerView = require('views/inner-view');

  module.exports = InnerController = (function(_super) {

    __extends(InnerController, _super);

    function InnerController() {
      InnerController.__super__.constructor.apply(this, arguments);
    }

    InnerController.prototype.beforeAction = function() {
      InnerController.__super__.beforeAction.apply(this, arguments);
      return this.compose('inner-container', function() {
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
window.require.register("controllers/site-controller", function(exports, require, module) {
  var Controller, InfoView, SiteController,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('controllers/base/controller');

  InfoView = require('views/info-view');

  module.exports = SiteController = (function(_super) {

    __extends(SiteController, _super);

    function SiteController() {
      SiteController.__super__.constructor.apply(this, arguments);
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
window.require.register("initialize", function(exports, require, module) {
  var Application;

  Application = require('application');

  $(function() {
    return (new Application).initialize();
  });
  
});
window.require.register("lib/support", function(exports, require, module) {
  var Chaplin, support, utils;

  Chaplin = require('chaplin');

  utils = require('lib/utils');

  support = utils.beget(Chaplin.support);

  module.exports = support;
  
});
window.require.register("lib/utils", function(exports, require, module) {
  var Chaplin, utils;

  Chaplin = require('chaplin');

  utils = Chaplin.utils.beget(Chaplin.utils);

  module.exports = utils;
  
});
window.require.register("lib/view-helper", function(exports, require, module) {
  var Chaplin,
    __slice = [].slice;

  Chaplin = require('chaplin');

  Handlebars.registerHelper('with', function(context, options) {
    if (!context || Handlebars.Utils.isEmpty(context)) {
      return options.inverse(this);
    } else {
      return options.fn(context);
    }
  });

  Handlebars.registerHelper('without', function(context, options) {
    var inverse;
    inverse = options.inverse;
    options.inverse = options.fn;
    options.fn = inverse;
    return Handlebars.helpers["with"].call(this, context, options);
  });

  Handlebars.registerHelper('url', function() {
    var options, params, routeName, _i;
    routeName = arguments[0], params = 3 <= arguments.length ? __slice.call(arguments, 1, _i = arguments.length - 1) : (_i = 1, []), options = arguments[_i++];
    return Chaplin.helpers.reverse(routeName, params);
  });

  Handlebars.registerHelper('formatDate', function(param, options) {
    var date;
    date = new Date(param);
    return "" + (date.getHours()) + ":" + (date.getMinutes()) + ":" + (date.getSeconds()) + "." + (date.getMilliseconds());
  });
  
});
window.require.register("models/base/collection", function(exports, require, module) {
  var Chaplin, Collection, Model,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  Model = require('models/base/model');

  module.exports = Collection = (function(_super) {

    __extends(Collection, _super);

    function Collection() {
      Collection.__super__.constructor.apply(this, arguments);
    }

    Collection.prototype.model = Model;

    return Collection;

  })(Chaplin.Collection);
  
});
window.require.register("models/base/model", function(exports, require, module) {
  var Chaplin, Model,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  module.exports = Model = (function(_super) {

    __extends(Model, _super);

    function Model() {
      Model.__super__.constructor.apply(this, arguments);
    }

    return Model;

  })(Chaplin.Model);
  
});
window.require.register("routes", function(exports, require, module) {
  
  module.exports = function(match) {
    match('', 'home#index');
    match('site', 'site#index');
    match('site/other', 'site#other');
    match('site/inner', 'inner#index');
    return match('site/inner/other', 'inner#other');
  };
  
});
window.require.register("views/base/collection-view", function(exports, require, module) {
  var Chaplin, CollectionView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  View = require('views/base/view');

  module.exports = CollectionView = (function(_super) {

    __extends(CollectionView, _super);

    function CollectionView() {
      CollectionView.__super__.constructor.apply(this, arguments);
    }

    CollectionView.prototype.getTemplateFunction = View.prototype.getTemplateFunction;

    return CollectionView;

  })(Chaplin.CollectionView);
  
});
window.require.register("views/base/view", function(exports, require, module) {
  var Chaplin, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  require('lib/view-helper');

  module.exports = View = (function(_super) {

    __extends(View, _super);

    function View() {
      View.__super__.constructor.apply(this, arguments);
    }

    View.prototype.autoRender = true;

    View.prototype.getTemplateFunction = function() {
      return this.template;
    };

    return View;

  })(Chaplin.View);
  
});
window.require.register("views/home-page-view", function(exports, require, module) {
  var HomePageView, View, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  template = require('views/templates/home-page');

  module.exports = HomePageView = (function(_super) {

    __extends(HomePageView, _super);

    function HomePageView() {
      HomePageView.__super__.constructor.apply(this, arguments);
    }

    HomePageView.prototype.id = 'home-page-view';

    HomePageView.prototype.region = 'main';

    HomePageView.prototype.regions = {
      '#item-view-container': 'info'
    };

    HomePageView.prototype.template = template;

    return HomePageView;

  })(View);
  
});
window.require.register("views/info-view", function(exports, require, module) {
  var InfoView, View, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  template = require('views/templates/info');

  View = require('views/base/view');

  module.exports = InfoView = (function(_super) {

    __extends(InfoView, _super);

    function InfoView() {
      InfoView.__super__.constructor.apply(this, arguments);
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
window.require.register("views/inner-view", function(exports, require, module) {
  var InnerView, View, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  template = require('views/templates/inner');

  View = require('views/base/view');

  module.exports = InnerView = (function(_super) {

    __extends(InnerView, _super);

    function InnerView() {
      InnerView.__super__.constructor.apply(this, arguments);
    }

    InnerView.prototype.className = 'inner-view';

    InnerView.prototype.regions = {
      '#inner-container': 'inner'
    };

    InnerView.prototype.template = template;

    return InnerView;

  })(View);
  
});
window.require.register("views/layout", function(exports, require, module) {
  var Chaplin, Layout,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  module.exports = Layout = (function(_super) {

    __extends(Layout, _super);

    function Layout() {
      Layout.__super__.constructor.apply(this, arguments);
    }

    Layout.prototype.listen = {
      'dispatcher:dispatch mediator': 'navigate'
    };

    Layout.prototype.regions = {
      '': 'main'
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
window.require.register("views/templates/home-page", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


    buffer += "<div class=\"page-header\">\n  <h1>Composing <small>with <strong>Chaplin</strong></small></h1>\n</div>\n<p>\n  <a href=\"#";
    foundHelper = helpers.url;
    stack1 = foundHelper ? foundHelper.call(depth0, "site#index", {hash:{}}) : helperMissing.call(depth0, "url", "site#index", {hash:{}});
    buffer += escapeExpression(stack1) + "\" class=\"btn btn-inverse btn-large\">\n    <strong>Explore</strong>\n  </a>\n</p>\n<div id=\"item-view-container\"></div>\n";
    return buffer;});
});
window.require.register("views/templates/info", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


    buffer += "<h3>";
    foundHelper = helpers.name;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "</h3>\n<dl>\n  <dt>cid</dt>\n  <dd><code>";
    foundHelper = helpers.cid;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.cid; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "</code></dd>\n\n  <dt>timestamp</dt>\n  <dd><code>";
    stack1 = depth0.timestamp;
    foundHelper = helpers.formatDate;
    stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:{}}) : helperMissing.call(depth0, "formatDate", stack1, {hash:{}});
    buffer += escapeExpression(stack1) + "</code></dd>\n\n  <dt>region</dt>\n  <dd><code>";
    foundHelper = helpers.region;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.region; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "</code></dd>\n</dl>\n";
    return buffer;});
});
window.require.register("views/templates/inner", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


    buffer += "<nav>\n  <h3>Inner</h3>\n  <a data-name=\"inner#index\" href=\"#";
    foundHelper = helpers.url;
    stack1 = foundHelper ? foundHelper.call(depth0, "inner#index", {hash:{}}) : helperMissing.call(depth0, "url", "inner#index", {hash:{}});
    buffer += escapeExpression(stack1) + "\">Index</a>\n  <a data-name=\"inner#other\" href=\"#";
    foundHelper = helpers.url;
    stack1 = foundHelper ? foundHelper.call(depth0, "inner#other", {hash:{}}) : helperMissing.call(depth0, "url", "inner#other", {hash:{}});
    buffer += escapeExpression(stack1) + "\">Other</a>\n</nav>\n<div id=\"inner-container\"></div>\n";
    return buffer;});
});
window.require.register("views/templates/three-pane", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


    buffer += "<div id=\"header-container\">\n  <a href=\"#";
    foundHelper = helpers.url;
    stack1 = foundHelper ? foundHelper.call(depth0, "home#index", {hash:{}}) : helperMissing.call(depth0, "url", "home#index", {hash:{}});
    buffer += escapeExpression(stack1) + "\"><strong>Return</strong></a>\n  <header id=\"header\"></header>\n</div>\n<div id=\"content-container\">\n  <nav>\n    <h2>Content</h2>\n    <a data-name=\"site#index\" href=\"#";
    foundHelper = helpers.url;
    stack1 = foundHelper ? foundHelper.call(depth0, "site#index", {hash:{}}) : helperMissing.call(depth0, "url", "site#index", {hash:{}});
    buffer += escapeExpression(stack1) + "\">Index</a>\n    <a data-name=\"site#other\" href=\"#";
    foundHelper = helpers.url;
    stack1 = foundHelper ? foundHelper.call(depth0, "site#other", {hash:{}}) : helperMissing.call(depth0, "url", "site#other", {hash:{}});
    buffer += escapeExpression(stack1) + "\">Other</a>\n    <a data-name=\"inner#index\" href=\"#";
    foundHelper = helpers.url;
    stack1 = foundHelper ? foundHelper.call(depth0, "inner#index", {hash:{}}) : helperMissing.call(depth0, "url", "inner#index", {hash:{}});
    buffer += escapeExpression(stack1) + "\">Inner</a>\n  </nav>\n  <section id=\"content\"></section>\n</div>\n<div id=\"footer-container\">\n  <footer id=\"footer\"></footer>\n</div>\n";
    return buffer;});
});
window.require.register("views/three-pane-view", function(exports, require, module) {
  var ThreePaneView, View, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  template = require('views/templates/three-pane');

  module.exports = ThreePaneView = (function(_super) {

    __extends(ThreePaneView, _super);

    function ThreePaneView() {
      ThreePaneView.__super__.constructor.apply(this, arguments);
    }

    ThreePaneView.prototype.id = 'three-pane-view';

    ThreePaneView.prototype.region = 'main';

    ThreePaneView.prototype.regions = {
      '#header-container': 'header',
      '#content': 'content',
      '#footer-container': 'footer'
    };

    ThreePaneView.prototype.template = template;

    return ThreePaneView;

  })(View);
  
});
