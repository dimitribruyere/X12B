var arrow_array;

function approx_classic(str1, str2, k)
{
  k = parseInt(k);
  if(k<0)
    return "Size error";
  
  console.log("Size = "+k);
  var l1 = str1.length+1;
  var l2 = str2.length+1;
  
  if(l1<l2)
  {
    l1 += l2;
    l2 = l1-l2;
    l1 = l1-l2; 
  }
  
  //Initialisation, filling by -1 and the 0 layer
  var matrix = init_matrix(l1,l2);
  arrow_array = init_matrix(l1,l2);
  matrix = diag_fill(matrix,l1,l2,k,str1,str2);

  display_matrix(matrix);
  displayClassic(str1, str2, l1, l2, matrix, arrow_array);
  return matrix[l1-1][l2-1];
}

function init_matrix(l1,l2)
{
  //Matrix initialisation
  var matrix = new Array(l1);
  for(var i=0; i<l1; i++)
  {
    matrix[i] = new Array(l2);
    for(var j=0; j<l2; j++)
    {
      if(j==0 || i==0)
        matrix[i][j] = i+j; //Set the extremity of the array
      else
        matrix[i][j] = -1;  
    }
  }
  return matrix;
}

function diag_fill(matrix,X2,Y2,k,str1,str2)
{
  var X = 0;
  var Y = 0;
  var M = Y2/X2;
  var error = -0.5;
  for(X=0; X<X2; X++)
  {
    //We extends the diagonal
    matrix = k_extend(X,Y,k,matrix,str1,str2);
   
      console.log("X="+X+" Y="+Y);
   
    error += M;
    if(error >= 0)
    {
      Y++;
      error--;   
    }
  }
  return matrix;
}

function display_matrix(matrix)
{
  for(var i=0; i<matrix.length; i++)
    console.log(matrix[i]+"\n");
}

function k_extend(X,Y,k,matrix,str1,str2)
{
  for(var i=Y-k; i<Y+k+1; i++)
  {
    if(i>0 && i<matrix[1].length)
      dynamic_prog(X,i,matrix,str1,str2);
  }
  return matrix;
}


function dynamic_prog(X,Y,matrix,str1,str2)
{
  if(X==0)
    return matrix;
  var haut = Number.MAX_SAFE_INTEGER;
  var gauche = Number.MAX_SAFE_INTEGER;
  var hautgauche = Number.MAX_SAFE_INTEGER;
    if(matrix[X-1] !== undefined)
    {
      if(matrix[X-1][Y] != -1)
        haut = matrix[X-1][Y]+1;
    } 
    if(matrix[X] !== undefined)
    {
      if(matrix[X][Y-1] != -1)
        var gauche = matrix[X][Y-1]+1;
    }
    if(matrix[X-1] !== undefined)
    {
        if(matrix[X-1][Y-1]!= -1)
        {
          if (str1.charAt(X-1) == str2.charAt(Y-1)) //If the 2 letter are the same, we wont add the cost of this computation
          {
            var hautgauche = matrix[X-1][Y-1];
          } else
          {
            var hautgauche = matrix[X-1][Y-1]+1;
          }
        }

     }
     
      
      
      var min = Math.min(haut, (Math.min(gauche, hautgauche))); //We take the minimun between the cell above, the cell on the left and the cell on the top left
      matrix[X][Y] = min; 

       if (min == hautgauche)   //Here we fill the arrow array to know the path
      {
        arrow_array[X][Y]='D';
      } else if (min == gauche)
      {
        arrow_array[X][Y]='H';
      } else
      {
        arrow_array[X][Y]='G';
      }
      return matrix;
}