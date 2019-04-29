(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/ListAdmins.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/ListAdmins.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************/
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
      search: '',
      modal: false,
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      selectedRole: '',
      roles: [{
        role: 'sudo',
        id: 1
      }, {
        role: 'post reviewer',
        id: 2
      }, {
        role: 'profile reviewer',
        id: 3
      }, {
        role: 'ads reviewer',
        id: 4
      }],
      headers: [{
        text: 'Name',
        value: 'name',
        align: 'center'
      }, {
        text: 'Role',
        value: 'role',
        align: 'center'
      }, {
        text: 'Actions',
        value: 'name',
        align: 'center'
      }]
    };
  },
  computed: {
    admins: function admins() {
      return this.$store.getters.admins.reverse();
    }
  },
  created: function created() {
    this.$store.dispatch('fetchAdmins');
  },
  methods: {
    createAdmin: function createAdmin() {
      var _this = this;

      this.$store.dispatch('createAdmin', {
        name: this.name,
        email: this.email,
        password: this.password,
        passwordConfirmation: this.passwordConfirmation,
        role: this.selectedRole
      }).then(function (response) {
        _this.modal = false;
      }).catch(function (error) {
        alert('error in createing admin');
        console.log(error);
        console.log(error.response);
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/ListAdmins.vue?vue&type=template&id=1a583526&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/ListAdmins.vue?vue&type=template&id=1a583526&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************/
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
        "v-layout",
        { attrs: { row: "", wrap: "" } },
        [
          _c("v-flex", { attrs: { xs12: "" } }, [
            _c("h1", { staticClass: "white--text text-xs-center" }, [
              _vm._v("List Admins")
            ])
          ]),
          _vm._v(" "),
          _c(
            "v-flex",
            { attrs: { xs12: "" } },
            [
              _c(
                "v-btn",
                {
                  attrs: { color: "primary", round: "" },
                  on: {
                    click: function($event) {
                      _vm.modal = true
                    }
                  }
                },
                [_vm._v("add one "), _c("v-icon", [_vm._v("add")])],
                1
              ),
              _vm._v(" "),
              _c(
                "v-dialog",
                {
                  attrs: {
                    scrollable: "",
                    overlay: false,
                    "max-width": "500px",
                    transition: "dialog-transition"
                  },
                  model: {
                    value: _vm.modal,
                    callback: function($$v) {
                      _vm.modal = $$v
                    },
                    expression: "modal"
                  }
                },
                [
                  _c(
                    "v-card",
                    { attrs: { dark: "" } },
                    [
                      _c(
                        "v-form",
                        { staticClass: "ma-3 pa-3" },
                        [
                          _c("v-text-field", {
                            attrs: { label: "name", outline: "" },
                            model: {
                              value: _vm.name,
                              callback: function($$v) {
                                _vm.name = $$v
                              },
                              expression: "name"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-text-field", {
                            attrs: { label: "email", outline: "" },
                            model: {
                              value: _vm.email,
                              callback: function($$v) {
                                _vm.email = $$v
                              },
                              expression: "email"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-text-field", {
                            attrs: { label: "password", outline: "" },
                            model: {
                              value: _vm.password,
                              callback: function($$v) {
                                _vm.password = $$v
                              },
                              expression: "password"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-text-field", {
                            attrs: { label: "confirm", outline: "" },
                            model: {
                              value: _vm.passwordConfirmation,
                              callback: function($$v) {
                                _vm.passwordConfirmation = $$v
                              },
                              expression: "passwordConfirmation"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-select", {
                            attrs: {
                              items: _vm.roles,
                              label: "role",
                              "item-text": "role",
                              "item-value": "id",
                              outline: ""
                            },
                            model: {
                              value: _vm.selectedRole,
                              callback: function($$v) {
                                _vm.selectedRole = $$v
                              },
                              expression: "selectedRole"
                            }
                          }),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "text-xs-center" },
                            [
                              _c(
                                "v-btn",
                                {
                                  attrs: {
                                    color: "success",
                                    small: "",
                                    round: ""
                                  },
                                  on: { click: _vm.createAdmin }
                                },
                                [
                                  _vm._v("create "),
                                  _c("v-icon", [_vm._v("done")])
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
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-flex",
            { attrs: { xs12: "" } },
            [
              _c("v-data-table", {
                staticClass: "elevation-1",
                attrs: {
                  headers: _vm.headers,
                  items: _vm.admins,
                  search: _vm.search,
                  "hide-actions": "",
                  "item-key": "id",
                  loading: "true",
                  dark: ""
                },
                scopedSlots: _vm._u([
                  {
                    key: "items",
                    fn: function(props) {
                      return [
                        _c("td", { staticClass: "text-xs-center" }, [
                          _vm._v(_vm._s(props.item.name))
                        ]),
                        _vm._v(" "),
                        _c("td", { staticClass: "text-xs-center" }, [
                          _vm._v(_vm._s(props.item.role[0]["role"]))
                        ]),
                        _vm._v(" "),
                        _c(
                          "td",
                          { staticClass: "text-xs-center" },
                          [
                            _c(
                              "v-btn",
                              {
                                attrs: { round: "", small: "", color: "error" }
                              },
                              [_vm._v("delete")]
                            ),
                            _c(
                              "v-btn",
                              {
                                attrs: {
                                  round: "",
                                  small: "",
                                  color: "primary"
                                }
                              },
                              [_vm._v("edit")]
                            )
                          ],
                          1
                        )
                      ]
                    }
                  }
                ])
              })
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

/***/ "./resources/js/components/admin/ListAdmins.vue":
/*!******************************************************!*\
  !*** ./resources/js/components/admin/ListAdmins.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ListAdmins_vue_vue_type_template_id_1a583526_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ListAdmins.vue?vue&type=template&id=1a583526&scoped=true& */ "./resources/js/components/admin/ListAdmins.vue?vue&type=template&id=1a583526&scoped=true&");
/* harmony import */ var _ListAdmins_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ListAdmins.vue?vue&type=script&lang=js& */ "./resources/js/components/admin/ListAdmins.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ListAdmins_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ListAdmins_vue_vue_type_template_id_1a583526_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ListAdmins_vue_vue_type_template_id_1a583526_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "1a583526",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/admin/ListAdmins.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/admin/ListAdmins.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/admin/ListAdmins.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ListAdmins_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ListAdmins.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/ListAdmins.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ListAdmins_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/admin/ListAdmins.vue?vue&type=template&id=1a583526&scoped=true&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/components/admin/ListAdmins.vue?vue&type=template&id=1a583526&scoped=true& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ListAdmins_vue_vue_type_template_id_1a583526_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ListAdmins.vue?vue&type=template&id=1a583526&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/ListAdmins.vue?vue&type=template&id=1a583526&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ListAdmins_vue_vue_type_template_id_1a583526_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ListAdmins_vue_vue_type_template_id_1a583526_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);