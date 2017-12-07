function alignmentWithArrowMatrix(arrowMatrix, str1, str2)
{
    var alignmentArray = [];
    var j=str2.length;
    var i=str1.length;
    var index=0;
    console.log(arrowMatrix);
    
    while(i>0 && j>0)
    {
        if (arrowMatrix[i][j]=='D') //diagonal
        {
            alignmentArray[index] = 'S';
            i--;
            j--;
        }
        else if (arrowMatrix[i][j]=='G')
        {
            alignmentArray[index] = '-';
            i--;
        }
        else if (arrowMatrix[i][j]=='H')
        {
            alignmentArray[index] = '+';
            j--;
        }

        index++;
    }


    console.log(alignmentArray);
    var newString = reverseArrayToString(alignmentArray);
    console.log(newString);
    return newString;
}

function reverseArrayToString(array)
{
    var newString = "";
    for(i=array.length-1; i>=0; i--)
    {
        newString += array[i];
    }
    return newString;
}