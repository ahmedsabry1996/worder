(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/trend/ShowTrend.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/trend/ShowTrend.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _posts_ListPosts_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../posts/ListPosts.vue */ "./resources/js/components/posts/ListPosts.vue");
/* harmony import */ var _Suggestpeople_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../Suggestpeople.vue */ "./resources/js/components/Suggestpeople.vue");
/* harmony import */ var _topics_Topics_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../topics/Topics.vue */ "./resources/js/components/topics/Topics.vue");
/* harmony import */ var _trend_Trend_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../trend/Trend.vue */ "./resources/js/components/trend/Trend.vue");
/* harmony import */ var _posts_Createpost_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../posts/Createpost.vue */ "./resources/js/components/posts/Createpost.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    createPost: _posts_Createpost_vue__WEBPACK_IMPORTED_MODULE_4__["default"],
    ListPosts: _posts_ListPosts_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    SuggestedPeople: _Suggestpeople_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    Topics: _topics_Topics_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    Trend: _trend_Trend_vue__WEBPACK_IMPORTED_MODULE_3__["default"]
  },
  data: function data() {
    return {
      offset: 0
    };
  },
  computed: {
    posts: function posts() {
      return this.$store.getters.trendPosts;
    }
  },
  created: function created() {
    console.log('show trend loaded');
    this.getTrendPosts();
    this.$store.dispatch('reactedPosts');
  },
  watch: {
    '$route': function $route(to, from) {
      this.offset = 0;
      this.getTrendPosts();
    }
  },
  methods: {
    getTrendPosts: function getTrendPosts() {
      this.$store.dispatch('showTrendPosts', {
        word: this.$route.query.trend
      });
    },
    morePosts: function morePosts($state) {
      this.offset += 100;
      this.$store.dispatch('loadMoreTrendPosts', {
        offset: this.offset,
        word: this.$route.query.trend
      }).then(function (response) {
        if (response.data.posts.length > 0) {
          $state.loaded();
        } else {
          $state.complete();
        }
      }).catch(function (errors) {
        alert('error in loading more trend posts');
      });
    },
    ads: function ads() {
      alert('InshaAllah after one months every thing will be Ok');
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/trend/ShowTrend.vue?vue&type=style&index=0&id=ea27bfda&scoped=true&lang=css&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/trend/ShowTrend.vue?vue&type=style&index=0&id=ea27bfda&scoped=true&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.aa[data-v-ea27bfda]{\n  height:100px;\n  padding: 0px;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/trend/ShowTrend.vue?vue&type=style&index=0&id=ea27bfda&scoped=true&lang=css&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/trend/ShowTrend.vue?vue&type=style&index=0&id=ea27bfda&scoped=true&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./ShowTrend.vue?vue&type=style&index=0&id=ea27bfda&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/trend/ShowTrend.vue?vue&type=style&index=0&id=ea27bfda&scoped=true&lang=css&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/trend/ShowTrend.vue?vue&type=template&id=ea27bfda&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/trend/ShowTrend.vue?vue&type=template&id=ea27bfda&scoped=true& ***!
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
    { attrs: { "grid-list-lg": "" } },
    [
      _c(
        "v-layout",
        { attrs: { row: "", wrap: "" } },
        [
          _c("v-flex", { attrs: { xs12: "" } }, [_c("create-post")], 1),
          _vm._v(" "),
          _c(
            "v-flex",
            { attrs: { xs12: "" } },
            [
              _c(
                "v-card",
                { attrs: { color: "#282e33" } },
                [
                  _c("v-card-title", { attrs: { "primary-title": "" } }, [
                    _c("h4", { staticClass: "white--text" }, [
                      _vm._v(
                        "\n                  Trend Sponser\n                "
                      )
                    ])
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "aa  text-xs-center" },
                    [
                      _c("h1", { staticClass: "text-xs-center white--text" }, [
                        _vm._v(
                          "\n\n                    I Am A Sponser\n                  "
                        )
                      ]),
                      _vm._v(" "),
                      _c(
                        "v-card-actions",
                        [
                          _c(
                            "v-btn",
                            {
                              attrs: { flat: "", dark: "", medium: "" },
                              on: { click: _vm.ads }
                            },
                            [_vm._v("be a sponser")]
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
          _c("v-flex", { attrs: { xs12: "" } }, [
            _c("h1", { staticClass: "yellow--text text-xs-center" }, [
              _c("bdi", [
                _vm._v(
                  "\n              #" +
                    _vm._s(this.$route.query.trend) +
                    "\n            "
                )
              ])
            ])
          ]),
          _vm._v(" "),
          _c(
            "v-flex",
            { staticClass: "hidden-xs-only", attrs: { md3: "" } },
            [_c("suggested-people")],
            1
          ),
          _vm._v(" "),
          _c("v-flex", { attrs: { md6: "", xs12: "" } }, [
            _c(
              "div",
              { staticClass: "text-xs-center" },
              [
                _c("list-posts", { attrs: { posts: _vm.posts } }),
                _vm._v(" "),
                _c("infinite-loading", {
                  attrs: { distance: 1000, spinner: "waveDots" },
                  on: { infinite: _vm.morePosts }
                })
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c(
            "v-flex",
            { staticClass: "hidden-xs-only", attrs: { md3: "" } },
            [_c("trend"), _vm._v(" "), _c("br"), _vm._v(" "), _c("topics")],
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

/***/ "./resources/js/components/trend/ShowTrend.vue":
/*!*****************************************************!*\
  !*** ./resources/js/components/trend/ShowTrend.vue ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ShowTrend_vue_vue_type_template_id_ea27bfda_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ShowTrend.vue?vue&type=template&id=ea27bfda&scoped=true& */ "./resources/js/components/trend/ShowTrend.vue?vue&type=template&id=ea27bfda&scoped=true&");
/* harmony import */ var _ShowTrend_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ShowTrend.vue?vue&type=script&lang=js& */ "./resources/js/components/trend/ShowTrend.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _ShowTrend_vue_vue_type_style_index_0_id_ea27bfda_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ShowTrend.vue?vue&type=style&index=0&id=ea27bfda&scoped=true&lang=css& */ "./resources/js/components/trend/ShowTrend.vue?vue&type=style&index=0&id=ea27bfda&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ShowTrend_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ShowTrend_vue_vue_type_template_id_ea27bfda_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ShowTrend_vue_vue_type_template_id_ea27bfda_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "ea27bfda",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/trend/ShowTrend.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/trend/ShowTrend.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./resources/js/components/trend/ShowTrend.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ShowTrend_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ShowTrend.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/trend/ShowTrend.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ShowTrend_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/trend/ShowTrend.vue?vue&type=style&index=0&id=ea27bfda&scoped=true&lang=css&":
/*!**************************************************************************************************************!*\
  !*** ./resources/js/components/trend/ShowTrend.vue?vue&type=style&index=0&id=ea27bfda&scoped=true&lang=css& ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ShowTrend_vue_vue_type_style_index_0_id_ea27bfda_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./ShowTrend.vue?vue&type=style&index=0&id=ea27bfda&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/trend/ShowTrend.vue?vue&type=style&index=0&id=ea27bfda&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ShowTrend_vue_vue_type_style_index_0_id_ea27bfda_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ShowTrend_vue_vue_type_style_index_0_id_ea27bfda_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ShowTrend_vue_vue_type_style_index_0_id_ea27bfda_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ShowTrend_vue_vue_type_style_index_0_id_ea27bfda_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ShowTrend_vue_vue_type_style_index_0_id_ea27bfda_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/trend/ShowTrend.vue?vue&type=template&id=ea27bfda&scoped=true&":
/*!************************************************************************************************!*\
  !*** ./resources/js/components/trend/ShowTrend.vue?vue&type=template&id=ea27bfda&scoped=true& ***!
  \************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ShowTrend_vue_vue_type_template_id_ea27bfda_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ShowTrend.vue?vue&type=template&id=ea27bfda&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/trend/ShowTrend.vue?vue&type=template&id=ea27bfda&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ShowTrend_vue_vue_type_template_id_ea27bfda_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ShowTrend_vue_vue_type_template_id_ea27bfda_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);