(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[15],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/auth/Veifyemail.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/auth/Veifyemail.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      code: ''
    };
  },
  mounted: function mounted() {
    console.log('Verify email loaded');
  },
  computed: {
    verificationCode: function verificationCode() {
      return this.$store.getters.verificationCode;
    }
  },
  methods: {
    verifyCode: function verifyCode() {
      var _this = this;

      if (this.verificationCode == this.code) {
        this.$store.dispatch('signup').then(function (response) {
          _this.$store.commit('cancelEmailVerification');

          _this.$router.push('/create-profile');
        }).catch(function (error) {
          console.log(error);
          console.log(error.response);
          alert('error in verification.');
        });
      } else {
        swal({
          title: this.$t('error'),
          text: this.$t('codeerror'),
          icon: 'error'
        });
      }
    },
    cancel: function cancel() {
      this.$store.commit('cancelEmailVerification');
      this.$router.push('/');
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/auth/Veifyemail.vue?vue&type=template&id=42c7d23b&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/auth/Veifyemail.vue?vue&type=template&id=42c7d23b& ***!
  \******************************************************************************************************************************************************************************************************************/
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
          _c(
            "v-flex",
            { attrs: { xs12: "", sm4: "", "offset-sm4": "" } },
            [
              _c("h2", [_vm._v(_vm._s(_vm.verificationCode))]),
              _vm._v(" "),
              _c(
                "v-card",
                { staticClass: "mt-5", attrs: { color: "#002d37" } },
                [
                  _c(
                    "v-form",
                    {
                      on: {
                        submit: function($event) {
                          $event.preventDefault()
                          return _vm.verifyCode($event)
                        }
                      }
                    },
                    [
                      _c(
                        "div",
                        { staticClass: "pa-4" },
                        [
                          _c("v-text-field", {
                            attrs: { label: "label", solo: "", autofocus: "" },
                            model: {
                              value: _vm.code,
                              callback: function($$v) {
                                _vm.code = $$v
                              },
                              expression: "code"
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
                                    round: "",
                                    type: "button",
                                    color: "primary"
                                  },
                                  on: { click: _vm.verifyCode }
                                },
                                [_vm._v("\n          verify\n      ")]
                              ),
                              _vm._v(" "),
                              _c(
                                "v-btn",
                                {
                                  attrs: { color: "error" },
                                  on: { click: _vm.cancel }
                                },
                                [_vm._v("cancel")]
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ]
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

/***/ "./resources/js/components/auth/Veifyemail.vue":
/*!*****************************************************!*\
  !*** ./resources/js/components/auth/Veifyemail.vue ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Veifyemail_vue_vue_type_template_id_42c7d23b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Veifyemail.vue?vue&type=template&id=42c7d23b& */ "./resources/js/components/auth/Veifyemail.vue?vue&type=template&id=42c7d23b&");
/* harmony import */ var _Veifyemail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Veifyemail.vue?vue&type=script&lang=js& */ "./resources/js/components/auth/Veifyemail.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Veifyemail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Veifyemail_vue_vue_type_template_id_42c7d23b___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Veifyemail_vue_vue_type_template_id_42c7d23b___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/auth/Veifyemail.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/auth/Veifyemail.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./resources/js/components/auth/Veifyemail.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Veifyemail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Veifyemail.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/auth/Veifyemail.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Veifyemail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/auth/Veifyemail.vue?vue&type=template&id=42c7d23b&":
/*!************************************************************************************!*\
  !*** ./resources/js/components/auth/Veifyemail.vue?vue&type=template&id=42c7d23b& ***!
  \************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Veifyemail_vue_vue_type_template_id_42c7d23b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Veifyemail.vue?vue&type=template&id=42c7d23b& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/auth/Veifyemail.vue?vue&type=template&id=42c7d23b&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Veifyemail_vue_vue_type_template_id_42c7d23b___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Veifyemail_vue_vue_type_template_id_42c7d23b___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);