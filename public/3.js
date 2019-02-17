(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/auth/Login.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/auth/Login.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
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
var Swal = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");


/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      loading: false,
      email: '',
      password: '',
      passwordConfirmation: '',
      rememberMe: false,
      forgetPassword: false,
      hasEmail: false,
      correctValidationCode: false,
      confirmationCode: '',
      emailedCode: null,
      userId: null,
      newPassword: null
    };
  },
  mounted: function mounted() {},
  computed: {},
  methods: {
    login: function login() {
      var _this = this;

      this.loading = true;
      axios__WEBPACK_IMPORTED_MODULE_0___default.a.post("/api/auth/login", {
        email: this.email,
        password: this.password,
        remember_me: this.rememberMe
      }).then(function (response) {
        console.log(response.data.user);

        if (!!response.data.trend) {
          localStorage.setItem('trend', response.data.trend.top_words);
        }

        localStorage.setItem('current_user', JSON.stringify(response.data.user));
        localStorage.setItem('current_user_profile', JSON.stringify(response.data.profile));
        localStorage.setItem('current_user_topics', JSON.stringify(response.data.topics));
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('user_id', response.data.user.id);
        localStorage.setItem('has_profile', response.data.user.has_profile);
        localStorage.setItem('is_verified', response.data.user.is_verified);

        if (response.data.user.is_verified == 1 && response.data.user.has_profile == 1) {
          _this.$store.commit("loginSuccess");

          _this.$store.commit("topTen");

          _this.$router.push('/');

          console.log("perfect user!");
        }

        if (response.data.user.is_verified == 1 && response.data.user.has_profile === 0) {
          _this.$store.commit('needProfile');

          _this.$router.push('/create-profile');

          console.log('verified but has no profile');
        }

        if (response.data.user.is_verified === 0 && response.data.user.has_profile === 0) {
          _this.$store.dispatch('sendVerificationCode', response.data.user.email).then(function () {
            localStorage.setItem('email', response.data.user.email);

            _this.$router.push('/signup');
          });

          console.log('need to verify account');
        }
      }).catch(function (errors) {
        _this.loading = false;
        swal({
          title: 'Login Error',
          text: _this.$t('loginfail'),
          icon: 'error'
        });
        console.log(errors);
        console.log(errors.response);
      });
    },
    resetPassword: function resetPassword() {
      this.forgetPassword = !this.forgetPassword;
    },
    verifyEmail: function verifyEmail() {
      var _this2 = this;

      this.loading = true;
      axios__WEBPACK_IMPORTED_MODULE_0___default.a.post("/api/verify-email", {
        email: this.email
      }).then(function (response) {
        _this2.loading = false;
        _this2.hasEmail = true;
        _this2.userId = response.data.user.id;
        _this2.emailedCode = response.data.verification_code;
        swal({
          title: "Done",
          text: _this2.$t('emailcheck'),
          icon: "success"
        });
      }).catch(function (errors) {
        _this2.loading = false;
        swal({
          title: "Oops!",
          text: _this2.$t('emailnotexist'),
          icon: "error"
        });
        console.log(errors);
        console.log(errors.response);
      });
    },
    verifyCode: function verifyCode() {
      if (this.confirmationCode == this.emailedCode) {
        this.correctValidationCode = true;
      } else {
        this.loading = false;
        swal({
          title: "Error",
          text: this.$t('codeerror'),
          icon: "error"
        });
      }
    },
    createNewPassword: function createNewPassword() {
      var _this3 = this;

      if (this.password.length >= 6) {
        if (this.password === this.passwordConfirmation) {
          this.newPassword = this.password;
          this.loading = true;
          axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('/api/auth/reset-password', {
            "password": this.password,
            "password_confirmation": this.passwordConfirmation,
            "user_id": this.userId
          }).then(function (response) {
            _this3.login();
          }).catch(function (errors) {
            _this3.loading = false;
            console.log(errors);
            console.log(errors.response);
          });
        } else {
          this.loading = false;
          swal({
            'title': "Error",
            "text": this.$t('passworderror'),
            "icon": "warning"
          });
        }
      } else {
        this.loading = false;
        swal({
          "title": "warning",
          "text": this.$t('passwordlength'),
          "icon": "warning"
        });
      }
    },
    cancelPassowrd: function cancelPassowrd() {
      this.loading = false;
      this.forgetPassword = false;
      this.hasEmail = false;
      this.correctValidationCode = false;
      this.confirmationCode = '';
      this.emailedCode = null;
      this.userId = null;
      this.newPassword = null;
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/auth/Login.vue?vue&type=style&index=0&id=4221c3ad&scoped=true&lang=css&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/auth/Login.vue?vue&type=style&index=0&id=4221c3ad&scoped=true&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\nh1[data-v-4221c3ad]{\n    color: #000;\n    letter-spacing: 2px;\n    margin-bottom: 20px;\n    font-family: 'Montserrat';\n    font-weight: 900;\n}\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/auth/Login.vue?vue&type=style&index=0&id=4221c3ad&scoped=true&lang=css&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/auth/Login.vue?vue&type=style&index=0&id=4221c3ad&scoped=true&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./Login.vue?vue&type=style&index=0&id=4221c3ad&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/auth/Login.vue?vue&type=style&index=0&id=4221c3ad&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/auth/Login.vue?vue&type=template&id=4221c3ad&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/auth/Login.vue?vue&type=template&id=4221c3ad&scoped=true& ***!
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
    "v-content",
    [
      _c(
        "v-layout",
        { attrs: { row: "", wrap: "" } },
        [
          _c(
            "v-flex",
            { attrs: { xs12: "", md4: "", "offset-md4": "" } },
            [
              !_vm.forgetPassword
                ? [
                    _c(
                      "v-form",
                      {
                        on: {
                          submit: function($event) {
                            $event.preventDefault()
                            return _vm.login($event)
                          }
                        }
                      },
                      [
                        _c("v-text-field", {
                          attrs: {
                            color: "white--text",
                            label: _vm.$t("email"),
                            "solo-inverted": "",
                            autofocus: ""
                          },
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
                          attrs: {
                            type: "password",
                            color: "white--text",
                            label: _vm.$t("password"),
                            "solo-inverted": ""
                          },
                          model: {
                            value: _vm.password,
                            callback: function($$v) {
                              _vm.password = $$v
                            },
                            expression: "password"
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
                                attrs: { round: "", color: "primary" },
                                on: { click: _vm.login }
                              },
                              [_vm._v(_vm._s(_vm.$t("login")))]
                            ),
                            _vm._v(" "),
                            !_vm.forgetPassword
                              ? _c(
                                  "v-btn",
                                  {
                                    attrs: { round: "", color: "warning" },
                                    on: { click: _vm.resetPassword }
                                  },
                                  [_vm._v(_vm._s(_vm.$t("forgetpassword")))]
                                )
                              : _vm._e()
                          ],
                          1
                        )
                      ],
                      1
                    )
                  ]
                : _vm._e(),
              _vm._v(" "),
              _vm.forgetPassword && !_vm.hasEmail
                ? [
                    _c(
                      "v-form",
                      {
                        on: {
                          submit: function($event) {
                            $event.preventDefault()
                            return _vm.verifyEmail($event)
                          }
                        }
                      },
                      [
                        _c("v-text-field", {
                          attrs: {
                            label: _vm.$t("email"),
                            "solo-inverted": ""
                          },
                          model: {
                            value: _vm.email,
                            callback: function($$v) {
                              _vm.email = $$v
                            },
                            expression: "email"
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
                                  color: "primary",
                                  loading: _vm.loading
                                },
                                on: { click: _vm.verifyEmail }
                              },
                              [_vm._v(_vm._s(_vm.$t("verify")) + "\n")]
                            )
                          ],
                          1
                        )
                      ],
                      1
                    )
                  ]
                : _vm._e(),
              _vm._v(" "),
              _vm.hasEmail && !_vm.correctValidationCode
                ? [
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
                        _c("label", { attrs: { for: "confirm_code" } }, [
                          _vm._v(_vm._s(_vm.$t("codesent")) + " : "),
                          _c("b", { staticClass: "white--text" }, [
                            _vm._v(_vm._s(_vm.email))
                          ])
                        ]),
                        _vm._v(" "),
                        _c("v-text-field", {
                          attrs: { "solo-inverted": "" },
                          model: {
                            value: _vm.confirmationCode,
                            callback: function($$v) {
                              _vm.confirmationCode = $$v
                            },
                            expression: "confirmationCode"
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
                                  loading: _vm.loading,
                                  color: "primary",
                                  round: ""
                                },
                                on: { click: _vm.verifyCode }
                              },
                              [
                                _vm._v(
                                  "\n        " +
                                    _vm._s(_vm.$t("verify")) +
                                    "\n    "
                                )
                              ]
                            )
                          ],
                          1
                        )
                      ],
                      1
                    )
                  ]
                : _vm._e(),
              _vm._v(" "),
              _vm.correctValidationCode && _vm.hasEmail
                ? [
                    _c(
                      "v-form",
                      {
                        on: {
                          submit: function($event) {
                            $event.preventDefault()
                            return _vm.createNewPassword($event)
                          }
                        }
                      },
                      [
                        _c("v-text-field", {
                          attrs: {
                            hint: _vm.$t("newpassword"),
                            type: "password",
                            "solo-inverted": ""
                          },
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
                          attrs: {
                            hint: _vm.$t("repeatpass"),
                            "solo-inverted": ""
                          },
                          model: {
                            value: _vm.passwordConfirmation,
                            callback: function($$v) {
                              _vm.passwordConfirmation = $$v
                            },
                            expression: "passwordConfirmation"
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
                                  color: "primary",
                                  loading: _vm.loading,
                                  round: ""
                                },
                                on: { click: _vm.createNewPassword }
                              },
                              [
                                _vm._v(
                                  "\n        " +
                                    _vm._s(_vm.$t("create")) +
                                    "\n      "
                                )
                              ]
                            )
                          ],
                          1
                        )
                      ],
                      1
                    )
                  ]
                : _vm._e(),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "text-xs-center" },
                [
                  _vm.forgetPassword
                    ? _c(
                        "v-btn",
                        {
                          attrs: { round: "", color: "error" },
                          on: { click: _vm.cancelPassowrd }
                        },
                        [_vm._v("\n    " + _vm._s(_vm.$t("cancel")) + "\n  ")]
                      )
                    : _vm._e()
                ],
                1
              )
            ],
            2
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

