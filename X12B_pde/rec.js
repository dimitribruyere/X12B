function rec(ch1, ch2)
{
  return recurrence(ch1,ch2,ch1.length,ch2.length);
}


function recurrence(ch1,ch2,length1,length2)
{
  if(length1==0){
    return length2;
  }
  if(length2==0)
  {
    return length1;
  }
    
  if(ch1.charAt(length1-1)==ch2.charAt(length2-1))
  { 
    return recurrence(ch1,ch2,length1-1,length2-1);
  }
  else{  
  return 1 +  min(
                    min(
                          recurrence(ch1,ch2,length1-1,length2),
                          recurrence(ch1,ch2,length1,length2-1)),
                    recurrence(ch1,ch2,length1-1,length2-1));
  }
  
  
}