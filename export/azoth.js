goog.require('Azoth')
goog.require('ExportObject');

goog.exportSymbol('Azoth', Azoth);
goog.exportSymbol('Azoth.callback_', Azoth.callback_);
goog.exportSymbol(
  'Azoth.prototype.decode',
  Azoth.prototype.decode
);
ExportObject('Azoth.CharacterSet', {
  'SJIS': Azoth.CharacterSet.SJIS,
  'EUCJP': Azoth.CharacterSet.EUCJP,
  'UTF8': Azoth.CharacterSet.UTF8
});

