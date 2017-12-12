
function classic(str1, str2)
{

  var length1 = str1.length + 1;
  var length2 = str2.length + 1;
  //array contains the weight matrix
  var array = new Array(length1);
  //arrowMatrix contains the arrow matrix
  var arrowMatrix = new Array(length1);


  for ( var i = 0; i < length1; i++)
  {
    array[i] = new Array(length2); //The array has now 2 dimension
    arrowMatrix[i] = new Array(length2);
  }

  for ( var i = 0; i < length1; i++)
  {
    for (var j = 0; j < length2; j ++)
    {
      if (j==0|| i==0)
      {
        array[i][j] = i+j; //Set the extremity of the array
      } else
      {
        array[i][j] = 0; //The other part is set to 0
      }
    }
  }

  return dynamicprog(str1, str2, length1, length2, array, arrowMatrix);
}

function dynamicprog(str1, str2, length1, length2, array, arrowMatrix)
{
  var timerStart = new Date();

  for (var i = 1; i < length1; i++)
  {
    for (var j = 1; j < length2; j++)
    {
      var haut = array[i-1][j]+1;

      var gauche = array[i][j-1]+1;

      if (str1.charAt(i-1) == str2.charAt(j-1)) //If the 2 letter are the same, we wont add the cost of this computation
      {
        var hautgauche = array[i-1][j-1];
      } else
      {
        var hautgauche = array[i-1][j-1]+1;
      }
      var min = Math.min(haut, (Math.min(gauche, hautgauche))); //We take the minimun between the cell above, the cell on the left and the cell on the top left
      array[i][j] = min; 

      if (min == hautgauche)   //Here we fill the arrow array to know the path
      {
        arrowMatrix[i][j]='D';
      } else if (min == gauche)
      {
        arrowMatrix[i][j]='H';
      } else
      {
        arrowMatrix[i][j]='G';
      }
    }
  }


  fillArrowMatrix(arrowMatrix, length1, length2);
  if (customInput) { // Only display the matrix when computing the ED on custom input
    displayClassic(str1, str2, length1, length2, array, arrowMatrix);
  }
  var timerEnd = new Date();
  var computationTime = timerEnd - timerStart;
  return {
    "ed" : array[length1-1][length2-1], //The last element visited, which is the cost of the ED
    "path" : alignmentWithArrowMatrix(arrowMatrix, str1, str2), // The alignment code
    "time" : computationTime
  };  

}

function fillArrowMatrix(arrowMatrix, length1, length2)
{
  for (i=1; i<length1; i++)
  {
    arrowMatrix[i][0]='G';
  }
  for (i=1; i<length2; i++)
  {
    arrowMatrix[0][i]='H';
  }
}

function displayClassic(str1, str2, length1, length2, array, arrowMatrix) {
  textSize(30);

  displaystr1(str1, length1);
  displaystr2(str2, length2);

  //text(str2, 10, 100);

  for (var i = 0; i < length1; i++) {
    for (var j = 0; j < length2; j++) {
      if (array[i][j]!=-1)
        text(""+array[i][j], i*100+100, j*100+100);
      else
        text(".", i*100+100, j*100+100);
    }
  }
  for (var i = 0; i < length1; i++) {
    for (var j = 0; j < length2; j++) {
      //text version :
      //text(""+arrowMatrix[i][j], i*100+125, j*100+125);
      //arrow version :
      displayArrow(arrowMatrix[i][j], i*100+125, j*100+125);
    }
  }
}

function displaystr1(str, len) {
  for (var i = 0; i < len; i ++) {
    text(""+str.charAt(i), i*100+200, 50);
  }
}

function displaystr2(str, len) {
  for (var i = 0; i < len; i ++) {
    text(""+str.charAt(i), 50, i*100+200);
  }
}

function displayArrow(direction, x, y) {
  y-=40;
  push();
  fill(0);

  switch(direction) {
  case 'G':
    line(x-95, y, x-35, y);
    triangle(x-95, y, x-85, y+5, x-85, y-5);
    break;
  case 'H':
    line(x-15, y-80, x-15, y-20);
    triangle(x-15, y-80, x-10, y-70, x-20, y-70);
    break;
  case 'D':
    line(x-95, y-80, x-35, y-20);
    triangle(x-95, y-80, x-85, y-75, x-90, y-70);

    break;
  }
  pop();
}