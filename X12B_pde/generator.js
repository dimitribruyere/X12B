function generator() {
  this.create2Strings = function(String1Length, String2Length) {
    var string1  = "";
    var string2  = "";
    var alphabet = [];
    for (var i = 0; i < 26; i++) {
      alphabet.push(String.fromCharCode(i+"a".charCodeAt(0)));
    }
    for (var i = 0; i < 26; i++) {
      alphabet.push(String.fromCharCode(i+"A".charCodeAt(0)));
    }
    for (var i = 0; i < String1Length; i++) {
      randomChar = random(alphabet);
      string1 += randomChar;
    }
    for (var i = 0; i < String2Length; i++) {
      randomChar = random(alphabet);
      string2 += randomChar;
    }
  var strings = {"string1": 
  string1, "string2": 
    string2
  };
  return strings;
}
}