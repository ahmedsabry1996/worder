(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/profile/UpdateProfile.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/profile/UpdateProfile.vue?vue&type=script&lang=js& ***!
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  mounted: function mounted() {
    this.fillUserData();
  },
  data: function data() {
    return {
      modal: false,
      name: '',
      displayName: '',
      avatar: "storage/avatars/".concat(this.$store.state.authentication.currentUserProfile.avatar),
      avatarState: 'same',
      gender: [this.$t('male'), this.$t('female')],
      topics: this.$t('topics'),
      countries: this.$store.state.countries,
      selectedGender: null,
      selectedCountry: null,
      selectedTopics: [],
      bdate: null,
      description: '',
      writtenDescription: '',
      errors: null
    };
  },
  computed: {
    username: function username() {
      return this.$store.getters.currentUser.name;
    },
    isLoggedIn: function isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    currentUser: function currentUser() {
      return this.$store.getters.currentUser;
    },
    currentUserProfile: function currentUserProfile() {
      return this.$store.getters.currentUserProfile;
    },
    currentUserTopics: function currentUserTopics() {
      return this.$store.getters.currentUserTopics.map(function (val) {
        return val.pivot.topic_id;
      });
    },
    checkDescription: function checkDescription() {
      if (this.description != null) {
        this.writtenDescription = this.description.split(' ').length;

        if (this.description.split(' ').length > 25) {
          return false;
        }

        if (this.description.length === 0) {
          this.writtenDescription = 0;
          return true;
        } else {
          return true;
        }
      }
    },
    userCountry: function userCountry() {
      if (this.$store.getters.countries.indexOf(this.selectedCountry) != -1) {
        return this.$store.getters.countries.indexOf(this.selectedCountry) + 1;
      }
    }
  },
  methods: {
    removeSelectedAvatar: function removeSelectedAvatar() {
      this.avatar = null;
      this.avatarState = null;
    },
    cancel: function cancel() {
      this.$router.push('/');
    },
    fillUserData: function fillUserData() {
      var topics = this.$store.state.authentication.currentUserTopics;
      var topics_id = topics.map(function (val) {
        return val.pivot.topic_id;
      });
      var currentUser = this.$store.state.authentication.currentUser;
      var currentUserProfile = this.$store.state.authentication.currentUserProfile;
      this.selectedTopics = topics_id;
      this.selectedGender = currentUserProfile.gender_id;
      this.selectedCountry = this.countries[currentUserProfile.country_id - 1];
      this.description = currentUserProfile.description;
      this.name = currentUser.name;
      this.displayName = currentUserProfile.display_name;
      this.bdate = currentUserProfile.birth_date;
      console.log(this.selectedCountry);
    },
    removeAvatar: function removeAvatar() {
      this.avatar = null;
      this.avatarState = null;
      console.log(this.avatar);
    },
    handleFile: function handleFile(e) {
      var _this = this;

      var fr = new FileReader();
      fr.readAsDataURL(e.target.files[0]);
      var imgs = ['image/jpeg', 'image/png', 'image/jpg'];
      var imgType = e.target.files[0].type;

      if (imgs.indexOf(imgType) == -1) {
        swal({
          "title": this.$t('oops'),
          "text": this.$t('avatarerror'),
          "icon": "error"
        });
        this.avatar = null;
      } else {
        fr.onload = function (e) {
          _this.avatar = e.target.result;
          _this.avatarState = 'changed';
        };
      }

      console.log("****************** file data **********************");
      console.log(e.target.files[0].name);
      console.log(e.target.files[0].type);
      console.log(e.target.files[0].size);
    },
    updateProfile: function updateProfile() {
      var _this2 = this;

      console.log("Bearer ".concat(this.$store.state.authentication.userToken));
      axios.post('/api/update-profile', {
        "avatar": this.avatar,
        "name": this.name,
        "display_name": this.displayName,
        "gender_id": this.selectedGender,
        "country_id": this.userCountry,
        "birth_date": this.bdate,
        "description": this.description,
        "topics": this.selectedTopics,
        "avatar_state": this.avatarState
      }, {
        headers: {
          "Authorization": "Bearer ".concat(this.$store.state.authentication.userToken)
        }
      }).then(function (response) {
        console.log(response); // localStorage.setItem('current_user',JSON.stringify(response.data.updated_user));
        // localStorage.setItem('current_user_profile',JSON.stringify(response.data.updated_profile));
        // localStorage.setItem('current_user_topics',JSON.stringify(response.data.updated_topics));

        _this2.$store.commit('updateProfile', {
          currentUserProfile: response.data.updated_profile,
          currentUser: response.data.updated_user,
          currentUserTopics: response.data.updated_topics
        });

        swal({
          title: _this2.$t('done'),
          text: _this2.$t('profileupdated'),
          icon: "success"
        });
      }).catch(function (errors) {
        console.log(errors.response);
        swal({
          title: _this2.$t('error'),
          text: _this2.$t('profileupdatefailed'),
          icon: "error"
        });
        _this2.errors = errors.response.data.errors;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/profile/UpdateProfile.vue?vue&type=style&index=0&id=727a6f42&scoped=true&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/profile/UpdateProfile.vue?vue&type=style&index=0&id=727a6f42&scoped=true&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.create[data-v-727a6f42]{\n  border-right: 1px solid #ddd\n}\ntextarea[data-v-727a6f42]{\n  resize: none;\n}\n#file-picker[data-v-727a6f42]{\n    border: 2px solid #f90;\n    width:100px;\n    height: 100px;\n    border-radius: 20px;\n}\n#file-picker > input[data-v-727a6f42]{\n  opacity: 0 !important;\n  width: 0\n}\n.card[data-v-727a6f42] {\n  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);\n  max-width: 320px;\n  margin: auto;\n  text-align: center;\n  font-family: arial;\n}\n.title[data-v-727a6f42] {\n  color: grey;\n  font-size: 18px;\n}\na[data-v-727a6f42] {\n  text-decoration: none;\n  font-size: 22px;\n  color: black;\n}\nbutton[data-v-727a6f42]:hover, a[data-v-727a6f42]:hover {\n  opacity: 0.7;\n}\n#file[data-v-727a6f42]{\n\topacity: 0;\n\tposition: absolute;\n\twidth: 100%;\n\theight: 100%;\n\tmargin: 0 auto;\n\ttop: 0;\n\tleft: 0;\n\tbottom: 0;\n\tright: 0;\n}\n#file-container[data-v-727a6f42] {\n  width:200px;\n  margin: 17px auto;\n\theight: 200px !important;\n\tposition: relative;\n  background-color:#ddd;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/profile/UpdateProfile.vue?vue&type=style&index=0&id=727a6f42&scoped=true&lang=css&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/profile/UpdateProfile.vue?vue&type=style&index=0&id=727a6f42&scoped=true&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./UpdateProfile.vue?vue&type=style&index=0&id=727a6f42&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/profile/UpdateProfile.vue?vue&type=style&index=0&id=727a6f42&scoped=true&lang=css&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/profile/UpdateProfile.vue?vue&type=template&id=727a6f42&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/profile/UpdateProfile.vue?vue&type=template&id=727a6f42&scoped=true& ***!
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
  return _vm.isLoggedIn
    ? _c(
        "v-container",
        { staticClass: "grid-list-md" },
        [
          _c(
            "v-layout",
            { attrs: { row: "", wrap: "" } },
            [
              _c(
                "v-flex",
                { attrs: { md6: "", xs12: "" } },
                [
                  _c(
                    "v-form",
                    {
                      on: {
                        submit: function($event) {
                          $event.preventDefault()
                          return _vm.updateProfile($event)
                        }
                      }
                    },
                    [
                      _c(
                        "div",
                        {
                          staticClass: "text-xs-center",
                          staticStyle: { height: "200px !important" },
                          attrs: { id: "file-container", color: "#e1f7e6" }
                        },
                        [
                          _c(
                            "v-icon",
                            {
                              staticClass: "mt-5",
                              attrs: { color: "black", size: "70px" }
                            },
                            [
                              _vm._v(
                                "\n              add_a_photo\n            "
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c("input", {
                            staticStyle: { opacity: "0" },
                            attrs: { id: "file", type: "file" },
                            on: { change: _vm.handleFile }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "form-group" },
                        [
                          _c("v-text-field", {
                            attrs: { placeholder: _vm.$t("name"), solo: "" },
                            model: {
                              value: _vm.name,
                              callback: function($$v) {
                                _vm.name = $$v
                              },
                              expression: "name"
                            }
                          }),
                          _vm._v(" "),
                          _vm.errors
                            ? _c("div", [
                                _vm.errors.name
                                  ? _c("p", { staticClass: "error--text" }, [
                                      _c("b", [
                                        _vm._v(_vm._s(_vm.errors.name[0]))
                                      ])
                                    ])
                                  : _vm._e()
                              ])
                            : _vm._e()
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "form-group" },
                        [
                          _c("v-text-field", {
                            attrs: {
                              solo: "",
                              placeholder: _vm.$t("displayname")
                            },
                            model: {
                              value: _vm.displayName,
                              callback: function($$v) {
                                _vm.displayName = $$v
                              },
                              expression: "displayName"
                            }
                          }),
                          _vm._v(" "),
                          _vm.errors
                            ? _c("div", [
                                _vm.errors.display_name
                                  ? _c("p", { staticClass: "error" }, [
                                      _c("b", [
                                        _vm._v(
                                          _vm._s(_vm.errors.display_name[0])
                                        )
                                      ])
                                    ])
                                  : _vm._e()
                              ])
                            : _vm._e()
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "form-group" },
                        [
                          _c(
                            "label",
                            {
                              staticClass: "white--text",
                              attrs: { for: "country" }
                            },
                            [_vm._v(_vm._s(_vm.$t("country")))]
                          ),
                          _vm._v(" "),
                          _c("v-select", {
                            attrs: {
                              items: _vm.countries,
                              label: _vm.countries[_vm.selectedCountry - 1],
                              hint: _vm.countries[_vm.selectedCountry],
                              solo: ""
                            },
                            model: {
                              value: _vm.selectedCountry,
                              callback: function($$v) {
                                _vm.selectedCountry = $$v
                              },
                              expression: "selectedCountry"
                            }
                          }),
                          _vm._v(" "),
                          _vm.errors
                            ? _c("div", [
                                _c("p", [
                                  _vm.errors.country_id
                                    ? _c("b", { staticClass: "error--text" }, [
                                        _vm._v(_vm._s(_vm.$t("countryerror")))
                                      ])
                                    : _vm._e()
                                ]),
                                _vm._v(" "),
                                _vm.errors.country_id
                                  ? _c("p", { staticClass: "error" }, [
                                      _c("b", [
                                        _vm._v(_vm._s(_vm.$t("countryerror")))
                                      ])
                                    ])
                                  : _vm._e()
                              ])
                            : _vm._e()
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "form-group" },
                        [
                          _c(
                            "v-dialog",
                            {
                              ref: "dialog",
                              attrs: {
                                "return-value": _vm.bdate,
                                persistent: "",
                                lazy: "",
                                "full-width": "",
                                width: "290px"
                              },
                              on: {
                                "update:returnValue": function($event) {
                                  _vm.bdate = $event
                                },
                                "update:return-value": function($event) {
                                  _vm.bdate = $event
                                }
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
                              _c("v-text-field", {
                                staticClass: "white--text",
                                attrs: {
                                  slot: "activator",
                                  label: _vm.$t("birthday"),
                                  reactive: true,
                                  "prepend-inner-icon": "event",
                                  solo: ""
                                },
                                slot: "activator",
                                model: {
                                  value: _vm.bdate,
                                  callback: function($$v) {
                                    _vm.bdate = $$v
                                  },
                                  expression: "bdate"
                                }
                              }),
                              _vm._v(" "),
                              _c(
                                "v-date-picker",
                                {
                                  attrs: {
                                    reactive: true,
                                    locale: "ar",
                                    scrollable: ""
                                  },
                                  model: {
                                    value: _vm.bdate,
                                    callback: function($$v) {
                                      _vm.bdate = $$v
                                    },
                                    expression: "bdate"
                                  }
                                },
                                [
                                  _c("v-spacer"),
                                  _vm._v(" "),
                                  _c(
                                    "v-btn",
                                    {
                                      attrs: { flat: "", color: "primary" },
                                      on: {
                                        click: function($event) {
                                          _vm.modal = false
                                        }
                                      }
                                    },
                                    [_vm._v("Cancel")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-btn",
                                    {
                                      attrs: { flat: "", color: "primary" },
                                      on: {
                                        click: function($event) {
                                          return _vm.$refs.dialog.save(
                                            _vm.bdate
                                          )
                                        }
                                      }
                                    },
                                    [_vm._v("OK")]
                                  )
                                ],
                                1
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _vm.errors
                            ? _c("div", [
                                _vm.errors.birth_date
                                  ? _c("p", { staticClass: "error" }, [
                                      _c("b", [
                                        _vm._v(_vm._s(_vm.errors.birth_date[0]))
                                      ])
                                    ])
                                  : _vm._e()
                              ])
                            : _vm._e()
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-radio-group",
                        {
                          staticClass: "white--text",
                          model: {
                            value: _vm.selectedGender,
                            callback: function($$v) {
                              _vm.selectedGender = $$v
                            },
                            expression: "selectedGender"
                          }
                        },
                        [
                          _c(
                            "div",
                            {
                              staticStyle: { color: "#f7dde3" },
                              attrs: { slot: "label" },
                              slot: "label"
                            },
                            [_c("h3", [_vm._v(_vm._s(_vm.$t("gender")))])]
                          ),
                          _vm._v(" "),
                          _vm._l(_vm.gender, function(gender, index) {
                            return [
                              _c(
                                "v-radio",
                                {
                                  attrs: { color: "#f7dde3", value: index + 1 }
                                },
                                [
                                  _c(
                                    "div",
                                    {
                                      staticStyle: { color: "#f7dde3" },
                                      attrs: { slot: "label" },
                                      slot: "label"
                                    },
                                    [
                                      _vm._v(
                                        "\n                " +
                                          _vm._s(gender) +
                                          "\n              "
                                      )
                                    ]
                                  )
                                ]
                              )
                            ]
                          })
                        ],
                        2
                      ),
                      _vm._v(" "),
                      _vm.errors
                        ? _c("div", [
                            _c("p", [
                              _vm.errors.gender_id
                                ? _c("b", { staticClass: "error" }, [
                                    _vm._v(_vm._s(_vm.$t("gendererror")))
                                  ])
                                : _vm._e()
                            ])
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _c("label", { staticClass: "white--text text-center" }, [
                        _vm._v(_vm._s(_vm.$t("selectfavtopics")))
                      ]),
                      _vm._v(" "),
                      _c("v-select", {
                        attrs: {
                          items: _vm.topics,
                          "item-text": "topic",
                          "item-value": "id",
                          label: _vm.$t("selectfavtopics"),
                          multiple: "",
                          chips: "",
                          solo: ""
                        },
                        model: {
                          value: _vm.selectedTopics,
                          callback: function($$v) {
                            _vm.selectedTopics = $$v
                          },
                          expression: "selectedTopics"
                        }
                      }),
                      _vm._v(" "),
                      _vm.errors
                        ? _c("div", [
                            _vm.errors.topics
                              ? _c("p", { staticClass: "error" }, [
                                  _c("b", [
                                    _vm._v(_vm._s(_vm.$t("selectfavtopics")))
                                  ])
                                ])
                              : _vm._e()
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "form-group" },
                        [
                          _c("label", { staticClass: "white--text" }, [
                            _vm._v(_vm._s(_vm.$t("description")))
                          ]),
                          _vm._v(" "),
                          _c("v-textarea", {
                            attrs: {
                              "no-resize": "",
                              label: _vm.$t("description"),
                              solo: ""
                            },
                            model: {
                              value: _vm.description,
                              callback: function($$v) {
                                _vm.description = $$v
                              },
                              expression: "description"
                            }
                          }),
                          _vm._v(" "),
                          _c("b", { staticClass: "white--text" }, [
                            _vm._v(_vm._s(_vm.writtenDescription) + "/25 words")
                          ]),
                          _vm._v(" "),
                          !_vm.checkDescription
                            ? _c("p", { staticClass: "error" }, [
                                _c("b", [
                                  _vm._v(_vm._s(_vm.$t("descriptionerror")))
                                ])
                              ])
                            : _vm._e(),
                          _vm._v(" "),
                          _vm.errors
                            ? _c("div", [
                                _vm.errors.description
                                  ? _c("p", { staticClass: "error" }, [
                                      _c("b", [
                                        _vm._v(
                                          _vm._s(_vm.errors.description[0])
                                        )
                                      ])
                                    ])
                                  : _vm._e()
                              ])
                            : _vm._e()
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "text-xs-center" },
                        [
                          _c(
                            "v-btn",
                            {
                              staticClass: "success white--text",
                              attrs: { round: "", medium: "", type: "submit" }
                            },
                            [
                              _vm._v(
                                "\n              " +
                                  _vm._s(_vm.$t("save")) +
                                  "\n          "
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "v-btn",
                            {
                              staticClass: "error white--text",
                              attrs: { round: "", medium: "", type: "button" },
                              on: { click: _vm.cancel }
                            },
                            [
                              _vm._v(
                                "\n              " +
                                  _vm._s(_vm.$t("cancel")) +
                                  "\n          "
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
              ),
              _vm._v(" "),
              _c(
                "v-flex",
                { attrs: { md4: "", "hidden-xs-only": "", "offset-md2": "" } },
                [
                  _c(
                    "v-card",
                    {
                      staticClass: "mt-5",
                      attrs: {
                        dark: "",
                        "max-width": "320",
                        height: "600",
                        "max-height": "620"
                      }
                    },
                    [
                      _vm.avatar == null
                        ? _c("v-img", {
                            attrs: {
                              src: "/storage/avatars/avatar_default.jpg",
                              height: "200"
                            }
                          })
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.avatar != null
                        ? [
                            _c("v-img", {
                              attrs: { src: _vm.avatar, height: "225" }
                            }),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "text-xs-center" },
                              [
                                _c(
                                  "v-tooltip",
                                  { attrs: { right: "" } },
                                  [
                                    _c(
                                      "v-btn",
                                      {
                                        attrs: {
                                          slot: "activator",
                                          small: "",
                                          color: "error",
                                          icon: ""
                                        },
                                        on: { click: _vm.removeSelectedAvatar },
                                        slot: "activator"
                                      },
                                      [
                                        _c("v-icon", [
                                          _vm._v("\n          close\n        ")
                                        ])
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c("b", [_vm._v(_vm._s(_vm.$t("remove")))])
                                  ],
                                  1
                                )
                              ],
                              1
                            )
                          ]
                        : _vm._e(),
                      _vm._v(" "),
                      _c("div", { staticClass: "text-sm-center" }, [
                        _c("h1", [_vm._v(_vm._s(_vm.name))]),
                        _vm._v(" "),
                        _c("h2", { staticClass: "yellow--text" }, [
                          _c("i", [_vm._v(_vm._s(_vm.displayName))])
                        ]),
                        _vm._v(" "),
                        _c("h3", [
                          _vm._v(_vm._s(_vm.gender[_vm.selectedGender - 1]))
                        ]),
                        _vm._v(" "),
                        _c("bdi", [
                          _c("h4", [
                            _c("b", [_vm._v(_vm._s(_vm.$t("from")) + " : ")]),
                            _vm._v("\n        " + _vm._s(_vm.selectedCountry))
                          ])
                        ])
                      ]),
                      _vm._v(" "),
                      _vm.selectedTopics.length > 0
                        ? _c(
                            "div",
                            { staticClass: "text-sm-center" },
                            [
                              _c("h4", [_vm._v(_vm._s(_vm.$t("favtopics")))]),
                              _vm._v(" "),
                              _vm._l(_vm.selectedTopics, function(topic) {
                                return [
                                  _c(
                                    "v-btn",
                                    {
                                      attrs: {
                                        small: "",
                                        round: "",
                                        color: "success"
                                      }
                                    },
                                    [
                                      _vm._v(
                                        "\n        " +
                                          _vm._s(_vm.topics[topic - 1].topic) +
                                          "\n      "
                                      )
                                    ]
                                  )
                                ]
                              })
                            ],
                            2
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          staticClass: "text-sm-center",
                          staticStyle: {
                            overflow: "hidden",
                            "text-overflow": "ellipsis"
                          }
                        },
                        [
                          _c("bdi", [
                            _c(
                              "p",
                              { staticStyle: { "white-space": "pre-line" } },
                              [
                                _c("b", [
                                  _vm._v(_vm._s(_vm.$t("about")) + " : ")
                                ]),
                                _vm._v(" " + _vm._s(_vm.description))
                              ]
                            )
                          ])
                        ]
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
        ],
        1
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/profile/UpdateProfile.vue":
/*!***********************************************************!*\
  !*** ./resources/js/components/profile/UpdateProfile.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UpdateProfile_vue_vue_type_template_id_727a6f42_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UpdateProfile.vue?vue&type=template&id=727a6f42&scoped=true& */ "./resources/js/components/profile/UpdateProfile.vue?vue&type=template&id=727a6f42&scoped=true&");
/* harmony import */ var _UpdateProfile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UpdateProfile.vue?vue&type=script&lang=js& */ "./resources/js/components/profile/UpdateProfile.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _UpdateProfile_vue_vue_type_style_index_0_id_727a6f42_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UpdateProfile.vue?vue&type=style&index=0&id=727a6f42&scoped=true&lang=css& */ "./resources/js/components/profile/UpdateProfile.vue?vue&type=style&index=0&id=727a6f42&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _UpdateProfile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UpdateProfile_vue_vue_type_template_id_727a6f42_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UpdateProfile_vue_vue_type_template_id_727a6f42_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "727a6f42",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/profile/UpdateProfile.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/profile/UpdateProfile.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/components/profile/UpdateProfile.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UpdateProfile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./UpdateProfile.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/profile/UpdateProfile.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UpdateProfile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/profile/UpdateProfile.vue?vue&type=style&index=0&id=727a6f42&scoped=true&lang=css&":
/*!********************************************************************************************************************!*\
  !*** ./resources/js/components/profile/UpdateProfile.vue?vue&type=style&index=0&id=727a6f42&scoped=true&lang=css& ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UpdateProfile_vue_vue_type_style_index_0_id_727a6f42_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./UpdateProfile.vue?vue&type=style&index=0&id=727a6f42&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/profile/UpdateProfile.vue?vue&type=style&index=0&id=727a6f42&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UpdateProfile_vue_vue_type_style_index_0_id_727a6f42_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UpdateProfile_vue_vue_type_style_index_0_id_727a6f42_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UpdateProfile_vue_vue_type_style_index_0_id_727a6f42_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UpdateProfile_vue_vue_type_style_index_0_id_727a6f42_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UpdateProfile_vue_vue_type_style_index_0_id_727a6f42_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/profile/UpdateProfile.vue?vue&type=template&id=727a6f42&scoped=true&":
/*!******************************************************************************************************!*\
  !*** ./resources/js/components/profile/UpdateProfile.vue?vue&type=template&id=727a6f42&scoped=true& ***!
  \******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UpdateProfile_vue_vue_type_template_id_727a6f42_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./UpdateProfile.vue?vue&type=template&id=727a6f42&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/profile/UpdateProfile.vue?vue&type=template&id=727a6f42&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UpdateProfile_vue_vue_type_template_id_727a6f42_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UpdateProfile_vue_vue_type_template_id_727a6f42_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);