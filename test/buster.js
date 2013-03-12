/**
 * unit test settings for BusterJS.
 */
var config = module.exports;

// ブラウザ共通設定
var browserCommon = {
    rootPath: "../",
    environment: "browser",
    tests: [
      'test/browser-test.js'
    ]
};

// ブラウザで独立ビルド版のテスト
config["minify"] = mixin(
  mixin({}, browserCommon),
  {
    libs: [
      "bin/azoth.min.js"
    ]
  }
);

// config mixin
function mixin(dst, src) {
  var i;

  for (i in src) {
    if (dst[i] instanceof Array && src[i] instanceof Array) {
      dst[i] = dst[i].concat(src[i]);
    } else if (typeof dst[i] === 'object' && typeof src[i] === 'object') {
      mixin(dst[i], src[i]);
    } else {
      dst[i] = src[i];
    }
  }

  return dst;
}
