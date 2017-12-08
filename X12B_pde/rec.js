function rec(ch1, ch2)
{
  var result = recurrence(ch1,ch2,ch1.length,ch2.length, {'length' : 0,'trace' : ""});
  console.log(result['trace']);
  return result['length'];
}

function recurrence(ch1,ch2,length1,length2,backtrackArray)
{
  if(length1==0){ //If we have no more letter, we operation what's left
    var operation = backtrackArray['trace']; //We add to the trace all add left to do to the string
    for(var i = 0; i < length2 ; i++)
    {
      operation+="+";
    }
    return {'length' : backtrackArray['length']+length2,'trace' : operation}; //We add the length of ch2 to the cost
  }
  if(length2==0)
  { 
    var operation = backtrackArray['trace']; //We add to the trace all substraction left to do to the string
    for(var i = 0; i < length2 ; i++)
    {
      operation+="-";
    }
    return {'length' : backtrackArray['length']+length1,'trace' : operation}; //We add the length of ch2 to the cost
  }

    var temp1 = recurrence(ch1,ch2,length1-1,length2,backtrackArray);
    var temp2 = recurrence(ch1,ch2,length1,length2-1,backtrackArray);
    var temp3 = recurrence(ch1,ch2,length1-1,length2-1,backtrackArray);
    
    if(ch1.charAt(length1-1)==ch2.charAt(length2-1)) 
    {
      temp3['length']-=1;
    }
    //We take the minimum of each operation
    var minimum = min(
                    min(temp1['length'],temp2['length']),
                    temp3['length']);
    
    
    var operation = "";

    if(minimum == temp1['length'])//If the last operation is an addition, we add + to the trace
    { 
      operation = temp1['trace'];
      operation += "+";
    }
    else if(minimum == temp2['length']) ///If the last operation is a substraction, we add - to the trace
    {
      operation = temp2['trace'];
      operation += "-"; 
    }
     else if(minimum == temp3['length']) //If the last operation is a substitution, we add S to the trace
    {
      operation = temp3['trace'];
      operation += "S";
    }
     return {'length' : minimum + 1,'trace' : operation}; //We return the cost we have so far plus one, and the trace
}