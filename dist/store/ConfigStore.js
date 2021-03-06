"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // import { decorate, observable } from "mobx";


var _mobx = require("mobx");

var mobx = _interopRequireWildcard(_mobx);

var _paths = require("../../webpack/paths");

var _paths2 = _interopRequireDefault(_paths);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConfigStore = function () {
  function ConfigStore(RootStore) {
    _classCallCheck(this, ConfigStore);

    this.RootStore = RootStore;
    this.reset();
    this.getAppDetails();
  }

  _createClass(ConfigStore, [{
    key: "reset",
    value: function reset() {
      this.config = null;
      this.oldConfig = null;
      this.gateway = {};
      this.language = "en";

      this.style = {
        base: {
          color: "#535353",
          lineHeight: "18px",
          fontFamily: this.language === "en" ? "Roboto-Light" : "Helvetica-Light",
          fontUrl: this.language === "en" ? _paths2.default.cssPath + "fontsEn.css" : _paths2.default.cssPath + "fontsAr.css",
          fontSmoothing: "antialiased",
          fontSize: "15px",
          "::placeholder": {
            color: "rgba(0, 0, 0, 0.26)",
            fontSize: this.language === "en" ? "15px" : "10px"
          }
        },
        invalid: {
          color: "red",
          iconColor: "#fa755a "
        }
      };

      this.browser = null;
      this.os = null;
      this.navigator = null;

      this.token = null;
      this.notifications = "standard";
      // this.legalConfig = true;
      this.redirect_url = null;

      // this.ip = null;
    }
  }, {
    key: "callbackFunc",
    value: function callbackFunc(data) {
      // //console.log('hey ', data);
      if (this.RootStore.configStore.gateway.callback) {
        this.RootStore.configStore.gateway.callback(data);
      }
    }
  }, {
    key: "getAppDetails",
    value: function getAppDetails() {
      var module = {
        options: [],
        header: [navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor, window.opera],
        dataos: [{ name: "Windows Phone", value: "Windows Phone", version: "OS" }, { name: "Windows", value: "Win", version: "NT" }, { name: "iPhone", value: "iPhone", version: "OS" }, { name: "iPad", value: "iPad", version: "OS" }, { name: "Kindle", value: "Silk", version: "Silk" }, { name: "Android", value: "Android", version: "Android" }, { name: "PlayBook", value: "PlayBook", version: "OS" }, { name: "BlackBerry", value: "BlackBerry", version: "/" }, { name: "Macintosh", value: "Mac", version: "OS X" }, { name: "Linux", value: "Linux", version: "rv" }, { name: "Palm", value: "Palm", version: "PalmOS" }],
        databrowser: [{ name: "Chrome", value: "Chrome", version: "Chrome" }, { name: "Firefox", value: "Firefox", version: "Firefox" }, { name: "Safari", value: "Safari", version: "Version" }, { name: "Internet Explorer", value: "MSIE", version: "MSIE" }, { name: "Opera", value: "Opera", version: "Opera" }, { name: "BlackBerry", value: "CLDC", version: "CLDC" }, { name: "Mozilla", value: "Mozilla", version: "Mozilla" }],
        init: function init() {
          var agent = this.header.join(" "),
              os = this.matchItem(agent, this.dataos),
              browser = this.matchItem(agent, this.databrowser);

          return { os: os, browser: browser };
        },
        matchItem: function matchItem(string, data) {
          var i = 0,
              j = 0,
              html = "",
              regex,
              regexv,
              match,
              matches,
              version;

          for (i = 0; i < data.length; i += 1) {
            regex = new RegExp(data[i].value, "i");
            match = regex.test(string);
            if (match) {
              regexv = new RegExp(data[i].version + "[- /:;]([\\d._]+)", "i");
              matches = string.match(regexv);
              version = "";
              if (matches) {
                if (matches[1]) {
                  matches = matches[1];
                }
              }
              if (matches) {
                matches = matches.split(/[._]+/);
                for (j = 0; j < matches.length; j += 1) {
                  if (j === 0) {
                    version += matches[j] + ".";
                  } else {
                    version += matches[j];
                  }
                }
              } else {
                version = "0";
              }
              return {
                name: data[i].name,
                version: parseFloat(version)
              };
            }
          }
          return { name: "unknown", version: 0 };
        }
      };

      var e = module.init();

      // debug += "os.name = " + e.os.name + "<br/>";
      // debug += "os.version = " + e.os.version + "<br/>";
      // debug += "browser.name = " + e.browser.name + "<br/>";
      // debug += "browser.version = " + e.browser.version + "<br/>";

      // debug += "<br/>";
      // debug += "navigator.userAgent = " + navigator.userAgent + "<br/>";
      // debug += "navigator.appVersion = " + navigator.appVersion + "<br/>";
      // debug += "navigator.platform = " + navigator.platform + "<br/>";
      // debug += "navigator.vendor = " + navigator.vendor + "<br/>";
      // console.log("debug", debug);

      this.browser = e.browser;
      this.os = e.os;
      this.navigator = navigator;

      this.app = {
        app_locale: this.language,
        requirer: "web.checkout",
        app_id: "gosell.checkout.web",
        app_client_version: "1.5.0",
        app_server_version: "1.4.0",
        requirer_os: this.os != null ? this.os.name : "unknown",
        requirer_os_version: this.os != null ? this.os.version : "unknown",
        requirer_browser: this.browser != null ? this.browser.name : "unknown",
        requirer_browser_version: this.browser != null ? this.browser.version : "unknown",
        user_agent: this.navigator != null ? this.navigator.userAgent : "unknown"
      };

      console.log("app ==> ", this.app);
    }
  }, {
    key: "setConfig",
    value: function setConfig(value, view) {
      var _this = this;

      var self = this;

      this.config = value;
      this.oldConfig = JSON.stringify(mobx.toJS(this.config));

      this.config = Object.assign({}, value);
      this.config["location"] = {
        protocol: window.location.protocol,
        host: window.location.host,
        path: window.location.pathname
      };

      // this.getAppDetails();

      this.config["app"] = this.app;

      console.log("config", this.config);

      if (value.gateway) {
        // this.gateway = value.gateway ? value.gateway : {};
        this.language = value.gateway.language ? value.gateway.language : "en";
        // console.log("language", this.language);

        if (value.gateway.labels) {
          this.labels = {
            cardNumber: value.gateway.labels.cardNumber ? value.gateway.labels.cardNumber : this.RootStore.localizationStore.getContent("card_input_card_number_placeholder", null),
            expirationDate: value.gateway.labels.expirationDate ? value.gateway.labels.expirationDate : this.RootStore.localizationStore.getContent("card_input_expiration_date_placeholder", null),
            cvv: value.gateway.labels.cvv ? value.gateway.labels.cvv : this.RootStore.localizationStore.getContent("card_input_cvv_placeholder", null),
            cardHolder: value.gateway.labels.cardHolder ? value.gateway.labels.cardHolder : this.RootStore.localizationStore.getContent("card_input_cardholder_name_placeholder", null)
          };
        } else {
          this.labels = {
            cardNumber: this.RootStore.localizationStore.getContent("card_input_card_number_placeholder", null),
            expirationDate: this.RootStore.localizationStore.getContent("card_input_expiration_date_placeholder", null),
            cvv: this.RootStore.localizationStore.getContent("card_input_cvv_placeholder", null),
            cardHolder: this.RootStore.localizationStore.getContent("card_input_cardholder_name_placeholder", null)
          };
        }

        this.style = {
          base: value.gateway.style && value.gateway.style.base ? value.gateway.style.base : {
            color: "#535353",
            lineHeight: "18px",
            fontFamily: this.language === "en" ? "Roboto-Light" : "Helvetica-Light",
            fontUrl: this.language === "en" ? _paths2.default.cssPath + "fontsEn.css" : _paths2.default.cssPath + "fontsAr.css",
            fontSmoothing: "antialiased",
            fontSize: "15px",
            "::placeholder": {
              color: "rgba(0, 0, 0, 0.26)",
              fontSize: "15px"
            }
          },
          invalid: value.gateway.style && value.gateway.style.invalid ? value.gateway.style.invalid : {
            color: "red",
            iconColor: "#fa755a "
          }
        };
      }

      var gatewayObj = value.gateway ? {
        publicKey: value.gateway.publicKey ? value.gateway.publicKey : null,
        merchantId: value.gateway.merchantId ? value.gateway.merchantId : null,
        contactInfo: typeof value.gateway.contactInfo != "undefined" ? value.gateway.contactInfo : true,
        customerCards: typeof value.gateway.customerCards != "undefined" ? value.gateway.customerCards : true,
        language: value.gateway.language ? value.gateway.language : "en",
        notifications: value.gateway.notifications ? value.gateway.notifications : "standard",
        callback: value.gateway.callback ? value.gateway.callback : null,
        onClose: value.gateway.onClose ? value.gateway.onClose : null,
        backgroundImg: value.gateway.backgroundImg ? value.gateway.backgroundImg : null,
        saveCardOption: typeof value.gateway.saveCardOption != "undefined" ? value.gateway.saveCardOption : true,
        supportedCurrencies: value.gateway.supportedCurrencies ? value.gateway.supportedCurrencies : "all",
        supportedPaymentMethods: value.gateway.supportedPaymentMethods ? value.gateway.supportedPaymentMethods : "all",
        labels: value.gateway.labels ? value.gateway.labels : this.labels,
        style: value.gateway.style ? value.gateway.style : this.style
      } : {};

      this.config.gateway = gatewayObj;
      this.gateway = gatewayObj;

      var transaction_mode = this.config.transaction ? this.config.transaction.mode : null;

      this.notifications = value.gateway && value.gateway.notifications ? value.gateway.notifications : "standard";

      if (view === "GOSELL") {
        switch (transaction_mode) {
          case "charge":
            self.redirect_url = self.config.transaction.charge ? self.config.transaction.charge.redirect : window.location.href;
            break;
          case "authorize":
            self.redirect_url = self.config.transaction.authorize ? self.config.transaction.authorize.redirect : window.location.href;
            break;
        }

        console.log("token inside ===> ", this.token);
        this.RootStore.apiStore.generateToken(this.config).then(function (obj) {
          self.token = obj.token;
          console.log("token", _this.token);
        });
      }
    }
  }]);

  return ConfigStore;
}();

mobx.decorate(ConfigStore, {
  config: mobx.observable,
  token: mobx.observable,
  notifications: mobx.observable,
  gateway: mobx.observable,
  redirect_url: mobx.observable,
  language: mobx.observable,
  app: mobx.observable,
  oldConfig: mobx.observable
  // ip: observable
  // legalConfig:observable
});

exports.default = ConfigStore;