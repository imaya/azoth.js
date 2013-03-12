azoth.js
========

## About

Character encoding decoding library.

## Usage

Include "bin/azoth.min.js".

### Decode Shift JIS string

```js
(
  /**
   * @param {(string|Array.<number>|Uint8Array)} encoded Shift_JIS string.
   */
  function(encoded) {
    var azoth = new Azoth(encoded);

    azoth.decode(Azoth.CharacterSet.SJIS, function(decoded) {
      console.log(decoded);
    });
  }
)();
```

### Decode EUC-JP string

```js
(
  /**
   * @param {(string|Array.<number>|Uint8Array)} encoded EUC-JP string.
   */
  function(encoded) {
    var azoth = new Azoth(encoded);

    azoth.decode(Azoth.CharacterSet.EUCJP, function(decoded) {
      console.log(decoded);
    });
  }
)();
```

### Decode UTF-8 string

```js
(
  /**
   * @param {(string|Array.<number>|Uint8Array)} encoded UTF-8 string.
   */
  function(encoded) {
    var azoth = new Azoth(encoded);

    azoth.decode(Azoth.CharacterSet.UTF8, function(decoded) {
      console.log(decoded);
    });
  }
)();
```

## License

MIT License

