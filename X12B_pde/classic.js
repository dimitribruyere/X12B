function classic(str1, str2)
{
  var length1 = str1.length + 1;
  var length2 = str2.length + 1;
  //array contains the weight matrix
  var array = new Array(length1);
  //arrowarray contains the arrow matrix
  var arrowarray = new Array(length1);
  //disparray contains array to string
  var disparray = "\b"+str2+"<br>";

  for( var i = 0; i < length1; i++)
  {
    array[i] = new Array(length2); //The array has now 2 dimension
    arrowarray[i] = new Array(length2);
  }
 
  for( var i = 0; i < length1; i++)
  {
    for(var j = 0; j < length2; j ++)
      {
        if(j==0|| i==0)
        {
          array[i][j] = i+j; //Set the extremity of the array
        }
        else
        {
          array[i][j] = 0; //The other part is set to 0
        }
      }

  }
  
  return dynamicprog(str1,str2,length1,length2,disparray,array,arrowarray);
}

function dispArray(str1,str2,length1,length2,disparray,array,arrowarray)
{
 for(i = 0; i < length1; i ++ )
  {

    for(j = 0; j < length2; j ++)
    {
       disparray = disparray + array[i][j] + ' ';
    }
    disparray += "<br>";
  }
  
  disparray += "<br>";
}

function dispArrowarray(str1,str2,length1,length2,disparray,array,arrowarray)
{
 for(i = 1; i < length1; i ++ )
  {
    for(j = 1; j < length2; j ++)
    {
       disparray = disparray + arrowarray[i][j] + ' ';
    }
    disparray += "<br>";
  }
  
  disparray += "<br>";
}

function dynamicprog(str1,str2,length1,length2,disparray,array,arrowarray)
{
  for(var i = 1;i < length1; i++)
  {
    for(var j = 1; j < length2; j++)
    {
      var haut = array[i-1][j]+1;
      
      var gauche = array[i][j-1]+1;
           
      if (str1.charAt(i-1) == str2.charAt(j-1)) //If the 2 letter are the same, we wont add the cost of this computation
      {
        var last = array[i-1][j-1];
      }
      else
      {
        var last = array[i-1][j-1]+1;
      }
      var min = Math.min(haut,(Math.min(gauche,last))); //We take the minimun between the upper case, left case and upper left case
      array[i][j] = min; 
        
      if(min == haut)   //This part deserve to fulfill the arrow array to allow backtracking if we want to know the path
      {
        arrowarray[i][j]='H'; 
      }
      else if(min == gauche)
      {
        arrowarray[i][j]='G';
      }
      else
      {
        arrowarray[i][j]='D';
      }
    }
  }
  return array[length1-1][length2-1];  //We return the last element visited, which is the cost of the ED
}