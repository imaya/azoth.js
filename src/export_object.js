goog.provide('ExportObject');

goog.scope(function() {

ExportObject = function(enumString, exportKeyValue) {
  /** @type {Array.<string>} */
  var keys;
  /** @type {string} */
  var key;
  /** @type {number} */
  var i;
  /** @type {number} */
  var il;

  if (Object.keys) {
    keys = Object.keys(exportKeyValue);
  } else {
    keys = [];
    i = 0;
    for (key in exportKeyValue) {
      keys[i++] = key;
    }
  }

  for (i = 0, il = keys.length; i < il; ++i) {
    key = keys[i];
    goog.exportSymbol(enumString + '.' + key, exportKeyValue[key])
  }
};

});