(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    this.getTrendPosts();
    this.$store.dispatch('reactedPosts');
  },
  mounted: function mounted() {
    this.loadMore();
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
    loadMore: function loadMore() {
      var _this = this;

      window.onscroll = function () {
        var endOfPage = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

        if (endOfPage) {
          if (!!localStorage.getItem('access_token') && _this.$route.name == 'trend') {
            _this.morePosts();
          }
        }
      };
    },
    morePosts: function morePosts() {
      this.offset += 100;
      this.$store.dispatch('loadMoreTrendPosts', {
        offset: this.offset,
        word: this.$route.query.trend
      });
    }
  }
});

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
        { attrs: { "hidden-sm-and-down": "", row: "", wrap: "" } },
        [
          _c("v-flex", { attrs: { xs12: "" } }, [
            _c("h1", { staticClass: "white--text text-xs-center" }, [
              _c("bdi", [
                _vm._v(
                  "\n          " +
                    _vm._s(this.$route.query.trend) +
                    "\n\n        "
                )
              ])
            ])
          ]),
          _vm._v(" "),
          _c("v-flex", { attrs: { md3: "" } }, [_c("suggested-people")], 1),
          _vm._v(" "),
          _c(
            "v-flex",
            { attrs: { md6: "" } },
            [_c("list-posts", { attrs: { posts: _vm.posts } })],
            1
          ),
          _vm._v(" "),
          _c(
            "v-flex",
            { attrs: { md3: "" } },
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
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
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