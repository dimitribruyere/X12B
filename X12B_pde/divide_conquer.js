var divideAndConquerEditDistance;
function divide_conquer(str1, str2) {
  var timerStart = new Date();
  divideAndConquerEditDistance=-1;
  p =divide_conquer_bis(str1, str2);
  //alert("wtf p ?? : "+p);
  var timerEnd = new Date();
  var computationTime = timerEnd - timerStart;
  return {
  "ed":
  divideAndConquerEditDistance, "path":
    p, 
    "time" : 
    computationTime
  };
}

function divide_conquer_bis(str1, str2)
{
  // Décommenter pour voir l'appel en cours :
  // alert("Appel sur :\nstr1 : "+str1+" str2 : "+str2);

  // If length of str2 is 2 or less, we stop the recursion and find the edit distance between
  // a VERY small str2 ( <= 2 ) and a QUITE small str1 (because it had been recursively cut down

  if (str2.length <= 2) {
    var classicCallOnSmallProblem = classic(str1, str2);
    var path_bit = classicCallOnSmallProblem.path;
    if (divideAndConquerEditDistance === -1) {
      divideAndConquerEditDistance = classicCallOnSmallProblem.ed;
    }
    return  path_bit;
  }

  var top_row = [];
  var bot_row = [];
  var tmp_row = [];
  var whereToCutStr2 = str2.length / 2;

  // We initialize top row and bot row:
  for ( var i = 0; i <= str1.length; i++ ) {
    top_row[i] = i;
    bot_row[i] = i;
  }

  //alert(str2.charAt((str2.length / 2)-1));
  // We find the row at position length2 /2 starting from the top 

  for ( var i = 0; i <= whereToCutStr2; i++ ) {
    find_next(top_row, tmp_row, str1, str2.charAt(i));
    var permutateTmpAndTop = top_row;
    top_row = tmp_row;
    tmp_row = permutateTmpAndTop;
  }

  // We find the row at position length2 /2 starting from the bottom on the reversed strings :
  var str1Reverse = reverseString(str1);
  var str2Reverse = reverseString(str2);

  for ( var i = 0; i < whereToCutStr2-1; i++ ) {
    find_next(bot_row, tmp_row, str1Reverse, str2Reverse.charAt(i));
    var permutateTmpAndBot = bot_row;
    bot_row = tmp_row;
    tmp_row = permutateTmpAndBot;
  }

  // We merge both rows into one and look for the min : tmp = bot + top

  //alert(bot_row);

  //alert(top_row+"\n"+bot_row+"\n");
  for (var i = 1; i < top_row.length; i++ ) {
    tmp_row[i] = bot_row[top_row.length-i] + top_row[i];
  }
  tmp_row[0] = str2.length+str1.length; // first cell of top row is the length of str2 i.e. worse case edit distance
  //alert(tmp_row);

  var whereToCutStr1 = 0 ;
  var currentMin = Number.MAX_SAFE_INTEGER;

  //alert(tmp_row);

  for (var i = 0; i < tmp_row.length; i++) { // To know where to cut s1 we look for argmin (tmp_row) 
    if ( tmp_row[i] <= currentMin ) {
      whereToCutStr1 = i; 
      currentMin = tmp_row[i];
    }
  }

  if (divideAndConquerEditDistance === -1) { // If the edit distance has not been found yet, we find it on the first pass
    divideAndConquerEditDistance = tmp_row[whereToCutStr1];
  }

  whereToCutStr1--;
  //alert("whereToCut str1 : "+whereToCutStr1+" that's letter"+str1.charAt(whereToCutStr1));
  whereToCutStr1 = max(whereToCutStr1, 0);

  //alert("Where to cut ?"+whereToCut);

  var Part1OfStr1 = str1.substr(0, whereToCutStr1);
  var Part1OfStr2 = str2.substr(0, whereToCutStr2+1);
  var Part2OfStr1 = str1.substr(whereToCutStr1-1, str1.length);
  var Part2OfStr2 = str2.substr(whereToCutStr2, str2.length);
  //alert("p1s1 : "+Part1OfStr1+" p1s2 "+Part1OfStr2+" p2s1 "+Part2OfStr1+"p2s2"+Part2OfStr2);


  // Décommenter pour voir les appels récursifs qui vont être faits :
  // alert("(1):Appels récursifs sur\n"+str1+"==>"+Part1OfStr1+"\net\n"+str2+"==>"+Part1OfStr2+"\net sur\n"+str1+"==>"+Part2OfStr1+"\net\n"+str2+"==>"+Part2OfStr2);


  var path_tmp="";
  if (Part1OfStr1.length != 0 ) {//&& Part1OfStr2.length != 0) {
    var rajout = divide_conquer_bis(Part1OfStr1, Part1OfStr2);
    //alert("(1) "+str1+" et "+str2+" me donnent : "+rajout);
    path_tmp += rajout;
  } else { // We have to add the first part of str2 to the second part so that it is treated !

    Part2OfStr2 = Part1OfStr2+Part2OfStr2; 
    //alert(Part2OfStr2);
    //rajout = "";
    //for (var i = 0 ; i < Part1OfStr2.length ; i++) {
    // rajout += "+"; 
    //}
    ////alert("(1) ragout ? "+rajout);
    // path_tmp += rajout;
  }
  //alert("(2):Appels récursifs sur\n"+str1+"==>"+Part1OfStr1+"\net\n"+str2+"==>"+Part1OfStr2+"\net sur\n"+str1+"==>"+Part2OfStr1+"\net\n"+str2+"==>"+Part2OfStr2);

  if (Part2OfStr1.length != 0  ) {//&& Part2OfStr2.length != 0) {


    var rajout = divide_conquer_bis(Part2OfStr1, Part2OfStr2);
    //alert("(2) "+str1+" et "+str2+" me donnent : "+rajout);
    path_tmp += rajout;
  } else {
    rajout = "";
    for (var i = 0; i < Part2OfStr2.length; i++) {
      rajout += "+";
    }
    //alert("(2) ragout ? "+rajout);

    path_tmp += rajout;
  }
  return path_tmp;
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