function approx_greedy(str1, str2)
{
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