function approx_greedy(str1, str2)
{
  //On regarde chaque caractère un à un, si ils sont les mêmes on ne fait rien, sinon on remplace celui du plus court. Enfin, on additionne la différence de longueur des deux
  var sum = 0;
  for(var i = 0; i < Math.min(str1.length,str2.length);i++)
  {
    if(str1.charAt(i)!=str2.charAt(i))
    {
      sum ++;
    }
  }
  sum += Math.abs(str1.length-str2.length);
  return sum;
}
