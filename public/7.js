(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Home.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/Home.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      drawer: false
    };
  },
  computed: {
    isSudo: function isSudo() {
      return this.$store.getters.roleId == 1;
    },
    isPostReviewer: function isPostReviewer() {
      return this.$store.getters.roleId == 1 || this.$store.getters.roleId == 2;
    },
    isAdsReviewer: function isAdsReviewer() {
      return this.$store.getters.roleId == 1 || this.$store.getters.roleId == 3;
    },
    isProfileReviewer: function isProfileReviewer() {
      return this.$store.getters.roleId == 1 || this.$store.getters.roleId == 4;
    },
    currentUser: function currentUser() {
      return this.$store.getters.currentUser;
    },
    adminHomeRoute: function adminHomeRoute() {
      return this.$route.name == "home-admin";
    }
  },
  methods: {
    logout: function logout() {
      this.$store.commit('logoutNotifications');
      this.$store.commit('logoutSuggest');
      this.$store.commit('logoutTrend');
      this.$store.commit('logoutPosts');
      this.$store.commit('logoutProfile');
      this.$store.commit('logoutFollowing');
      this.$store.commit('logoutTopics');
      this.$store.commit('logoutAuth');
      this.$store.commit('logoutTimeline');
      this.$store.commit('logoutAdmin');
      this.$router.push('/');
      window.location.href = window.location.origin;
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Home.vue?vue&type=template&id=11fb4e6c&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/Home.vue?vue&type=template&id=11fb4e6c&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************/
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
    "v-container",
    { attrs: { "grid-list-md": "" } },
    [
      _c(
        "v-content",
        [
          _vm.adminHomeRoute
            ? _c("h1", { staticClass: "text-xs-center white--text" }, [
                _vm._v("Hi, "),
                _c("span", { staticClass: "text-uppercase yellow--text" }, [
                  _vm._v(_vm._s(_vm.currentUser.name))
                ])
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm.adminHomeRoute
            ? _c(
                "h2",
                { staticClass: "text-xs-center white--text" },
                [
                  _vm._v("Have a good day "),
                  _c("v-icon", { attrs: { color: "red" } }, [
                    _vm._v("local_florist")
                  ])
                ],
                1
              )
            : _vm._e(),
          _vm._v(" "),
          _c(
            "v-toolbar",
            { attrs: { color: "#005f5b", dark: "", app: "" } },
            [
              _c("v-toolbar-side-icon", {
                on: {
                  click: function($event) {
                    _vm.drawer = !_vm.drawer
                  }
                }
              }),
              _vm._v(" "),
              _c("v-toolbar-title", [_vm._v("Worder Admin panel")]),
              _vm._v(" "),
              _c("v-spacer"),
              _vm._v(" "),
              _c(
                "v-toolbar-items",
                { staticClass: "hidden-sm-and-down" },
                [
                  _c("v-btn", { attrs: { flat: "", router: "", to: "/" } }, [
                    _vm._v("app")
                  ]),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    { attrs: { flat: "" }, on: { click: _vm.logout } },
                    [_vm._v("logout")]
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-layout",
            { attrs: { row: "", wrap: "" } },
            [
              _c("v-flex", { attrs: { xs12: "" } }, [_c("router-view")], 1),
              _vm._v(" "),
              _c(
                "v-navigation-drawer",
                {
                  attrs: { app: "", dark: "" },
                  model: {
                    value: _vm.drawer,
                    callback: function($$v) {
                      _vm.drawer = $$v
                    },
                    expression: "drawer"
                  }
                },
                [
                  _c(
                    "v-list",
                    { staticClass: "pa-1" },
                    [
                      _c(
                        "v-list-tile",
                        [
                          _c(
                            "v-list-tile-action",
                            [
                              _c(
                                "v-list-tile-content",
                                [
                                  _c("v-list-tile-title", [
                                    _vm._v("Admin Panel")
                                  ])
                                ],
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
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list",
                    { staticClass: "pt-0", attrs: { dense: "" } },
                    [
                      _c("v-divider"),
                      _vm._v(" "),
                      _vm.isSudo
                        ? _c(
                            "v-list-tile",
                            {
                              attrs: { router: "", to: { name: "list-admin" } }
                            },
                            [
                              _c(
                                "v-list-tile-action",
                                [_c("v-icon", [_vm._v("dashboard")])],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-list-tile-content",
                                [_c("v-list-tile-title", [_vm._v("Admins")])],
                                1
                              )
                            ],
                            1
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.isPostReviewer
                        ? _c(
                            "v-list-tile",
                            {
                              attrs: {
                                router: "",
                                to: "/admin/dashboard/list-admins"
                              }
                            },
                            [
                              _c(
                                "v-list-tile-action",
                                [_c("v-icon", [_vm._v("credit_card")])],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-list-tile-content",
                                [_c("v-list-tile-title", [_vm._v("Posts")])],
                                1
                              )
                            ],
                            1
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.isProfileReviewer
                        ? _c(
                            "v-list-tile",
                            { attrs: { router: "", to: "/" } },
                            [
                              _c(
                                "v-list-tile-action",
                                [_c("v-icon", [_vm._v("description")])],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-list-tile-content",
                                [_c("v-list-tile-title", [_vm._v("Profiles")])],
                                1
                              )
                            ],
                            1
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.isAdsReviewer
                        ? _c(
                            "v-list-tile",
                            { attrs: { routet: "", to: "/" } },
                            [
                              _c(
                                "v-list-tile-action",
                                [_c("v-icon", [_vm._v("label")])],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-list-tile-content",
                                [_c("v-list-tile-title", [_vm._v("Ads")])],
                                1
                              )
                            ],
                            1
                          )
                        : _vm._e()
                    ],
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
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/admin/Home.vue":
/*!************************************************!*\
  !*** ./resources/js/components/admin/Home.vue ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Home_vue_vue_type_template_id_11fb4e6c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Home.vue?vue&type=template&id=11fb4e6c&scoped=true& */ "./resources/js/components/admin/Home.vue?vue&type=template&id=11fb4e6c&scoped=true&");
/* harmony import */ var _Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Home.vue?vue&type=script&lang=js& */ "./resources/js/components/admin/Home.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Home_vue_vue_type_template_id_11fb4e6c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Home_vue_vue_type_template_id_11fb4e6c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "11fb4e6c",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/admin/Home.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/admin/Home.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./resources/js/components/admin/Home.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Home.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Home.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/admin/Home.vue?vue&type=template&id=11fb4e6c&scoped=true&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/admin/Home.vue?vue&type=template&id=11fb4e6c&scoped=true& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_11fb4e6c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Home.vue?vue&type=template&id=11fb4e6c&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Home.vue?vue&type=template&id=11fb4e6c&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_11fb4e6c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_11fb4e6c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);