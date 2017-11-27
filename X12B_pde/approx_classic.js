function approx_classic(str1, str2, k)
{
  console.log(k)
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
  
  matrix = diag_fill(matrix,l1,l2,k);

  display_matrix(matrix);
  
  return "Coucou clément";
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

function diag_fill(matrix,X2,Y2,k)
{
  var X = 0;
  var Y = 0;
  var M = Y2/X2;
  var error = -0.5;
  for(X=0; X<X2; X++)
  {
    //We extends the diagonal
    matrix = k_extend(X,Y,k,matrix);
   
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

function k_extend(X,Y,k,matrix)
{
  
  for(var i=Y-k; i<Y+k; i++)
  {
    if(i>0 && i<matrix[1].length)
      matrix[X][i] = 0;
  }
  return matrix;
}