function approx_greedy(str1, str2)
{
  //We look at characters one by one. If they are the same, we do nothing, else we substitute the character. Finally, we add the difference of length of the strings.
  var ed = 0;
  var path = "";
  var timerStart = new Date();
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
  var timerEnd = new Date();
  var computationTime = timerEnd - timerStart;
  return { "ed" : ed, "path" : path, "time" : computationTime};
}