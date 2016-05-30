"use strict";

(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
      }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
        var n = t[o][1][e];return s(n ? n : e);
      }, l, l.exports, e, t, n, r);
    }return n[o].exports;
  }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
    s(r[o]);
  }return s;
})({ 1: [function (require, module, exports) {
    var cache = {};
    var registeredFactories = {};
    var provender = {};

    var Yavanna = {};

    Yavanna.provide = function (name, factory) {
      validateProvideArgs(name, factory);

      registeredFactories[name] = factory;

      Object.defineProperty(provender, name, {
        get: function get() {
          return Yavanna.get(name);
        }
      });

      return factory;
    };

    Yavanna.get = function (name) {
      validateGetArgs(name);

      if (!cache[name]) {
        cache[name] = registeredFactories[name](provender);
      }

      return cache[name];
    };

    function validateProvideArgs(name, factory) {
      if (typeof name !== 'string') {
        throw new Error('Yavanna.provide expects a name as the first argument.');
      }

      if (typeof factory !== 'function') {
        throw Error('Yavanna.provide expects a factory function as the second argument. Check the declaration of `' + name + '`.');
      }

      if (registeredFactories[name]) {
        throw Error('Yavanna: cannot override the previously registered factory for `' + name + '`.');
      }
    }

    function validateGetArgs(name) {
      if (!registeredFactories[name]) {
        throw Error('Yavanna: no factory registered for `' + name + '`.');
      }
    }

    module.exports = Yavanna;
  }, {}], 2: [function (require, module, exports) {
    ;(function () {
      "use strict";

      var Yavanna = require('@benchristel/yavanna');

      Yavanna.provide('englishGreeting', function (inj) {
        var greet = inj.greet;
        return greet('Hello');
      });
    })();

    ;(function () {
      "use strict";

      var Yavanna = require('@benchristel/yavanna');

      Yavanna.provide('greet', function () {
        return function (greeting) {
          return function (name) {
            return greeting + ", " + name + ".";
          };
        };
      });
    })();

    ;(function () {
      "use strict";

      var Yavanna = require('@benchristel/yavanna');

      console.log(Yavanna.get('englishGreeting')('Satoshi'));
    })();
  }, { "@benchristel/yavanna": 1 }] }, {}, [2]);