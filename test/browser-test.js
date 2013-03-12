(function() {
  buster.testCase(
    "browser",
    {
      "SJIS ほげほげ": function(done) {
        var azoth = new Azoth([130, 217, 130, 176, 130, 217, 130, 176]);

        azoth.decode(Azoth.CharacterSet.SJIS, function(str) {
          assert.equals(str, "ほげほげ");
          done();
        });
      },
      "EUCJP ほげほげ": function(done) {
        var azoth = new Azoth([164, 219, 164, 178, 164, 219, 164, 178]);

        azoth.decode(Azoth.CharacterSet.EUCJP, function(str) {
          assert.equals(str, "ほげほげ");
          done();
        });
      },
      "UTF8 ほげほげ": function(done) {
        var azoth = new Azoth([227, 129, 187, 227, 129, 146, 227, 129, 187, 227, 129, 146]);

        azoth.decode(Azoth.CharacterSet.UTF8, function(str) {
          assert.equals(str, "ほげほげ");
          done();
        });
      },
      //-----------------------------------------------------------------------
      // "'", "<CR>", "<LF>", "\" などの特殊な文字が混ざっていても機能するか
      //-----------------------------------------------------------------------
      "SJIS escape": function(done) {
        var azoth = new Azoth([130, 217, 130, 176, 130, 217, 130, 176, 0x27, 0x0d, 0x0a, 0x5c]);

        azoth.decode(Azoth.CharacterSet.SJIS, function(str) {
          assert.equals(str, "ほげほげ'\x0d\x0a\\");
          done();
        });
      },
      "EUCJP escape": function(done) {
        var azoth = new Azoth([164, 219, 164, 178, 164, 219, 164, 178, 0x27, 0x0d, 0x0a, 0x5c]);

        azoth.decode(Azoth.CharacterSet.EUCJP, function(str) {
          assert.equals(str, "ほげほげ'\x0d\x0a\\");
          done();
        });
      },
      "UTF8 escape": function(done) {
        var azoth = new Azoth([227, 129, 187, 227, 129, 146, 227, 129, 187, 227, 129, 146, 0x27, 0x0d, 0x0a, 0x5c]);

        azoth.decode(Azoth.CharacterSet.UTF8, function(str) {
          assert.equals(str, "ほげほげ'\x0d\x0a\\");
          done();
        });
      },
      "SJIS string": function(done) {
        var azoth = new Azoth("Ù°Ù°");

        azoth.decode(Azoth.CharacterSet.SJIS, function(str) {
          assert.equals(str, "ほげほげ");
          done();
        });
      },
      "EUCJP string": function(done) {
        var azoth = new Azoth("¤Û¤²¤Û¤²");

        azoth.decode(Azoth.CharacterSet.EUCJP, function(str) {
          assert.equals(str, "ほげほげ");
          done();
        });
      },
      "UTF8 string": function(done) {
        var azoth = new Azoth("ã»ãã»ã");

        azoth.decode(Azoth.CharacterSet.UTF8, function(str) {
          assert.equals(str, "ほげほげ");
          done();
        });
      }

    }
  );

})();