/***/ "./resources/js/components/auth/Login.vue":
/*!************************************************!*\
  !*** ./resources/js/components/auth/Login.vue ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Login_vue_vue_type_template_id_4221c3ad_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Login.vue?vue&type=template&id=4221c3ad&scoped=true& */ "./resources/js/components/auth/Login.vue?vue&type=template&id=4221c3ad&scoped=true&");
/* harmony import */ var _Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Login.vue?vue&type=script&lang=js& */ "./resources/js/components/auth/Login.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Login_vue_vue_type_style_index_0_id_4221c3ad_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Login.vue?vue&type=style&index=0&id=4221c3ad&scoped=true&lang=css& */ "./resources/js/components/auth/Login.vue?vue&type=style&index=0&id=4221c3ad&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Login_vue_vue_type_template_id_4221c3ad_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Login_vue_vue_type_template_id_4221c3ad_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "4221c3ad",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/auth/Login.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/auth/Login.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./resources/js/components/auth/Login.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Login.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/auth/Login.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/auth/Login.vue?vue&type=style&index=0&id=4221c3ad&scoped=true&lang=css&":
/*!*********************************************************************************************************!*\
  !*** ./resources/js/components/auth/Login.vue?vue&type=style&index=0&id=4221c3ad&scoped=true&lang=css& ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_style_index_0_id_4221c3ad_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./Login.vue?vue&type=style&index=0&id=4221c3ad&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/auth/Login.vue?vue&type=style&index=0&id=4221c3ad&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_style_index_0_id_4221c3ad_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_style_index_0_id_4221c3ad_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_style_index_0_id_4221c3ad_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_style_index_0_id_4221c3ad_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_style_index_0_id_4221c3ad_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/auth/Login.vue?vue&type=template&id=4221c3ad&scoped=true&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/auth/Login.vue?vue&type=template&id=4221c3ad&scoped=true& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_4221c3ad_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Login.vue?vue&type=template&id=4221c3ad&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/auth/Login.vue?vue&type=template&id=4221c3ad&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_4221c3ad_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_4221c3ad_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);