var top_row = [];
var bot_row = [];
var tmp_row = [];
var max_length;
function divide_conquer(str1, str2) {

  var timerStart = new Date();
  max_length = max(str1.length, str2.length);

  // We initialize top row and bot row:
  for ( var i = 0; i <= max_length; i++ ) {
    top_row[i] = i;
    bot_row[i] = i;
  }

  var path = divide_conquer_bis(str1, str2);
  var timerEnd = new Date();
  var computationTime = timerEnd - timerStart;
  var divideAndConquerEditDistance = findEDFromPath(path, str1, str2);

  return {
  "ed":
  divideAndConquerEditDistance, "path":
    path, 
    "time" : 
    computationTime
  };
}

function divide_conquer_bis(str1, str2) { 

  // We (re)initialize top row and bot row:
  for ( var i = 0; i <= max_length; i++ ) {
    top_row[i] = i;
    bot_row[i] = i;
  }


  // Edge cases : str1.length is 0 or 1 : we use the classical approach to find the alignment on a
  // VERY small str1 ( < 2 ) and a QUITE small str2 (because it had been recursively cut ) 

  if (str1.length === 0 || str1.length === 1 || str2.length === 0) {
    classicED = classic(str1, str2);
    var classicalMethodPath = classicED.path;
    return classicalMethodPath;
  }
  // ELSE we cut str1 in half and find where is the best place to cut str2 :

  var indexToCutStr1 =  int((str1.length-1)/2);

  // We find the row at position str1.length / 2 starting from the top : 

  for ( var i = 0; i <= indexToCutStr1; i++ ) {
    find_next(top_row, tmp_row, str2, str1.charAt(i));
    var permutateTmpAndTop = top_row;
    top_row = tmp_row;
    tmp_row = permutateTmpAndTop;
  }

  // We find the row at position str1.length / 2 starting from the bottom on the reversed strings :
  var str1Reverse = reverseString(str1);
  var str2Reverse = reverseString(str2);

  for ( var i = 0; i <= str1.length-indexToCutStr1-1; i++ ) {
    find_next(bot_row, tmp_row, str2Reverse, str1Reverse.charAt(i));
    var permutateTmpAndBot = bot_row;
    bot_row = tmp_row;
    tmp_row = permutateTmpAndBot;
  }

  // We merge both rows into one and look for the min : tmp = bot + top

  for (var i = 0; i < str2.length; i++ ) {
    tmp_row[i] = top_row[i+1] + bot_row[str2.length-i];
  }

  var indexToCutStr2 = 0 ;
  var currentMin = Number.MAX_SAFE_INTEGER;

  for (var i = 0; i < str2.length-1; i++) { // To know where to cut s2 we look for argmin (tmp_row) 
    if ( tmp_row[i] <= currentMin ) {
      indexToCutStr2 = i; 
      currentMin = tmp_row[i];
    }
  }

  var Part1OfStr1 = str1.substr(0, indexToCutStr1+1);
  var Part1OfStr2 = str2.substr(0, indexToCutStr2+1);
  var Part2OfStr1 = str1.substr(indexToCutStr1+1, str1.length);
  var Part2OfStr2 = str2.substr(indexToCutStr2+1, str2.length);

  var alignmentPath = "" ;
  var subcall1 = divide_conquer_bis(Part1OfStr1, Part1OfStr2);
  var subcall2 = divide_conquer_bis(Part2OfStr1, Part2OfStr2);

  // We have to check if this happens :
  //     SC1  SC2
  //   ....+  -....

  // Or if this happnes :
  //     SC1  SC2
  //   ....-  +....

  // If it is the case, we simply merge both of them in an 'S'

  if ( (subcall1.charAt(subcall1.length - 1 ) === '+' && subcall2.charAt(0) === '-') ||
    ( subcall1.charAt(subcall1.length - 1 ) === '-' && subcall2.charAt(0) === '+')
    ) {      
    subcall1 = subcall1.substr(0, subcall1.length - 1);
    subcall2 = subcall2.replaceAt(0, "S");
  }
  alignmentPath += subcall1 ;
  alignmentPath += subcall2;

  return alignmentPath;
}

String.prototype.replaceAt=function(index, replacement) {
  return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

function find_next(top_row, tmp_row, str2, charOfStr1) {

  // given a row top_row, this function puts into tmp_row the row below it
  // with regards to the corresponding character of str1 and the whole of str2
  tmp_row[0] = top_row[0] + 1 ;
  for ( var i = 1; i < top_row.length; i++ ) {
    if (charOfStr1 === str2.charAt(i-1)) { 
      tmp_row[i]=top_row[i-1];
    } else {
      tmp_row[i] = 1 + min(tmp_row[i-1], top_row[i-1], top_row[i])
    }
  }
}

function reverseString(str) {
  var splitString = str.split(""); 
  var reverseArray = splitString.reverse(); 
  var joinArray = reverseArray.join(""); 
  return joinArray;
}

function findEDFromPath(path, str1, str2) {
  var editDistanceFromPath = 0;
  var str1Index = 0;
  var str2Index = 0;

  for (i = 0; i < path.length; i++ ) {
    if (path.charAt(i) === 'S') {
      if (str1.charAt(str1Index) !== str2.charAt(str2Index)) {
        editDistanceFromPath++;
        str1Index++;
        str2Index++;
      } else {
        str1Index++;
        str2Index++;
      }
    } else {
      editDistanceFromPath++;
      if (path.charAt(i) === '+') {
        str2Index++;
      }      
      if (path.charAt(i) === '-') {
        str1Index++;
      }
    }
  }
  return editDistanceFromPath;
}

/*
     A B C D E <- str2
 0 1 2 3 4 5 <- top row
 G 1
 H 2
 I 3
 
 ^
 |
 
 s
 t
 r
 1
 
 */