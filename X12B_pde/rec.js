function rec(ch1, ch2)
{
  var timerStart = new Date();

  var result = recurrence(ch1,ch2,ch1.length,ch2.length, {'ed' : 0,'path' : ""});
  
  var timerEnd = new Date();
  var computationTime = timerEnd - timerStart;
  result.time = computationTime;
  return result;
}

function recurrence(ch1,ch2,length1,length2,backtrackArray)
{
  if(length1==0){ //If we have no more letter, we operation what's left
    var operation = backtrackArray['path']; //We add to the trace all add left to do to the string
    for(var i = 0; i < length2 ; i++)
    {
      operation+="+";
    }
    return {'ed' : backtrackArray['ed']+length2,'path' : operation}; //We add the length of ch2 to the cost
  }
  if(length2==0)
  { 
    var operation = backtrackArray['path']; //We add to the trace all substraction left to do to the string
    for(var i = 0; i < length1 ; i++)
    {
      operation+="-";
    }
    return {'ed' : backtrackArray['ed']+length1,'path' : operation}; //We add the length of ch2 to the cost
  }

    var temp1 = recurrence(ch1,ch2,length1-1,length2,backtrackArray);
    var temp2 = recurrence(ch1,ch2,length1,length2-1,backtrackArray);
    var temp3 = recurrence(ch1,ch2,length1-1,length2-1,backtrackArray);
    
    if(ch1.charAt(length1-1)==ch2.charAt(length2-1)) 
    {
      temp3['ed']-=1;
    }
    //We take the minimum of each operation
    var minimum = min(
                    min(temp1['ed'],temp2['ed']),
                    temp3['ed']);
    
    
    var operation = "";

    if(minimum == temp1['ed'])//If the last operation is an addition, we add + to the trace
    { 
      operation = temp1['path'];
      operation += "-";
    }
    else if(minimum == temp2['ed']) ///If the last operation is a substraction, we add - to the trace
    {
      operation = temp2['path'];
      operation += "+"; 
    }
     else if(minimum == temp3['ed']) //If the last operation is a substitution, we add S to the trace
    {
      operation = temp3['path'];
      operation += "S";
    }
     return {'ed' : minimum + 1,'path' : operation}; //We return the cost we have so far plus one, and the trace
}