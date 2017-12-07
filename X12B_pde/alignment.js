function alignmentDisplay(str1, str2, alignmentCoding) {
  document.getElementById("alignement").innerHTML = "<p id='str1'> TTT</p> <p id='algnmt'> DDDD</p> <p id='str2'> CCC</p>";
  var firstStr = "";
  var scndStr  = "";
  var alignStr = "";
  var idxStr1 = 0;
  var idxStr2 = 0;
  for (var i = 0; i < alignmentCoding.length; i++ ) {
    var sw = alignmentCoding.charAt(i);
    switch (sw) {
    case '+':
      firstStr+="<span style='width:2em;display:inline-block; color:chartreuse; height : 1em;'>+</span>";
      scndStr+="<span style='width:2em;display:inline-block;height : 1.5em;'>"+str2.charAt(idxStr2)+"</span>";
      alignStr+="<span style='width:2em;display:inline-block;height : 1em;'> </span>";
      idxStr2++;
      break;
    case '-':
      scndStr+="<span style='width:2em;display:inline-block;color:chartreuse;height : 1.5em;'>+</span>";
      firstStr+="<span style='width:2em;display:inline-block;height : 1em;'>"+str1.charAt(idxStr1)+"</span>";
      alignStr+="<span style='width:2em;display:inline-block;height : 1em;'> </span>";

      idxStr1++;
      break;
    case 'S':
      firstStr+="<span style='width:2em;display:inline-block;height : 1em;'>"+str1.charAt(idxStr1)+"</span>";
      scndStr+="<span style='width:2em;display:inline-block;height : 1.5em;'>"+str2.charAt(idxStr2)+"</span>";
      if (str1.charAt(idxStr1) === str2.charAt(idxStr2)) {
        alignStr+="<span style='width:2em;display:inline-block;color:chartreuse;height : 1em;'> </span>";
      } else{
         alignStr+="<span style='width:2em;display:inline-block;color:chartreuse;height : 1em;'>S</span>";
      }
      idxStr1++;
      idxStr2++;
      break;
    default:
      break;
    }
  }


  document.getElementById("str1").innerHTML=firstStr;
  document.getElementById("algnmt").innerHTML=alignStr;
  document.getElementById("str2").innerHTML=scndStr;
  console.log("working");
}
