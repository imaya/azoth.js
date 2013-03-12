goog.provide('Azoth');

goog.scope(function() {

/**
 * @constructor
 * @param {(Array.<number>|string)} source character code array.
 */
Azoth = function(source) {
  /** @type {Array.<number>} */
  this.source;

  if (typeof source === 'string') {
    this.source = Azoth.str2array_(source);
  } else if (source instanceof Array) {
    this.source = source;
  } else {
    throw new Error('invalid arguments');
  }
};

/**
 * @enum {string}
 */
Azoth.CharacterSet = {
  SJIS: 'Shift_JIS',
  EUCJP: 'EUC-JP',
  UTF8: 'UTF-8'
};

/**
 * @param {Azoth.CharacterSet} charset character set.
 * @param {function(string)=} opt_callback function.
 */
Azoth.prototype.decode = function(charset, opt_callback) {
  /** @type {Array.<number>} */
  var src = this.source;
  /** @type {HTMLScriptElement} */
  var script =
    /** @type {HTMLScriptElement} */(document.createElement('script'));
  /** @type {number} */
  var id = Azoth.id++;
  /** @type {string} */
  var url;
  /** @type {function(string): Array.<number>} */
  var str2array = Azoth.str2array_;
  /** @type {Array.<number>} */
  var escapedCode = new Array(src.length);
  /** @type {number} */
  var i;
  /** @type {number} */
  var il;
  /** @type {number} */
  var pos;

  /**
   * @returns {boolean}
   */
  function isSingleByte() {
    if (i === 0) {
      return true;
    }

    switch (charset) {
      case Azoth.CharacterSet.SJIS:
        return !(
          (src[i-1] >= 0x81 && src[i-1] <= 0x9f) ||
          (src[i-1] >= 0xe0 && src[i-1] <= 0xef)
        );
      case Azoth.CharacterSet.EUCJP:
        return !(src[i-1] >= 0x80);
      case Azoth.CharacterSet.UTF8:
        return true;
      default:
        throw new Error('Unknown CharacterSet');
    }
  }

  for (i = pos = 0, il = src.length; i < il; i++) {
    // escape "\" to "\\"
    if (src[i] === 0x5c) {
      // check single byte
      if (isSingleByte()) {
        escapedCode[pos++] = 0x5c;
        escapedCode[pos++] = 0x5c;
      } else {
        escapedCode[pos++] = src[i];
      }
      // escape "'" to "\x27"
    } else if (src[i] === 0x27) {
      escapedCode[pos++] = 0x5c;
      escapedCode[pos++] = 0x78;
      escapedCode[pos++] = 0x32;
      escapedCode[pos++] = 0x37;
      // escape <LF> to "\x0a"
    } else if (src[i] === 0x0a) {
      escapedCode[pos++] = 0x5c;
      escapedCode[pos++] = 0x78;
      escapedCode[pos++] = 0x30;
      escapedCode[pos++] = 0x61;
      // escape <CR> to "\x0d"
    } else if (src[i] === 0x0d) {
      escapedCode[pos++] = 0x5c;
      escapedCode[pos++] = 0x78;
      escapedCode[pos++] = 0x30;
      escapedCode[pos++] = 0x64;
    } else {
      escapedCode[pos++] = src[i];
    }
  }
  src = escapedCode;

  // create data url
  url = [
    'data:text/javascript;base64;charset=', charset, ',',
    window.btoa(
      String.fromCharCode.apply(null,
        [].concat(
          str2array('Azoth.callback_(' + id + ",'"),
          src,
          str2array("');")
        )
      )
    )
  ].join('');

  // append script element
  script.src = url;
  script.setAttribute('charset', charset);
  document.head.appendChild(script);

  // append context queue
  Azoth.queue.push({
    id: id,
    element: script,
    callback: opt_callback
  });
};

/** @type {Array.<Object>} */
Azoth.queue = [];

/** @type {number} */
Azoth.id = 0;

/**
 * @param {string} str string.
 * @return {Array.<number>} character code array.
 */
Azoth.str2array_ = function(str) {
  /** @type {number} */
  var i;
  /** @type {number} */
  var il;
  /** @type {Array.<number>} */
  var array = new Array(str.length);

  for (i = 0, il = str.length; i < il; ++i) {
    array[i] = str.charCodeAt(i) & 0xff;
  }

  return array;
};

/**
 * @param {number} id identifier.
 * @param {string} str converted string.
 * @private
 */
Azoth.callback_ = function(id, str) {
  /** @type {number} */
  var i;
  /** @type {number} */
  var il;
  /** @type {Array.<Object>} */
  var queue = Azoth.queue;
  /** @type {Object} */
  var item;

  for (i = 0, il = queue.length; i < il; ++i) {
    if (queue[i].id === id) {
      item = queue.splice(i, 1)[0];
      break;
    }
  }
  if (item === void 0) {
    throw new Error('unknown id');
  }

  if (typeof item.callback === 'function') {
    item.callback(str);
  }

  document.head.removeChild(item.element);
};

});
