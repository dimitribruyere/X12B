var best_sol_so_far; 

function branch_bound(str1, str2)
{
  best_sol_so_far = Number.MAX_SAFE_INTEGER ; // we initialize the best_sol each time we call the algo
  branch_bound_bis(str1, str2, 0); // On the first call of the recursion, we take both strings and an edit distance of 0
  return ""+best_sol_so_far;
}

function branch_bound_bis(str1, str2, ed) {
  // If any of the two strings is empty then we stop this recursion and we update the best solution found so far
  if (str1.length === 0 ) {
    best_sol_so_far = ed + str2.length;
    return ;
  } else {
    if (str2.length === 0 ) {
      best_sol_so_far = ed + str1.length;
      return ;
    }
  }
  // else , we need to compute the heuristic, which is the best ED possible (optimistic)
  var h = Math.abs(str1.length - str2.length);
  // if even with the optimistic heuristic we won't improve our solution, we stop the recursion
  if (ed + h >= best_sol_so_far ) {
    return ;
  }
  new_str1 = str1.substr(1, str1.length-1);
  new_str2 = str2.substr(1, str2.length-1);
  
  // else, we have to check if the two strings share a character
  if (str1.charAt(0) === str2.charAt(0)) {
    branch_bound_bis(new_str1, new_str2, ed );
  } else {  // else , we have to recursively call, with the 3 possibilites ( substitution, deletion, insertion )
    branch_bound_bis(new_str1,     str2, ed+1); // deletion
    branch_bound_bis(    str1, new_str2, ed+1); // insertion
    branch_bound_bis(new_str1, new_str2, ed+1); // substitution
  }
}
