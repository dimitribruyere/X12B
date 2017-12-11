var divideAndConquerPathCoordinateArray = [];
var divideAndConquerEditDistance = -1;
function divide_conquer(str1, str2) {
  divide_conquer_bis(str1, str2);
  alert(divideAndConquerPathCoordinateArray);
  return {
  "ed":
  divideAndConquerEditDistance, "path":
    divideAndConquerPathCoordinateArray
  };
}

function divide_conquer_bis(str1, str2)
{
  alert("str1 : "+str1+" str2 : "+str2);


  var top_row = [];
  var bot_row = [];
  var tmp_row = [];

  // We initialize top row and bot row:
  for ( var i = 0; i <= str1.length; i++ ) {
    top_row[i] = i;
    bot_row[i] = i;
  }

  alert(str2.charAt((str2.length / 2)-1));
  // We find the row at position length2 /2 starting from the top  
  for ( var i = 0; i < str2.length / 2; i++ ) {
    find_next(top_row, tmp_row, str1, str2.charAt(i));
    var permutateTmpAndTop = top_row;
    top_row = tmp_row;
    tmp_row = permutateTmpAndTop;
  }


  // We find the row at position length2 /2 starting from the bottom on the reversed strings :
  var str1Reverse = reverseString(str1);
  var str2Reverse = reverseString(str2);
  for ( var i = 0; i < (1+str2.length) / 2; i++ ) {
    find_next(bot_row, tmp_row, str1Reverse, str2Reverse.charAt(i));
    var permutateTmpAndBot = bot_row;
    bot_row = tmp_row;
    tmp_row = permutateTmpAndBot;
  }

  // We merge both rows into one and look for the min : tmp = bot + top
  //alert(bot_row);
  //alert(top_row);
  for (var i = 0; i < top_row.length; i++ ) {
    tmp_row[i] = bot_row[top_row.length-i] + top_row[i];
  }
  tmp_row[0] = 2*top_row[0];

  var whereToCut = 0 ;
  var currentMin = Number.MAX_SAFE_INTEGER;

  for (var i = 0; i < tmp_row.length; i++) { // To know where to cut s1 we look for argmin (tmp_row) 
    if ( tmp_row[i] <= currentMin ) {
      whereToCut = i; 
      currentMin = tmp_row[i];
    }
  }

  //return whereToCut

  if (divideAndConquerEditDistance === -1) {
    divideAndConquerEditDistance = tmp_row[whereToCut];
  }
  whereToCut--;
  divideAndConquerPathCoordinateArray[str2.length / 2]=whereToCut;
  alert("Where to cut ?"+whereToCut);

  var Part1OfStr1 = str1.substr(0, 1+str1.length/2);
  var Part1OfStr2 = str2.substr(0, whereToCut     );
  var Part2OfStr1 = str1.substr(1+str1.length/2, str1.length    );
  var Part2OfStr2 = str2.substr(whereToCut, str2.length    );
  //alert("p1s1 : "+Part1OfStr1+" p1s2 "+Part1OfStr2+" p2s1 "+Part2OfStr1+"p2s2"+Part2OfStr2);

  if (Part1OfStr1.length != 0 && Part1OfStr2.length != 0) {
    if (Part1OfStr2.length === 1) {
//Compléter le tableau divideAndConquerPathCoordinateArray ?! ?
    } else {
      divide_conquer_bis(Part1OfStr1, Part1OfStr2);
    }
  }
  if (Part2OfStr1.length != 0 && Part2OfStr2.length != 0) {
    if (Part2OfStr2.length === 1) {
    } else {
      divide_conquer_bis(Part2OfStr1, Part2OfStr2);
    }
  }
}

function find_next(top_row, tmp_row, str1, charOfStr2) {
  //alert(charOfStr2);
  tmp_row[0] = top_row[0] + 1 ;
  for ( var i = 1; i < top_row.length; i++ ) {
    if (charOfStr2 === str1.charAt(i-1)) { 
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

/*
    A B C D E <- str1
 0 1 2 3 4 5 <- top row
 G 1
 H 2
 I 3
 
 ^
 |
 
 s
 t
 r
 2
 
 */