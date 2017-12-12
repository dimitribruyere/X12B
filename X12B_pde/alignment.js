function alignmentDisplay(str1, str2, alignmentCoding) {
    document.getElementById("alignement").innerHTML = "<p id='str1'> TTT</p> <p id='algnmt'> DDDD</p> <p id='str2'> CCC</p>";
    var firstStr = "";
    var scndStr = "";
    var alignStr = "";
    var idxStr1 = 0;
    var idxStr2 = 0;
    for (var i = 0; i < alignmentCoding.length; i++) {
        var sw = alignmentCoding.charAt(i);
        switch (sw) {
            case '+':
                firstStr += "<span style='width:1.5em;display:inline-block;text-align: center; color:chartreuse; height : 1em;'>+</span>";
                scndStr += "<span style='width:1.5em;display:inline-block; text-align: center;height : 1.5em;'>" + str2.charAt(idxStr2) + "</span>";
                alignStr += "<span style='width:1.5em;display:inline-block;text-align: center;height : 1em;'> </span>";
                idxStr2++;
                break;
            case '-':
                scndStr += "<span style='width:1.5em;display:inline-block;text-align: center;color:chartreuse;height : 1.5em;'>+</span>";
                firstStr += "<span style='width:1.5em;display:inline-block;text-align: center;height : 1em;'>" + str1.charAt(idxStr1) + "</span>";
                alignStr += "<span style='width:1.5em;display:inline-block;text-align: center;height : 1em;'> </span>";

                idxStr1++;
                break;
            case 'S':
                firstStr += "<span style='width:1.5em;display:inline-block;text-align: center;height : 1em;'>" + str1.charAt(idxStr1) + "</span>";
                scndStr += "<span style='width:1.5em;display:inline-block;text-align: center;height : 1.5em;'>" + str2.charAt(idxStr2) + "</span>";
                if (str1.charAt(idxStr1) === str2.charAt(idxStr2)) {
                    alignStr += "<span style='width:1.5em;display:inline-block;text-align: center;color:chartreuse;height : 1em;'> </span>";
                } else {
                    alignStr += "<span style='width:1.5em;display:inline-block;text-align: center;color:chartreuse;height : 1em;'>S</span>";
                }
                idxStr1++;
                idxStr2++;
                break;
            default:
                break;
        }
    }


    document.getElementById("str1").innerHTML = firstStr;
    document.getElementById("algnmt").innerHTML = alignStr;
    document.getElementById("str2").innerHTML = scndStr;
}

function alignmentWithArrowMatrix(arrowMatrix, str1, str2) {
    var alignmentArray = [];
    var j = str2.length;
    var i = str1.length;
    var index = 0;
    //console.log(arrowMatrix);

    while (i > 0 || j > 0) {
        if (arrowMatrix[i][j] == 'D') //diagonal
        {
            alignmentArray[index] = 'S';
            i--;
            j--;
        }
        else if (arrowMatrix[i][j] == 'G') {
            alignmentArray[index] = '-';
            i--;
        }
        else if (arrowMatrix[i][j] == 'H') {
            alignmentArray[index] = '+';
            j--;
        }

        index++;
    }

    var newString = reverseArrayToString(alignmentArray);
    return newString;
}

function reverseArrayToString(array) {
    var newString = "";
    for (i = array.length - 1; i >= 0; i--) {
        newString += array[i];
    }
    return newString;
}