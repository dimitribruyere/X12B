function approx_greedy(str1, str2)
{
  //On regarde chaque caractère un à un, si ils sont les mêmes on ne fait rien, sinon on remplace celui du plus court. Enfin, on additionne la différence de longueur des deux
  var ed = 0;
  var path = "";
  for(var i = 0; i < Math.min(str1.length,str2.length);i++)
  {
    path+='S';
    if(str1.charAt(i)!=str2.charAt(i))
    {
      ed ++;
    }
  }
  ed += Math.abs(str1.length-str2.length);
  if (str1.length > str2.length)
  {
    for (i=str2.length; i<str1.length; i++)
    {
      path+='-';
    }
  }
  else
  {
    for (i=str1.length; i<str2.length; i++)
    {
      path+='+';
    }
  }
  return { "ed" : ed, "path" : path};
}
