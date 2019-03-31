(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/auth/UpdateAuth.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/auth/UpdateAuth.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _profile_VerifyProfile_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../profile/VerifyProfile.vue */ "./resources/js/components/profile/VerifyProfile.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    VerifyProfile: _profile_VerifyProfile_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      currentTab: 'email',
      loading: false,
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

      var currentUserEmail = this.currentUser.email;

      if (this.email != currentUserEmail && this.email.length > 0 && this.currentTab == 'email') {
        this.loading = true;
        axios.post('/api/update-email', {
          email: this.email
        }, {
          headers: {
            Authorization: "Bearer ".concat(this.$store.state.authentication.userToken)
          }
        }).then(function (response) {
          _this.loading = false;
          console.log(response.data);
          _this.verificationCode = response.data.sent_code;
          _this.errors = null;
        }).catch(function (errors) {
          console.log(errors.response);
          console.log(errors.response.data.errors);
          _this.loading = false;
          _this.errors = errors.response.data.errors;
        });
      } else {
        alert('انه بريدكم الحالي');
      }
    },
    changeEmail: function changeEmail() {
      var _this2 = this;

      if (this.verificationCode == this.code && this.currentTab == 'email') {
        this.loading = true;
        axios.post('/api/change-email', {
          sent_code: this.verificationCode,
          code: this.code,
          email: this.email
        }, {
          headers: {
            Authorization: "Bearer ".concat(this.$store.state.authentication.userToken)
          }
        }).then(function (response) {
          _this2.reset();

          _this2.loading = false;

          _this2.$store.commit('updateUser', {
            currentUser: response.data.updated_user
          });

          swal({
            "title": _this2.$t('done'),
            "text": _this2.$t('emailupdated'),
            "icon": "success"
          });
        }).catch(function (errors) {
          console.log(errors.response);
          console.log(errors.response.data.errors);
          _this2.loading = false;
          _this2.errors = errors.response.data.errors;
        });
      } else {
        this.loading = false;
        this.errors = {
          code: 'error in inserted code'
        };
      }
    },
    forgetPasswrd: function forgetPasswrd() {
      var _this3 = this;

      var currentUserEmail = this.$store.state.authentication.currentUser.email;
      var sendVerificationCode = confirm("".concat(this.$t('sendto'), " ").concat(currentUserEmail, " ?"));

      if (sendVerificationCode && this.currentTab == 'password') {
        this.loading = true;
        this.isForgetPassword = true;
        axios.post('/api/auth/sendcode', {
          email: currentUserEmail
        }, {
          headers: {
            Authorization: "Bearer ".concat(this.$store.state.authentication.userToken)
          }
        }).then(function (response) {
          _this3.loading = false;
          console.log(response.data);
          _this3.verificationCode = response.data.verification_code;
          _this3.errors = null;
        }).catch(function (errors) {
          _this3.loading = false;
          _this3.errors = errors.response.data.errors;
          console.log(errors.response.data.errors);
        });
      }
    },
    isCorrectPassword: function isCorrectPassword() {
      var currentUserPassword = this.$store.state.authentication.currentUser.original_password;

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

      var currentUserPassword = this.$store.state.authentication.currentUser.original_password;

      if (this.correctOldPassowrd && this.currentTab == 'email') {
        if (this.newPassowrd.length >= 6 && this.confirmPassword.length >= 6) {
          if (this.newPassowrd == this.confirmPassword) {
            this.loading = true;
            axios.post('/api/auth/reset-password', {
              password: this.newPassowrd,
              password_confirmation: this.confirmPassword,
              user_id: this.currentUser.id
            }, {
              headers: {
                Authorization: "Bearer ".concat(this.$store.state.authentication.userToken)
              }
            }).then(function (response) {
              _this4.reset();

              _this4.loading = false;
              console.log(response.data);

              _this4.$store.commit('updateUser', {
                currentUser: response.data.updated_user
              });

              _this4.errors = null;
              swal({
                "title": _this4.$t('done'),
                "text": _this4.$t('passwordupdated'),
                "icon": "success"
              });
            }).catch(function (errors) {
              _this4.loading = false;
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

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/profile/VerifyProfile.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/profile/VerifyProfile.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************/
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
          Authorization: "Bearer ".concat(this.$store.state.authentication.userToken)
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/auth/UpdateAuth.vue?vue&type=template&id=26023d7d&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/auth/UpdateAuth.vue?vue&type=template&id=26023d7d&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "container" },
    [
      _vm.isLoggedIn
        ? _c(
            "v-container",
            { attrs: { "grid-list-md": "" } },
            [
              _c(
                "v-layout",
                { attrs: { row: "", wrap: "" } },
                [
                  _c(
                    "v-flex",
                    { attrs: { xs12: "", md4: "", "offset-md4": "" } },
                    [
                      _c(
                        "v-tabs",
                        {
                          attrs: { dark: "", "slider-color": "green" },
                          model: {
                            value: _vm.currentTab,
                            callback: function($$v) {
                              _vm.currentTab = $$v
                            },
                            expression: "currentTab"
                          }
                        },
                        [
                          _c("v-tab", { attrs: { href: "#email" } }, [
                            _vm._v(
                              "\n        " +
                                _vm._s(_vm.$t("editemail")) +
                                "\n      "
                            )
                          ]),
                          _vm._v(" "),
                          _c("v-tab", { attrs: { href: "#password" } }, [
                            _vm._v(
                              "\n        " +
                                _vm._s(_vm.$t("editpassword")) +
                                "\n      "
                            )
                          ])
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-tabs-items",
                        {
                          model: {
                            value: _vm.currentTab,
                            callback: function($$v) {
                              _vm.currentTab = $$v
                            },
                            expression: "currentTab"
                          }
                        },
                        [
                          _c(
                            "v-tab-item",
                            { attrs: { value: "email" } },
                            [
                              !_vm.verificationCode
                                ? [
                                    _c("v-text-field", {
                                      attrs: {
                                        type: "email",
                                        autocomplete: "off",
                                        placeholder: _vm.$t("newemail"),
                                        solo: "",
                                        hint:
                                          _vm.$t("currentemail") +
                                          " : " +
                                          _vm.currentUser.email
                                      },
                                      on: {
                                        keyup: function($event) {
                                          if (
                                            !$event.type.indexOf("key") &&
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
                                        }
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
                                    _vm.errors
                                      ? [
                                          _vm.errors.email
                                            ? _c(
                                                "p",
                                                { staticClass: "error--text" },
                                                [
                                                  _c("b", [
                                                    _vm._v(
                                                      _vm._s(_vm.errors.email)
                                                    )
                                                  ])
                                                ]
                                              )
                                            : _vm._e(),
                                          _vm._v(" "),
                                          _vm.errors.send_code
                                            ? _c(
                                                "p",
                                                { staticClass: "error--text" },
                                                [
                                                  _c("b", [
                                                    _vm._v(
                                                      _vm._s(
                                                        _vm.errors.send_code
                                                      )
                                                    )
                                                  ])
                                                ]
                                              )
                                            : _vm._e()
                                        ]
                                      : _vm._e(),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      { staticClass: "text-xs-center" },
                                      [
                                        _c(
                                          "v-btn",
                                          {
                                            staticClass: "white--text success",
                                            attrs: {
                                              round: "",
                                              loading: _vm.loading,
                                              round: ""
                                            },
                                            on: { click: _vm.updateEmail }
                                          },
                                          [
                                            _vm._v(
                                              "\n                " +
                                                _vm._s(_vm.$t("save")) +
                                                "\n            "
                                            )
                                          ]
                                        )
                                      ],
                                      1
                                    )
                                  ]
                                : _vm._e(),
                              _vm._v(" "),
                              _vm.verificationCode
                                ? [
                                    _c("p", { staticClass: "green--text" }, [
                                      _vm._v(
                                        _vm._s(_vm.$t("codesent")) + " : "
                                      ),
                                      _c("b", [_vm._v(_vm._s(_vm.email))])
                                    ]),
                                    _vm._v(" "),
                                    _c("v-text-field", {
                                      attrs: {
                                        solo: "",
                                        hint: _vm.$t("code"),
                                        placeholder: _vm.$t("code")
                                      },
                                      on: {
                                        keyup: function($event) {
                                          if (
                                            !$event.type.indexOf("key") &&
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
                                        }
                                      },
                                      model: {
                                        value: _vm.code,
                                        callback: function($$v) {
                                          _vm.code = $$v
                                        },
                                        expression: "code"
                                      }
                                    }),
                                    _vm._v(" "),
                                    _vm.errors
                                      ? [
                                          _vm.errors.code
                                            ? _c(
                                                "p",
                                                { staticClass: "error--text" },
                                                [
                                                  _c("b", [
                                                    _vm._v(
                                                      _vm._s(_vm.errors.code)
                                                    )
                                                  ])
                                                ]
                                              )
                                            : _vm._e()
                                        ]
                                      : _vm._e(),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      { staticClass: "text-xs-center" },
                                      [
                                        _c(
                                          "v-btn",
                                          {
                                            staticClass: "success white--text",
                                            attrs: {
                                              round: "",
                                              loading: _vm.loading
                                            },
                                            on: { click: _vm.changeEmail }
                                          },
                                          [
                                            _vm._v(
                                              "\n          " +
                                                _vm._s(_vm.$t("donebtn")) +
                                                "\n      "
                                            )
                                          ]
                                        )
                                      ],
                                      1
                                    )
                                  ]
                                : _vm._e()
                            ],
                            2
                          ),
                          _vm._v(" "),
                          _c(
                            "v-tab-item",
                            { attrs: { value: "password" } },
                            [
                              !_vm.oldPasswordTrue
                                ? [
                                    _c("v-text-field", {
                                      attrs: {
                                        solo: "",
                                        type: "password",
                                        placeholder:
                                          "enter " + _vm.$t("currentpass"),
                                        label: _vm.$t("currentpass")
                                      },
                                      on: {
                                        keyup: function($event) {
                                          if (
                                            !$event.type.indexOf("key") &&
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
                                        }
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
                                    _vm.errors
                                      ? [
                                          _vm.errors.errorOldPassword
                                            ? _c(
                                                "p",
                                                { staticClass: "error--text" },
                                                [
                                                  _c("b", [
                                                    _vm._v(
                                                      _vm._s(
                                                        _vm.errors
                                                          .errorOldPassword
                                                      )
                                                    )
                                                  ])
                                                ]
                                              )
                                            : _vm._e()
                                        ]
                                      : _vm._e(),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      { staticClass: "text-xs-center" },
                                      [
                                        _c(
                                          "v-btn",
                                          {
                                            staticClass: "white indigo--text",
                                            staticStyle: { cursor: "pointer" },
                                            attrs: {
                                              loading: _vm.loading,
                                              round: ""
                                            },
                                            on: { click: _vm.forgetPasswrd }
                                          },
                                          [
                                            _vm._v(
                                              "\n              " +
                                                _vm._s(
                                                  _vm.$t("forgetpassword")
                                                ) +
                                                "\n            "
                                            )
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "v-btn",
                                          {
                                            staticClass: "success white--text",
                                            attrs: {
                                              loading: _vm.loading,
                                              round: ""
                                            },
                                            on: { click: _vm.isCorrectPassword }
                                          },
                                          [
                                            _vm._v(
                                              "\n                " +
                                                _vm._s(_vm.$t("donebtn")) +
                                                "\n            "
                                            )
                                          ]
                                        )
                                      ],
                                      1
                                    )
                                  ]
                                : _vm._e(),
                              _vm._v(" "),
                              _vm.correctOldPassowrd
                                ? [
                                    _c("input", {
                                      staticClass: "hide",
                                      attrs: { type: "text" }
                                    }),
                                    _vm._v(" "),
                                    _c("v-text-field", {
                                      attrs: {
                                        solo: "",
                                        type: "password",
                                        placeholder: _vm.$t("newpassword")
                                      },
                                      model: {
                                        value: _vm.newPassowrd,
                                        callback: function($$v) {
                                          _vm.newPassowrd = $$v
                                        },
                                        expression: "newPassowrd"
                                      }
                                    }),
                                    _vm._v(" "),
                                    _c("br"),
                                    _vm._v(" "),
                                    _c("v-text-field", {
                                      attrs: {
                                        solo: "",
                                        type: "password",
                                        placeholder: _vm.$t("repeatpass")
                                      },
                                      on: {
                                        keyup: function($event) {
                                          if (
                                            !$event.type.indexOf("key") &&
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
                                        }
                                      },
                                      model: {
                                        value: _vm.confirmPassword,
                                        callback: function($$v) {
                                          _vm.confirmPassword = $$v
                                        },
                                        expression: "confirmPassword"
                                      }
                                    }),
                                    _vm._v(" "),
                                    _vm.errors
                                      ? [
                                          _vm.errors.passwordLength
                                            ? _c(
                                                "p",
                                                { staticClass: "error--text" },
                                                [
                                                  _c("b", [
                                                    _vm._v(
                                                      _vm._s(
                                                        _vm.errors
                                                          .passwordLength
                                                      )
                                                    )
                                                  ])
                                                ]
                                              )
                                            : _vm._e(),
                                          _vm._v(" "),
                                          _vm.errors.passwordmatch
                                            ? _c(
                                                "p",
                                                { staticClass: "error--text" },
                                                [
                                                  _c("b", [
                                                    _vm._v(
                                                      _vm._s(
                                                        _vm.errors.passwordmatch
                                                      )
                                                    )
                                                  ])
                                                ]
                                              )
                                            : _vm._e()
                                        ]
                                      : _vm._e(),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      { staticClass: "text-xs-center" },
                                      [
                                        _c(
                                          "v-btn",
                                          {
                                            staticClass: "success white--text",
                                            attrs: {
                                              loading: _vm.loading,
                                              round: ""
                                            },
                                            on: { click: _vm.changePassword }
                                          },
                                          [
                                            _vm._v(
                                              "\n                      " +
                                                _vm._s(_vm.$t("save")) +
                                                "\n\n                    "
                                            )
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "v-btn",
                                          {
                                            staticClass: "warning black--text",
                                            attrs: {
                                              loading: _vm.loading,
                                              round: ""
                                            },
                                            on: { click: _vm.reset }
                                          },
                                          [
                                            _vm._v(
                                              "\n                      " +
                                                _vm._s(_vm.$t("cancel")) +
                                                "\n                    "
                                            )
                                          ]
                                        )
                                      ],
                                      1
                                    )
                                  ]
                                : _vm._e(),
                              _vm._v(" "),
                              _vm.verificationCode
                                ? [
                                    _c(
                                      "p",
                                      {
                                        staticClass:
                                          "white--text text-xs-center"
                                      },
                                      [
                                        _c("bdi", [
                                          _vm._v(
                                            "\n\n                      " +
                                              _vm._s(_vm.$t("codesent")) +
                                              "  "
                                          ),
                                          _c("b", [
                                            _vm._v(
                                              _vm._s(_vm.currentUser.email)
                                            )
                                          ]),
                                          _vm._v(
                                            "\n                      " +
                                              _vm._s(_vm.$t("entersentcode")) +
                                              "\n                    "
                                          )
                                        ])
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c("v-text-field", {
                                      attrs: {
                                        solo: "",
                                        placeholder: _vm.$t("code")
                                      },
                                      on: {
                                        keyup: function($event) {
                                          if (
                                            !$event.type.indexOf("key") &&
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
                                        }
                                      },
                                      model: {
                                        value: _vm.code,
                                        callback: function($$v) {
                                          _vm.code = $$v
                                        },
                                        expression: "code"
                                      }
                                    }),
                                    _vm._v(" "),
                                    _vm.errors
                                      ? [
                                          _vm.errors.code
                                            ? _c(
                                                "p",
                                                { staticClass: "error--text" },
                                                [
                                                  _c("b", [
                                                    _vm._v(
                                                      _vm._s(_vm.errors.code)
                                                    )
                                                  ])
                                                ]
                                              )
                                            : _vm._e()
                                        ]
                                      : _vm._e(),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      { staticClass: "text-xs-center" },
                                      [
                                        _c(
                                          "v-btn",
                                          {
                                            staticClass: "success white--text",
                                            attrs: {
                                              loading: _vm.loading,
                                              round: "",
                                              round: ""
                                            },
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
                                      ],
                                      1
                                    )
                                  ]
                                : _vm._e()
                            ],
                            2
                          ),
                          _vm._v(" "),
                          _c("v-tab-item")
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
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/profile/VerifyProfile.vue?vue&type=template&id=24666aa2&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/profile/VerifyProfile.vue?vue&type=template&id=24666aa2&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************/
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

/***/ "./resources/js/components/auth/UpdateAuth.vue":
/*!*****************************************************!*\
  !*** ./resources/js/components/auth/UpdateAuth.vue ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UpdateAuth_vue_vue_type_template_id_26023d7d_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UpdateAuth.vue?vue&type=template&id=26023d7d&scoped=true& */ "./resources/js/components/auth/UpdateAuth.vue?vue&type=template&id=26023d7d&scoped=true&");
/* harmony import */ var _UpdateAuth_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UpdateAuth.vue?vue&type=script&lang=js& */ "./resources/js/components/auth/UpdateAuth.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _UpdateAuth_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UpdateAuth_vue_vue_type_template_id_26023d7d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UpdateAuth_vue_vue_type_template_id_26023d7d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "26023d7d",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/auth/UpdateAuth.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/auth/UpdateAuth.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./resources/js/components/auth/UpdateAuth.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UpdateAuth_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./UpdateAuth.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/auth/UpdateAuth.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UpdateAuth_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/auth/UpdateAuth.vue?vue&type=template&id=26023d7d&scoped=true&":
/*!************************************************************************************************!*\
  !*** ./resources/js/components/auth/UpdateAuth.vue?vue&type=template&id=26023d7d&scoped=true& ***!
  \************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UpdateAuth_vue_vue_type_template_id_26023d7d_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./UpdateAuth.vue?vue&type=template&id=26023d7d&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/auth/UpdateAuth.vue?vue&type=template&id=26023d7d&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UpdateAuth_vue_vue_type_template_id_26023d7d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UpdateAuth_vue_vue_type_template_id_26023d7d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/profile/VerifyProfile.vue":
/*!***********************************************************!*\
  !*** ./resources/js/components/profile/VerifyProfile.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VerifyProfile_vue_vue_type_template_id_24666aa2_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VerifyProfile.vue?vue&type=template&id=24666aa2&scoped=true& */ "./resources/js/components/profile/VerifyProfile.vue?vue&type=template&id=24666aa2&scoped=true&");
/* harmony import */ var _VerifyProfile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VerifyProfile.vue?vue&type=script&lang=js& */ "./resources/js/components/profile/VerifyProfile.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _VerifyProfile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _VerifyProfile_vue_vue_type_template_id_24666aa2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _VerifyProfile_vue_vue_type_template_id_24666aa2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "24666aa2",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/profile/VerifyProfile.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/profile/VerifyProfile.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/components/profile/VerifyProfile.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VerifyProfile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./VerifyProfile.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/profile/VerifyProfile.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VerifyProfile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/profile/VerifyProfile.vue?vue&type=template&id=24666aa2&scoped=true&":
/*!******************************************************************************************************!*\
  !*** ./resources/js/components/profile/VerifyProfile.vue?vue&type=template&id=24666aa2&scoped=true& ***!
  \******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VerifyProfile_vue_vue_type_template_id_24666aa2_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./VerifyProfile.vue?vue&type=template&id=24666aa2&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/profile/VerifyProfile.vue?vue&type=template&id=24666aa2&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VerifyProfile_vue_vue_type_template_id_24666aa2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VerifyProfile_vue_vue_type_template_id_24666aa2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);