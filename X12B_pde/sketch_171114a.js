var str1 = "azced";
var str2 = "abcdef";
var length1 = str1.length + 1;
var length2 = str2.length + 1;
var array = new Array(length1);
var arrowarray = new Array(length1);
var disparray = "\b"+str2+"<br>";
function setup() {
setarray();
  
}

function draw() {
  
  
  document.getElementById("reponse").innerHTML = disparray;
}

function setarray ()
{
  for( var i = 0; i < length1; i++)
    {
      array[i] = new Array(length2);
      arrowarray[i] = new Array(length2+1);
    }
   
    for( var i = 0; i < length1; i++)
    {
      for(j = 0; j < length2; j ++)
        {
          if(j==0|| i==0)
          {
            array[i][j] = i+j;
          }
          else
          {
            array[i][j] = 0;
          }
        }

    }  
  dispArray();  
  dynamicprog();
  dispArray();
  dispArrowarray();
}

function dispArray()
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

function dispArrowarray()
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

function dynamicprog()
{
  for(var i = 1;i < length1; i++)
  {
    for(var j = 1; j < length2; j++)
    {
      var haut = array[i-1][j]+1;
      
      var gauche = array[i][j-1]+1;
           
      if (str1.charAt(i-1) == str2.charAt(j-1))
      {
        var last = array[i-1][j-1];
      }
      else
      {
        var last = array[i-1][j-1]+1;
      }
      var min = Math.min(haut,(Math.min(gauche,last)));
      array[i][j]=Math.min(haut,(Math.min(gauche,last)));  
      if(min == haut)
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
  
}