function rec(ch1, ch2)
{
  var pertinent = {'length' : 0,'trace' : ""};
  var finaltrucmuche = recurrence(ch1,ch2,ch1.length,ch2.length,pertinent);
  console.log(finaltrucmuche['trace']);
  return finaltrucmuche['length'];
}

function recurrence(ch1,ch2,length1,length2,pertinent)
{
  if(length1==0){ //If we have no more letter, we add what's left
    var add= pertinent['trace'];
    for(var i = 0; i < length2 ; i++)
    {
      add+="+";
    }
    return {'length' : pertinent['length']+length2,'trace' : add};
  }
  if(length2==0)
  { 
    var add= pertinent['trace'];
    for(var i = 0; i < length2 ; i++)
    {
      add+="-";
    }
    return {'length' : pertinent['length']+length1,'trace' : add};
  }
    
 /* if(ch1.charAt(length1-1)==ch2.charAt(length2-1)) //If the letter are the same, the cost doesn't change
  { 
    var add = pertinent['trace'] + "0";
    return recurrence(ch1,ch2,length1-1,length2-1,{'length' : pertinent['length'],'trace' : add});
  }
  else{ */ 
    
    var pertinent1 = recurrence(ch1,ch2,length1-1,length2,pertinent);
    var pertinent2 = recurrence(ch1,ch2,length1,length2-1,pertinent);
    var pertinent3 = recurrence(ch1,ch2,length1-1,length2-1,pertinent);
    if(ch1.charAt(length1-1)==ch2.charAt(length2-1))
    {
      pertinent3['length']-=1;
    }
    var mini = min(
                    min(pertinent1['length'],pertinent2['length']),
                    pertinent3['length']);
    var add = "";

    if(mini == pertinent1['length'])
    { 
      add = pertinent1['trace'];
      add +="+";
    }
    else if(mini == pertinent2['length'])
    {
      add = pertinent2['trace'];
      add +="-"; 
    }
     else if(mini == pertinent3['length'])
    {
      add = pertinent3['trace'];
      if(ch1.charAt(length1-1)==ch2.charAt(length2-1))
      {
        add+="0";
      }
      else{
        add +="S";
      }
    }
     return {'length' : mini + 1,'trace' : add};
  //}  
}