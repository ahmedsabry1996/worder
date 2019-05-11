(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/ListPosts.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/ListPosts.vue?vue&type=script&lang=js& ***!
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
//
//
//
//
//
//
//
//
//
//
//
//
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
      showPost: false,
      posts: null,
      selectedPost: null,
      headers: [{
        text: "show",
        value: "id",
        align: "centre"
      }, {
        text: "NO.reporsts",
        value: "reports_num",
        align: "center"
      }, {
        text: "Actions",
        value: "id",
        align: "centre"
      }]
    };
  },
  created: function created() {
    var _this = this;

    this.$store.dispatch('fetchReportedPosts').then(function (response) {
      console.log(response.data);
      _this.posts = response.data.posts;
    }).catch(function (error) {
      console.log(error);
      console.log(error.response);
    });
  },
  methods: {
    DisplayPost: function DisplayPost(postId) {
      var index = this.posts.findIndex(function (val, ind) {
        return val.post_id == postId;
      });
      this.selectedPost = this.posts[index];
      this.showPost = true;
    },
    stopReports: function stopReports(postId) {
      var _this2 = this;

      this.$store.dispatch('stopReports', {
        postId: postId
      }).then(function (response) {
        var index = _this2.posts.findIndex(function (val, ind) {
          return val.post_id == postId;
        });

        console.log(response.data);

        _this2.posts.splice(index, 1);
      }).catch(function (error) {
        alert('error in stoping');
        console.log(error);
        console.log(error.response);
      });
    },
    removePost: function removePost(postId) {
      var _this3 = this;

      var sure = confirm('Are u sure ?');

      if (sure) {
        this.$store.dispatch('removePost', {
          postId: postId
        }).then(function (response) {
          var index = _this3.posts.findIndex(function (val, ind) {
            return val.post_id == postId;
          });

          _this3.posts.splice(index, 1);
        }).catch(function (error) {
          alert('error in delt');
          console.log(error);
          console.log(error.response);
        });
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/ListPosts.vue?vue&type=template&id=f1ccbe0c&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/ListPosts.vue?vue&type=template&id=f1ccbe0c&scoped=true& ***!
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
    "v-container",
    { attrs: { "grid-list-xs": "" } },
    [
      _c(
        "v-layout",
        { attrs: { row: "", wrap: "" } },
        [
          _c("v-flex", { attrs: { xs12: "" } }, [
            _c(
              "h1",
              { staticClass: "white--text text-xs-center text-uppercase" },
              [_vm._v("list posts")]
            )
          ]),
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
                value: _vm.showPost,
                callback: function($$v) {
                  _vm.showPost = $$v
                },
                expression: "showPost"
              }
            },
            [
              _c("v-card", { attrs: { dark: "" } }, [
                !!_vm.selectedPost
                  ? _c("div", { staticClass: "pa-5 text-xs-center" }, [
                      _c("h3", [
                        _vm._v(
                          "\n            " +
                            _vm._s(_vm.selectedPost.post.post) +
                            "\n          "
                        )
                      ]),
                      _vm._v(" "),
                      _vm.selectedPost.post.image
                        ? _c("div", { staticClass: "text-xs-center" }, [
                            _c("img", {
                              staticClass: "grey lighten-2",
                              attrs: {
                                width: "320",
                                src:
                                  "/storage/posts_images/" +
                                  _vm.selectedPost.post.image
                              },
                              on: {
                                click: function($event) {
                                  return _vm.showPost(_vm.post.id)
                                }
                              }
                            })
                          ])
                        : _vm._e()
                    ])
                  : _vm._e()
              ])
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-flex",
            { attrs: { xs12: "" } },
            [
              !!_vm.posts
                ? _c("v-data-table", {
                    attrs: {
                      dark: "",
                      headers: _vm.headers,
                      items: _vm.posts,
                      "hide-actions": ""
                    },
                    scopedSlots: _vm._u(
                      [
                        {
                          key: "items",
                          fn: function(props) {
                            return [
                              _c(
                                "td",
                                { staticClass: "text-xs-center" },
                                [
                                  _c(
                                    "v-btn",
                                    {
                                      attrs: {
                                        color: "indigo",
                                        small: "",
                                        round: "",
                                        dark: ""
                                      },
                                      on: {
                                        click: function($event) {
                                          return _vm.DisplayPost(
                                            props.item.post_id
                                          )
                                        }
                                      }
                                    },
                                    [_vm._v("show post")]
                                  )
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c("td", { staticClass: "text-xs-center" }, [
                                _vm._v(_vm._s(props.item.reports_num))
                              ]),
                              _vm._v(" "),
                              _c(
                                "td",
                                { staticClass: "text-xs-center" },
                                [
                                  _c(
                                    "v-btn",
                                    {
                                      attrs: {
                                        color: "primary",
                                        small: "",
                                        round: ""
                                      },
                                      on: {
                                        click: function($event) {
                                          return _vm.stopReports(
                                            props.item.post_id
                                          )
                                        }
                                      }
                                    },
                                    [_vm._v("stop reports")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-btn",
                                    {
                                      attrs: {
                                        color: "error",
                                        small: "",
                                        round: ""
                                      },
                                      on: {
                                        click: function($event) {
                                          return _vm.removePost(
                                            props.item.post_id
                                          )
                                        }
                                      }
                                    },
                                    [_vm._v("remove the post")]
                                  )
                                ],
                                1
                              )
                            ]
                          }
                        }
                      ],
                      null,
                      false,
                      211699153
                    )
                  })
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
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/admin/ListPosts.vue":
/*!*****************************************************!*\
  !*** ./resources/js/components/admin/ListPosts.vue ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ListPosts_vue_vue_type_template_id_f1ccbe0c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ListPosts.vue?vue&type=template&id=f1ccbe0c&scoped=true& */ "./resources/js/components/admin/ListPosts.vue?vue&type=template&id=f1ccbe0c&scoped=true&");
/* harmony import */ var _ListPosts_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ListPosts.vue?vue&type=script&lang=js& */ "./resources/js/components/admin/ListPosts.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ListPosts_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ListPosts_vue_vue_type_template_id_f1ccbe0c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ListPosts_vue_vue_type_template_id_f1ccbe0c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "f1ccbe0c",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/admin/ListPosts.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/admin/ListPosts.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./resources/js/components/admin/ListPosts.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ListPosts_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ListPosts.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/ListPosts.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ListPosts_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/admin/ListPosts.vue?vue&type=template&id=f1ccbe0c&scoped=true&":
/*!************************************************************************************************!*\
  !*** ./resources/js/components/admin/ListPosts.vue?vue&type=template&id=f1ccbe0c&scoped=true& ***!
  \************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ListPosts_vue_vue_type_template_id_f1ccbe0c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ListPosts.vue?vue&type=template&id=f1ccbe0c&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/ListPosts.vue?vue&type=template&id=f1ccbe0c&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ListPosts_vue_vue_type_template_id_f1ccbe0c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ListPosts_vue_vue_type_template_id_f1ccbe0c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);