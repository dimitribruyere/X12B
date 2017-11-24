
function classic(str1, str2)
{

  var length1 = str1.length + 1;
  var length2 = str2.length + 1;
  //array contains the weight matrix
  var array = new Array(length1);
  //arrowarray contains the arrow matrix
  var arrowarray = new Array(length1);


  for ( var i = 0; i < length1; i++)
  {
    array[i] = new Array(length2); //The array has now 2 dimension
    arrowarray[i] = new Array(length2);
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

  return dynamicprog(str1, str2, length1, length2, array, arrowarray);
}

function dynamicprog(str1, str2, length1, length2, array, arrowarray)
{
  for (var i = 1; i < length1; i++)
  {
    for (var j = 1; j < length2; j++)
    {
      var haut = array[i-1][j]+1;

      var gauche = array[i][j-1]+1;

      if (str1.charAt(i-1) == str2.charAt(j-1)) //If the 2 letter are the same, we wont add the cost of this computation
      {
        var last = array[i-1][j-1];
      } else
      {
        var last = array[i-1][j-1]+1;
      }
      var min = Math.min(haut, (Math.min(gauche, last))); //We take the minimun between the cell above, the cell on the left and the cell on the top left
      array[i][j] = min; 

      if (min == haut)   //Here we fill the arrow array to know the path
      {
        arrowarray[i][j]='H';
      } else if (min == gauche)
      {
        arrowarray[i][j]='G';
      } else
      {
        arrowarray[i][j]='D';
      }
    }
  }

  displayClassic(str1, str2, length1, length2, array, arrowarray);
  return array[length1-1][length2-1];  //We return the last element visited, which is the cost of the ED
}

function displayClassic(str1, str2, length1, length2, array, arrowarray) {
  textSize(30);

  displaystr1(str1, length1);
  displaystr2(str2, length2);

  //text(str2, 10, 100);

  for (var i = 0; i < length1; i++) {
    for (var j = 0; j < length2; j++) {
      text(""+array[i][j], i*100+100, j*100+100);
    }
  }
  for (var i = 1; i < length1; i++) {
    for (var j = 1; j < length2; j++) {
      //text version :
      //text(""+arrowarray[i][j], i*100+125, j*100+125);
      //arrow version :
      displayArrow(arrowarray[i][j], i*100+125, j*100+125);
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
  switch(direction) {
  case 'G':
    line(x-95, y, x-35, y);
    break;
  case 'H':
    line(x-15, y-80, x-15, y-20);
    break;
  case 'D':
    line(x-95, y-80, x-35, y-20);
    break;
  }
}

