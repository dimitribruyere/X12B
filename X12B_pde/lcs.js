function lcs(ch1, ch2)
{
  var n = ch1.length-1;
  var m = ch2.length-1;
  if (ch1==="" || ch2==="")
  {
    return 0;
  }   

  if (ch1.charAt(n) === ch2.charAt(m))
  {
    return (1+lcs(ch1.substr(0, n), ch2.substr(0, m)));
  } else {
    return max(lcs(ch1.substr(0, n+1), ch2.substr(0, m)), lcs(ch1.substr(0, n), ch2.substr(0, m+1)));
  }
}