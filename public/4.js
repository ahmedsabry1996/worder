(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Notifications.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Notifications.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var laravel_echo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! laravel-echo */ "./node_modules/laravel-echo/dist/echo.js");
/* harmony import */ var pusher_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! pusher-js */ "./node_modules/pusher-js/dist/web/pusher.js");
/* harmony import */ var pusher_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(pusher_js__WEBPACK_IMPORTED_MODULE_2__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




var moment = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      showMenu: false,
      loading: false,
      offset: 0,
      color: 'white'
    };
  },
  computed: {
    notifications: function notifications() {
      return this.$store.getters.notifications;
    },
    unreadNotifications: function unreadNotifications() {
      if (!this.$store.getters.unreadNotifications) {
        return this.color = 'white';
      } else {
        return this.color = 'error';
      }
    },
    isLoggedIn: function isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    userToken: function userToken() {
      return this.$store.getters.userToken;
    },
    broadcastNotifications: function broadcastNotifications() {
      return this.$store.getters.broadcastNotifications;
    }
  },
  created: function created() {
    this.getNotifications();
  },
  mounted: function mounted() {
    this.listen();
  },
  methods: {
    notificationSound: function notificationSound() {
      var audio = new Audio("http://127.0.0.1:8000/sounds/noti.ogg");
      audio.play();
    },
    getNotifications: function getNotifications() {
      if (this.isLoggedIn) {
        if (this.notifications.length === 0) {
          this.offset = 0;
          this.$store.dispatch('getNotifications');
        }
      }
    },
    listen: function listen() {
      var self = this;

      if (self.isLoggedIn) {
        window.Echo = new laravel_echo__WEBPACK_IMPORTED_MODULE_1__["default"]({
          broadcaster: 'pusher',
          key: 'mykey',
          cluster: 'eu',
          encrypted: false,
          wsHost: window.location.hostname,
          wsPort: 6001,
          disableStats: true,
          auth: {
            headers: {
              Authorization: 'Bearer ' + this.$store.state.authentication.userToken
            }
          }
        });
        var decoded = self.jwt_decode(this.$store.state.authentication.userToken);
        window.Echo.private("App.User.".concat(decoded.sub)).notification(function (Notification) {
          var newNotification = new Object();
          newNotification.data = {
            icon: Notification.icon,
            message: Notification.message,
            url: Notification.url,
            created_at: Notification.created_at
          };
          console.log(newNotification);
          console.log(Notification);
          self.notificationSound();
          self.$store.commit('unreadNotifications');
          self.$store.commit('instantNotfication', newNotification);
        });
        window.Echo.channel('trend').listen('.newTrend', function () {
          axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('/api/trend/update', {}, {
            headers: {
              Authorization: "Bearer ".concat(self.$store.state.authentication.userToken)
            }
          }).then(function (response) {
            console.log(response.data);
            self.notificationSound();
            self.$store.commit('topTen', {
              trend: response.data.trend.top_words
            });
          }).catch(function (errors) {
            console.log(errors);
            console.log(errors.response);
          });
        });
      }
    },
    loadMoreNotifications: function loadMoreNotifications(e) {
      var elHeight = e.target.clientHeight;
      var elscrollHeight = e.target.scrollHeight;
      var elScrollTop = e.target.scrollTop;

      if (elHeight + elScrollTop - elscrollHeight == 0) {
        console.log(454545);
        this.offset += 10;
        this.$store.dispatch('loadMoreNotifications', {
          offset: this.offset
        });
      }
    },
    jwt_decode: function jwt_decode(token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      console.log('ddd');
      return JSON.parse(window.atob(base64));
    }
  },
  filters: {
    getDateForHumans: function getDateForHumans(value) {
      return moment(value).locale("ar").subtract(-2, 'hours').fromNow();
    },
    highlightUsername: function highlightUsername(val) {
      if (val.includes('start')) {
        return val.split(' ')[0];
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Notifications.vue?vue&type=style&index=0&id=d7f806e6&scoped=true&lang=css&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Notifications.vue?vue&type=style&index=0&id=d7f806e6&scoped=true&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.mm[data-v-d7f806e6]{\n  width:300px !important;\n  margin: 0 auto !important;\n  height: 300px !important;\n  max-height:300px !important;\n  background-color:#fff !important;\n  overflow:scroll;\n}\n.mmd[data-v-d7f806e6]{\n  margin:0 auto;\n  width:100% !important;\n  height: 100% !important;\n  max-height:100% !important;\n  background-color:#002d37 !important;\n  overflow:scroll;\n  position: absolute;\n  top:58px;\n  bottom:0;\n  left:0;\n  right:0\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Notifications.vue?vue&type=style&index=0&id=d7f806e6&scoped=true&lang=css&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Notifications.vue?vue&type=style&index=0&id=d7f806e6&scoped=true&lang=css& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--6-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--6-2!../../../node_modules/vue-loader/lib??vue-loader-options!./Notifications.vue?vue&type=style&index=0&id=d7f806e6&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Notifications.vue?vue&type=style&index=0&id=d7f806e6&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Notifications.vue?vue&type=template&id=d7f806e6&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Notifications.vue?vue&type=template&id=d7f806e6&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "div",
        {
          staticClass: "mmd hidden-sm-and-up",
          on: { scroll: _vm.loadMoreNotifications }
        },
        [
          _c(
            "v-list",
            { attrs: { "two-line": "", dark: "" } },
            [
              _vm._l(_vm.notifications, function(notification, index) {
                return [
                  _c(
                    "v-list-tile",
                    {
                      key: index,
                      attrs: { router: "", to: "/" + notification.data.url }
                    },
                    [
                      _c("v-list-tile-avatar", [
                        _c("img", {
                          attrs: {
                            src: "/storage/avatars/" + notification.data.icon
                          }
                        })
                      ]),
                      _vm._v(" "),
                      _c(
                        "v-list-tile-content",
                        [
                          _c("v-list-tile-title", [
                            _vm._v(_vm._s(notification.data.message))
                          ]),
                          _vm._v(" "),
                          _c("v-list-tile-sub-title", [
                            _vm._v(
                              "\n              " +
                                _vm._s(
                                  _vm._f("getDateForHumans")(
                                    notification.data.created_at.date
                                  )
                                ) +
                                "\n            "
                            )
                          ])
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("v-divider")
                ]
              })
            ],
            2
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-menu",
        {
          staticClass: "hidden-xs-only",
          attrs: { left: "", "offset-x": "", width: "200", "full-width": true }
        },
        [
          _c(
            "v-btn",
            {
              staticClass: "white--text mt-3",
              attrs: { slot: "activator", flat: "", icon: "" },
              on: { click: _vm.getNotifications },
              slot: "activator"
            },
            [
              _c("v-icon", { attrs: { color: _vm.color } }, [
                _vm._v("\n      notifications\n    ")
              ])
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "mm", on: { scroll: _vm.loadMoreNotifications } },
            [
              _c(
                "v-list",
                { attrs: { "two-line": "" } },
                _vm._l(_vm.notifications, function(notification, index) {
                  return _c(
                    "v-list-tile",
                    {
                      key: index,
                      attrs: { router: "", to: notification.data.url }
                    },
                    [
                      _c("v-list-tile-avatar", [
                        _c("img", {
                          attrs: {
                            src: "/storage/avatars/" + notification.data.icon
                          }
                        })
                      ]),
                      _vm._v(" "),
                      _c(
                        "v-list-tile-content",
                        [
                          _c("v-list-tile-title", [
                            _vm._v(_vm._s(notification.data.message))
                          ]),
                          _vm._v(" "),
                          _c("v-list-tile-sub-title", [
                            _vm._v(
                              "\n              " +
                                _vm._s(
                                  _vm._f("getDateForHumans")(
                                    notification.data.created_at.date
                                  )
                                ) +
                                "\n            "
                            )
                          ])
                        ],
                        1
                      )
                    ],
                    1
                  )
                }),
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/Notifications.vue":
/*!***************************************************!*\
  !*** ./resources/js/components/Notifications.vue ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Notifications_vue_vue_type_template_id_d7f806e6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Notifications.vue?vue&type=template&id=d7f806e6&scoped=true& */ "./resources/js/components/Notifications.vue?vue&type=template&id=d7f806e6&scoped=true&");
/* harmony import */ var _Notifications_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Notifications.vue?vue&type=script&lang=js& */ "./resources/js/components/Notifications.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Notifications_vue_vue_type_style_index_0_id_d7f806e6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Notifications.vue?vue&type=style&index=0&id=d7f806e6&scoped=true&lang=css& */ "./resources/js/components/Notifications.vue?vue&type=style&index=0&id=d7f806e6&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Notifications_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Notifications_vue_vue_type_template_id_d7f806e6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Notifications_vue_vue_type_template_id_d7f806e6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "d7f806e6",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Notifications.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Notifications.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/components/Notifications.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Notifications_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Notifications.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Notifications.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Notifications_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Notifications.vue?vue&type=style&index=0&id=d7f806e6&scoped=true&lang=css&":
/*!************************************************************************************************************!*\
  !*** ./resources/js/components/Notifications.vue?vue&type=style&index=0&id=d7f806e6&scoped=true&lang=css& ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Notifications_vue_vue_type_style_index_0_id_d7f806e6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader!../../../node_modules/css-loader??ref--6-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--6-2!../../../node_modules/vue-loader/lib??vue-loader-options!./Notifications.vue?vue&type=style&index=0&id=d7f806e6&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Notifications.vue?vue&type=style&index=0&id=d7f806e6&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Notifications_vue_vue_type_style_index_0_id_d7f806e6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Notifications_vue_vue_type_style_index_0_id_d7f806e6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Notifications_vue_vue_type_style_index_0_id_d7f806e6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Notifications_vue_vue_type_style_index_0_id_d7f806e6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Notifications_vue_vue_type_style_index_0_id_d7f806e6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/Notifications.vue?vue&type=template&id=d7f806e6&scoped=true&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/Notifications.vue?vue&type=template&id=d7f806e6&scoped=true& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Notifications_vue_vue_type_template_id_d7f806e6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Notifications.vue?vue&type=template&id=d7f806e6&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Notifications.vue?vue&type=template&id=d7f806e6&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Notifications_vue_vue_type_template_id_d7f806e6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Notifications_vue_vue_type_template_id_d7f806e6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);