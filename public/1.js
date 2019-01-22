(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/UpdateAuth.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/UpdateAuth.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VerifyProfile_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VerifyProfile.vue */ "./resources/js/components/VerifyProfile.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  components: {
    VerifyProfile: _VerifyProfile_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      email: '',
      password: '',
      correctOldPassowrd: false,
      newPassowrd: '',
      confirmPassword: '',
      verificationCode: null,
      code: '',
      isForgetPassword: false,
      errors: []
    };
  },
  computed: {
    currentUser: function currentUser() {
      return this.$store.getters.currentUser;
    },
    isLoggedIn: function isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    oldPasswordTrue: function oldPasswordTrue() {
      if (this.correctOldPassowrd || this.verificationCode) {
        return true;
      }

      return false;
    }
  },
  methods: {
    goHome: function goHome() {
      this.$router.push('/');
    },
    updateEmail: function updateEmail() {
      var _this = this;

      var currentUserEmail = this.$store.state.currentUser.email;

      if (this.email != currentUserEmail && this.email.length > 0) {
        axios.post('/api/update-email', {
          email: this.email
        }, {
          headers: {
            Authorization: "Bearer ".concat(localStorage.getItem('access_token'))
          }
        }).then(function (response) {
          console.log(response.data);
          _this.verificationCode = response.data.sent_code;
          _this.errors = null;
        }).catch(function (errors) {
          console.log(errors.response);
          console.log(errors.response.data.errors);
          _this.errors = errors.response.data.errors;
        });
      }
    },
    changeEmail: function changeEmail() {
      var _this2 = this;

      if (this.verificationCode == this.code) {
        axios.post('/api/change-email', {
          sent_code: this.verificationCode,
          code: this.code,
          email: this.email
        }, {
          headers: {
            Authorization: "Bearer ".concat(localStorage.getItem('access_token'))
          }
        }).then(function (response) {
          localStorage.setItem('current_user', JSON.stringify(response.data.updated_user));

          _this2.$store.commit('updateUser');

          swal({
            "title": _this2.$t('done'),
            "text": _this2.$t('emailupdated'),
            "icon": "success"
          });
        }).catch(function (errors) {
          console.log(errors.response);
          console.log(errors.response.data.errors);
          _this2.errors = errors.response.data.errors;
        });
      } else {
        this.errors = {
          code: 'error in inserted code'
        };
      }
    },
    forgetPasswrd: function forgetPasswrd() {
      var _this3 = this;

      var currentUserEmail = this.$store.state.currentUser.email;
      var sendVerificationCode = confirm("".concat(this.$t('sendto'), " ").concat(currentUserEmail, " ?"));

      if (sendVerificationCode) {
        this.isForgetPassword = true;
        axios.post('/api/auth/sendcode', {
          email: currentUserEmail
        }, {
          headers: {
            Authorization: "Bearer ".concat(localStorage.getItem('access_token'))
          }
        }).then(function (response) {
          console.log(response.data);
          _this3.verificationCode = response.data.verification_code;
          _this3.errors = null;
        }).catch(function (errors) {
          _this3.errors = errors.response.data.errors;
          console.log(errors.response.data.errors);
        });
      }
    },
    isCorrectPassword: function isCorrectPassword() {
      var currentUserPassword = this.$store.state.currentUser.original_password;

      if (this.password == currentUserPassword) {
        this.correctOldPassowrd = true;
      } else {
        this.errors = {
          'errorOldPassword': this.$t('currentpasserror')
        };
      }
    },
    changePassword: function changePassword() {
      var _this4 = this;

      var currentUserPassword = this.$store.state.currentUser.original_password;

      if (this.correctOldPassowrd) {
        if (this.newPassowrd.length >= 6 && this.confirmPassword.length >= 6) {
          if (this.newPassowrd == this.confirmPassword) {
            axios.post('/api/auth/reset-password', {
              password: this.newPassowrd,
              password_confirmation: this.confirmPassword,
              user_id: localStorage.getItem('user_id')
            }, {
              headers: {
                Authorization: "Bearer ".concat(localStorage.getItem('access_token'))
              }
            }).then(function (response) {
              console.log(response.data);
              localStorage.setItem('current_user', JSON.stringify(response.data.updated_user));

              _this4.$store.commit('updateUser');

              _this4.errors = null;
              swal({
                "title": _this4.$t('done'),
                "text": _this4.$t('passwordupdated'),
                "icon": "success"
              });
            }).catch(function (errors) {
              console.log(errors);
              console.log(errors.response);
              console.log(errors.response.data.errors);
              _this4.errors = errors.response.data.errors;
            });
          } else {
            this.errors = {
              'passwordmatch': this.$t('passwordmatch')
            };
          }
        } else {
          this.errors = {
            'passwordLength': this.$t('passwordLength')
          };
        }
      } else {
        alert('refresh');
      }
    },
    checkCode: function checkCode() {
      if (this.code == this.verificationCode) {
        this.correctOldPassowrd = true;
        this.verificationCode = null;
      } else {
        swal({
          title: this.$t('error'),
          text: this.$t('codeerror'),
          icon: 'error'
        });
      }
    },
    reset: function reset() {
      this.email = '';
      this.password = '';
      this.correctOldPassowrd = false;
      this.newPassowrd = '';
      this.confirmPassword = '';
      this.verificationCode = null;
      this.code = '';
      this.isForgetPassword = false;
      this.errors = [];
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/VerifyProfile.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/VerifyProfile.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      uploadedImage: null
    };
  },
  methods: {
    uploadId: function uploadId() {
      var _this = this;

      axios.post('/api/auth/verify-profile', {
        uploaded_image: this.uploadedImage,
        user_id: localStorage.getItem('user_id')
      }, {
        headers: {
          Authorization: "Bearer ".concat(localStorage.getItem('access_token'))
        }
      }).then(function (response) {
        swal({
          "title": _this.$t('done'),
          "text": _this.$t('profileverificationreview'),
          "icon": "success"
        });
      }).catch(function (errors) {
        swal({
          "title": _this.$t('oops'),
          "text": _this.$t('uploadingerror'),
          "icon": "error"
        });
        console.log(errors.response);
      });
    },
    handleFile: function handleFile(e) {
      var _this2 = this;

      var fr = new FileReader();
      var img = e.target.files[0];
      var type = img.type;
      var name = img.name;
      fr.readAsDataURL(e.target.files[0]);
      var imgs = ['image/jpeg', 'image/png', 'image/jpg'];

      if (imgs.indexOf(type) != -1) {
        fr.onload = function (e) {
          _this2.uploadedImage = e.target.result;
        };
      } else {
        swal({
          "title": this.$t('error'),
          "text": this.$t('unsupportedtype'),
          "icon": "error"
        });
        this.uploadedImage = null;
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/UpdateAuth.vue?vue&type=style&index=0&id=14de3a3c&scoped=true&lang=css&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/UpdateAuth.vue?vue&type=style&index=0&id=14de3a3c&scoped=true&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/VerifyProfile.vue?vue&type=style&index=0&id=43461ad6&scoped=true&lang=css&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/VerifyProfile.vue?vue&type=style&index=0&id=43461ad6&scoped=true&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/UpdateAuth.vue?vue&type=style&index=0&id=14de3a3c&scoped=true&lang=css&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/UpdateAuth.vue?vue&type=style&index=0&id=14de3a3c&scoped=true&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--6-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--6-2!../../../node_modules/vue-loader/lib??vue-loader-options!./UpdateAuth.vue?vue&type=style&index=0&id=14de3a3c&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/UpdateAuth.vue?vue&type=style&index=0&id=14de3a3c&scoped=true&lang=css&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/VerifyProfile.vue?vue&type=style&index=0&id=43461ad6&scoped=true&lang=css&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/VerifyProfile.vue?vue&type=style&index=0&id=43461ad6&scoped=true&lang=css& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--6-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--6-2!../../../node_modules/vue-loader/lib??vue-loader-options!./VerifyProfile.vue?vue&type=style&index=0&id=43461ad6&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/VerifyProfile.vue?vue&type=style&index=0&id=43461ad6&scoped=true&lang=css&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/UpdateAuth.vue?vue&type=template&id=14de3a3c&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/UpdateAuth.vue?vue&type=template&id=14de3a3c&scoped=true& ***!
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
  return _c("div", { staticClass: "container" }, [
    _vm.isLoggedIn
      ? _c("div", { staticClass: "row" }, [
          _c("h2", { staticClass: "text-center" }, [_vm._v("update data")]),
          _vm._v(" "),
          _c("div", { staticClass: "col-md-4 col-md-push-4" }, [
            _c("p"),
            _vm._v(" "),
            _c("ul", { staticClass: "nav nav-pills nav-justified" }, [
              _c("li", { staticClass: "active", on: { click: _vm.reset } }, [
                _c("a", { attrs: { "data-toggle": "pill", href: "#email" } }, [
                  _vm._v(_vm._s(_vm.$t("email")))
                ])
              ]),
              _vm._v(" "),
              _c("li", { on: { click: _vm.reset } }, [
                _c(
                  "a",
                  { attrs: { "data-toggle": "pill", href: "#password" } },
                  [_vm._v(_vm._s(_vm.$t("password")))]
                )
              ]),
              _vm._v(" "),
              _c("li", { on: { click: _vm.reset } }, [
                _c(
                  "a",
                  { attrs: { "data-toggle": "pill", href: "#verify-profile" } },
                  [_vm._v(_vm._s(_vm.$t("verifyprofile")))]
                )
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "tab-content" }, [
              _c(
                "div",
                {
                  staticClass: "tab-pane fade in active",
                  attrs: { id: "email" }
                },
                [
                  _c("h3"),
                  _vm._v(" "),
                  !_vm.verificationCode
                    ? _c("div", { staticClass: "form-group" }, [
                        _c("label", { attrs: { for: "eamil" } }, [
                          _vm._v(
                            _vm._s(_vm.$t("currentemail")) +
                              " : " +
                              _vm._s(_vm.currentUser.email) +
                              " "
                          )
                        ]),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.email,
                              expression: "email"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: {
                            type: "email",
                            autocomplete: "off",
                            id: "Email",
                            placeholder: _vm.$t("newemail")
                          },
                          domProps: { value: _vm.email },
                          on: {
                            keyup: function($event) {
                              if (
                                !("button" in $event) &&
                                _vm._k(
                                  $event.keyCode,
                                  "enter",
                                  13,
                                  $event.key,
                                  "Enter"
                                )
                              ) {
                                return null
                              }
                              return _vm.updateEmail($event)
                            },
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.email = $event.target.value
                            }
                          }
                        }),
                        _vm._v(" "),
                        _c("br"),
                        _vm._v(" "),
                        _vm.errors
                          ? _c("div", [
                              _vm.errors.email
                                ? _c("p", { staticClass: "text-danger" }, [
                                    _c("b", [_vm._v(_vm._s(_vm.errors.email))])
                                  ])
                                : _vm._e(),
                              _vm._v(" "),
                              _vm.errors.send_code
                                ? _c("p", { staticClass: "text-danger" }, [
                                    _c("b", [
                                      _vm._v(_vm._s(_vm.errors.send_code))
                                    ])
                                  ])
                                : _vm._e()
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-success",
                            attrs: { type: "button" },
                            on: { click: _vm.updateEmail }
                          },
                          [
                            _vm._v(
                              "\n                    " +
                                _vm._s(_vm.$t("save")) +
                                "\n                "
                            )
                          ]
                        )
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.verificationCode
                    ? _c("div", { staticClass: "form-group" }, [
                        _c("p", { staticClass: "text-success" }, [
                          _vm._v(_vm._s(_vm.$t("codesent")) + " : "),
                          _c("b", [_vm._v(_vm._s(_vm.email))])
                        ]),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.code,
                              expression: "code"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: { type: "text", placeholder: _vm.$t("code") },
                          domProps: { value: _vm.code },
                          on: {
                            keyup: function($event) {
                              if (
                                !("button" in $event) &&
                                _vm._k(
                                  $event.keyCode,
                                  "enter",
                                  13,
                                  $event.key,
                                  "Enter"
                                )
                              ) {
                                return null
                              }
                              return _vm.changeEmail($event)
                            },
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.code = $event.target.value
                            }
                          }
                        }),
                        _vm._v(" "),
                        _c("br"),
                        _vm._v(" "),
                        _vm.errors
                          ? _c("div", [
                              _vm.errors.code
                                ? _c("p", { staticClass: "text-danger" }, [
                                    _c("b", [_vm._v(_vm._s(_vm.errors.code))])
                                  ])
                                : _vm._e()
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-success",
                            attrs: { type: "button" },
                            on: { click: _vm.changeEmail }
                          },
                          [
                            _vm._v(
                              "\n                    " +
                                _vm._s(_vm.$t("donebtn")) +
                                "\n                "
                            )
                          ]
                        )
                      ])
                    : _vm._e()
                ]
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "tab-pane fade", attrs: { id: "password" } },
                [
                  _c("h3"),
                  _vm._v(" "),
                  !_vm.oldPasswordTrue
                    ? _c("div", { staticClass: "form-group" }, [
                        _c("label", [_vm._v(_vm._s(_vm.$t("currentpass")))]),
                        _vm._v(" "),
                        _c("input", {
                          staticClass: "hide",
                          attrs: { type: "text" }
                        }),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.password,
                              expression: "password"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: {
                            type: "password",
                            placeholder: "enter " + _vm.$t("currentpass"),
                            autocomplete: "new-password"
                          },
                          domProps: { value: _vm.password },
                          on: {
                            keyup: function($event) {
                              if (
                                !("button" in $event) &&
                                _vm._k(
                                  $event.keyCode,
                                  "enter",
                                  13,
                                  $event.key,
                                  "Enter"
                                )
                              ) {
                                return null
                              }
                              return _vm.isCorrectPassword($event)
                            },
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.password = $event.target.value
                            }
                          }
                        }),
                        _vm._v(" "),
                        _vm.errors
                          ? _c("div", [
                              _vm.errors.errorOldPassword
                                ? _c("p", { staticClass: "text-danger" }, [
                                    _c("b", [
                                      _vm._v(
                                        _vm._s(_vm.errors.errorOldPassword)
                                      )
                                    ])
                                  ])
                                : _vm._e()
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _c(
                          "p",
                          {
                            staticClass: "help-block",
                            staticStyle: { cursor: "pointer" },
                            on: { click: _vm.forgetPasswrd }
                          },
                          [
                            _vm._v(
                              "\n                    " +
                                _vm._s(_vm.$t("forgetpassword")) +
                                "\n                    "
                            )
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-success",
                            attrs: { type: "button" },
                            on: { click: _vm.isCorrectPassword }
                          },
                          [
                            _vm._v(
                              "\n                      " +
                                _vm._s(_vm.$t("donebtn")) +
                                "\n                  "
                            )
                          ]
                        )
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.correctOldPassowrd
                    ? _c("div", { staticClass: "form-group" }, [
                        _c("input", {
                          staticClass: "hide",
                          attrs: { type: "text" }
                        }),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.newPassowrd,
                              expression: "newPassowrd"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: {
                            type: "password",
                            placeholder: _vm.$t("newpassword")
                          },
                          domProps: { value: _vm.newPassowrd },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.newPassowrd = $event.target.value
                            }
                          }
                        }),
                        _vm._v(" "),
                        _c("br"),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.confirmPassword,
                              expression: "confirmPassword"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: {
                            type: "password",
                            placeholder: _vm.$t("repeatpass")
                          },
                          domProps: { value: _vm.confirmPassword },
                          on: {
                            keyup: function($event) {
                              if (
                                !("button" in $event) &&
                                _vm._k(
                                  $event.keyCode,
                                  "enter",
                                  13,
                                  $event.key,
                                  "Enter"
                                )
                              ) {
                                return null
                              }
                              return _vm.changePassword($event)
                            },
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.confirmPassword = $event.target.value
                            }
                          }
                        }),
                        _vm._v(" "),
                        _vm.errors
                          ? _c("div", [
                              _vm.errors.passwordLength
                                ? _c("p", { staticClass: "text-danger" }, [
                                    _c("b", [
                                      _vm._v(_vm._s(_vm.errors.passwordLength))
                                    ])
                                  ])
                                : _vm._e(),
                              _vm._v(" "),
                              _vm.errors.passwordmatch
                                ? _c("p", { staticClass: "text-danger" }, [
                                    _c("b", [
                                      _vm._v(_vm._s(_vm.errors.passwordmatch))
                                    ])
                                  ])
                                : _vm._e()
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-success",
                            attrs: { type: "button" },
                            on: { click: _vm.changePassword }
                          },
                          [
                            _vm._v(
                              "\n                      save\n                  "
                            )
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-warning",
                            attrs: { type: "button" },
                            on: { click: _vm.reset }
                          },
                          [
                            _vm._v(
                              "\n                    Cancel\n                  "
                            )
                          ]
                        )
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.verificationCode
                    ? _c("div", [
                        _c("div", { staticClass: "form-group" }, [
                          _c("p", { staticClass: "text-success" }, [
                            _vm._v(_vm._s(_vm.$t("codesent")) + " : "),
                            _c("b", [_vm._v(_vm._s(_vm.currentUser.email))]),
                            _vm._v(
                              "\n                      " +
                                _vm._s(_vm.$t("entersentcode"))
                            )
                          ]),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.code,
                                expression: "code"
                              }
                            ],
                            staticClass: "form-control",
                            attrs: {
                              type: "text",
                              placeholder: _vm.$t("codesent")
                            },
                            domProps: { value: _vm.code },
                            on: {
                              keyup: function($event) {
                                if (
                                  !("button" in $event) &&
                                  _vm._k(
                                    $event.keyCode,
                                    "enter",
                                    13,
                                    $event.key,
                                    "Enter"
                                  )
                                ) {
                                  return null
                                }
                                return _vm.checkCode($event)
                              },
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.code = $event.target.value
                              }
                            }
                          })
                        ]),
                        _vm._v(" "),
                        _vm.errors
                          ? _c("div", [
                              _vm.errors.code
                                ? _c("p", { staticClass: "text-danger" }, [
                                    _c("b", [_vm._v(_vm._s(_vm.errors.code))])
                                  ])
                                : _vm._e()
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _c("div", { staticClass: "form-group" }, [
                          _c(
                            "button",
                            {
                              staticClass: "btn btn-success",
                              attrs: { type: "button" },
                              on: { click: _vm.checkCode }
                            },
                            [
                              _vm._v(
                                "\n                        " +
                                  _vm._s(_vm.$t("donebtn")) +
                                  "\n                    "
                              )
                            ]
                          )
                        ])
                      ])
                    : _vm._e()
                ]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass: "tab-pane fade",
                  attrs: { id: "verify-profile" }
                },
                [_c("verify-profile")],
                1
              ),
              _vm._v(" "),
              _c("br"),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "btn btn-danger",
                  attrs: { type: "button" },
                  on: { click: _vm.goHome }
                },
                [
                  _vm._v(
                    "\n              " +
                      _vm._s(_vm.$t("cancel")) +
                      "\n          "
                  )
                ]
              )
            ])
          ])
        ])
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/VerifyProfile.vue?vue&type=template&id=43461ad6&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/VerifyProfile.vue?vue&type=template&id=43461ad6&scoped=true& ***!
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
  return _c("div", [
    _c(
      "form",
      {
        on: {
          submit: function($event) {
            $event.preventDefault()
            return _vm.uploadId($event)
          }
        }
      },
      [
        _c("div", { staticClass: "form-group" }, [
          _c("label", [_vm._v(_vm._s(_vm.$t("verifyprofilereq")))]),
          _vm._v(" "),
          _c("input", {
            staticClass: "form-control",
            staticStyle: { padding: "0" },
            attrs: { type: "file" },
            on: { change: _vm.handleFile }
          }),
          _vm._v(" "),
          _c("p", { staticClass: "help-block" }, [
            _vm._v(_vm._s(_vm.$t("supportedtypes")))
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "form-group" }, [
          _c(
            "button",
            { staticClass: "btn btn-success", attrs: { type: "submit" } },
            [_vm._v("\n          " + _vm._s(_vm.$t("upload")) + "\n      ")]
          )
        ])
      ]
    ),
    _vm._v(" "),
    _vm.uploadedImage
      ? _c(
          "div",
          { staticClass: "uploaded-img", staticStyle: { width: "100%" } },
          [
            _c("img", {
              staticClass: "img-rounded",
              staticStyle: { margin: "0 auto" },
              attrs: {
                src: _vm.uploadedImage,
                alt: "Oops try again",
                width: "250"
              }
            })
          ]
        )
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/UpdateAuth.vue":
/*!************************************************!*\
  !*** ./resources/js/components/UpdateAuth.vue ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UpdateAuth_vue_vue_type_template_id_14de3a3c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UpdateAuth.vue?vue&type=template&id=14de3a3c&scoped=true& */ "./resources/js/components/UpdateAuth.vue?vue&type=template&id=14de3a3c&scoped=true&");
/* harmony import */ var _UpdateAuth_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UpdateAuth.vue?vue&type=script&lang=js& */ "./resources/js/components/UpdateAuth.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _UpdateAuth_vue_vue_type_style_index_0_id_14de3a3c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UpdateAuth.vue?vue&type=style&index=0&id=14de3a3c&scoped=true&lang=css& */ "./resources/js/components/UpdateAuth.vue?vue&type=style&index=0&id=14de3a3c&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _UpdateAuth_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UpdateAuth_vue_vue_type_template_id_14de3a3c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UpdateAuth_vue_vue_type_template_id_14de3a3c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "14de3a3c",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/UpdateAuth.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/UpdateAuth.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./resources/js/components/UpdateAuth.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UpdateAuth_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./UpdateAuth.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/UpdateAuth.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UpdateAuth_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/UpdateAuth.vue?vue&type=style&index=0&id=14de3a3c&scoped=true&lang=css&":
/*!*********************************************************************************************************!*\
  !*** ./resources/js/components/UpdateAuth.vue?vue&type=style&index=0&id=14de3a3c&scoped=true&lang=css& ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UpdateAuth_vue_vue_type_style_index_0_id_14de3a3c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader!../../../node_modules/css-loader??ref--6-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--6-2!../../../node_modules/vue-loader/lib??vue-loader-options!./UpdateAuth.vue?vue&type=style&index=0&id=14de3a3c&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/UpdateAuth.vue?vue&type=style&index=0&id=14de3a3c&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UpdateAuth_vue_vue_type_style_index_0_id_14de3a3c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UpdateAuth_vue_vue_type_style_index_0_id_14de3a3c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UpdateAuth_vue_vue_type_style_index_0_id_14de3a3c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UpdateAuth_vue_vue_type_style_index_0_id_14de3a3c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UpdateAuth_vue_vue_type_style_index_0_id_14de3a3c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/UpdateAuth.vue?vue&type=template&id=14de3a3c&scoped=true&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/UpdateAuth.vue?vue&type=template&id=14de3a3c&scoped=true& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UpdateAuth_vue_vue_type_template_id_14de3a3c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./UpdateAuth.vue?vue&type=template&id=14de3a3c&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/UpdateAuth.vue?vue&type=template&id=14de3a3c&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UpdateAuth_vue_vue_type_template_id_14de3a3c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UpdateAuth_vue_vue_type_template_id_14de3a3c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/VerifyProfile.vue":
/*!***************************************************!*\
  !*** ./resources/js/components/VerifyProfile.vue ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VerifyProfile_vue_vue_type_template_id_43461ad6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VerifyProfile.vue?vue&type=template&id=43461ad6&scoped=true& */ "./resources/js/components/VerifyProfile.vue?vue&type=template&id=43461ad6&scoped=true&");
/* harmony import */ var _VerifyProfile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VerifyProfile.vue?vue&type=script&lang=js& */ "./resources/js/components/VerifyProfile.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _VerifyProfile_vue_vue_type_style_index_0_id_43461ad6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VerifyProfile.vue?vue&type=style&index=0&id=43461ad6&scoped=true&lang=css& */ "./resources/js/components/VerifyProfile.vue?vue&type=style&index=0&id=43461ad6&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _VerifyProfile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _VerifyProfile_vue_vue_type_template_id_43461ad6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _VerifyProfile_vue_vue_type_template_id_43461ad6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "43461ad6",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/VerifyProfile.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/VerifyProfile.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/components/VerifyProfile.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VerifyProfile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./VerifyProfile.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/VerifyProfile.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VerifyProfile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/VerifyProfile.vue?vue&type=style&index=0&id=43461ad6&scoped=true&lang=css&":
/*!************************************************************************************************************!*\
  !*** ./resources/js/components/VerifyProfile.vue?vue&type=style&index=0&id=43461ad6&scoped=true&lang=css& ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_VerifyProfile_vue_vue_type_style_index_0_id_43461ad6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader!../../../node_modules/css-loader??ref--6-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--6-2!../../../node_modules/vue-loader/lib??vue-loader-options!./VerifyProfile.vue?vue&type=style&index=0&id=43461ad6&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/VerifyProfile.vue?vue&type=style&index=0&id=43461ad6&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_VerifyProfile_vue_vue_type_style_index_0_id_43461ad6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_VerifyProfile_vue_vue_type_style_index_0_id_43461ad6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_VerifyProfile_vue_vue_type_style_index_0_id_43461ad6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_VerifyProfile_vue_vue_type_style_index_0_id_43461ad6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_VerifyProfile_vue_vue_type_style_index_0_id_43461ad6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/VerifyProfile.vue?vue&type=template&id=43461ad6&scoped=true&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/VerifyProfile.vue?vue&type=template&id=43461ad6&scoped=true& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VerifyProfile_vue_vue_type_template_id_43461ad6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./VerifyProfile.vue?vue&type=template&id=43461ad6&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/VerifyProfile.vue?vue&type=template&id=43461ad6&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VerifyProfile_vue_vue_type_template_id_43461ad6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VerifyProfile_vue_vue_type_template_id_43461ad6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);