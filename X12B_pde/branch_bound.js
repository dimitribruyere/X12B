var best_sol_so_far

function branch_bound(str1, str2) 
{
    best_sol_so_far = Number.MAX_SAFE_INTEGER; //We initialize the best solution each time we call the algo
    branch_bound_bis(str1, str2, 0); //On the first call of the recursion we take both strings and edit distance of 0
    return best_sol_so_far;
}

function branch_bound_bis(str1, str2, ed)
{
    // If any of the two strings is empty, then we stop the recursion in this branch and update the best solution found so far, if it's better
    if (str1 === "") 
    { 
        final_ed_in_this_branch = ed + str2.length;
        if (final_ed_in_this_branch < best_sol_so_far)
            best_sol_so_far = final_ed_in_this_branch;
        return;
    }
    if (str2 === "")
    {
        final_ed_in_this_branch = ed + str1.length;
        if (final_ed_in_this_branch < best_sol_so_far)
            best_sol_so_far = final_ed_in_this_branch;
        return;
    }

    // Else we need to compute the heuristic, which is the best ED possible (optimistic) 

    var heuristic = Math.abs(str1.length - str2.length);
    
    // If even with the optimistic heuristic we won't improve our solution, we stop the recursion

    if ((ed + heuristic) >= best_sol_so_far )
        return;

    var new_str1 = str1.substr(1,str1.length-1);
    var new_str2 = str2.substr(1,str2.length-1);

    // Else, we have to check if the two strings have the same first character

    if (str1.charAt(0) === str2.charAt(0)) 
    {
        branch_bound_bis(new_str1, new_str2, ed);
    }

    // Else, we have to recursively call with the 3 possibilities, (substitution, deletion, insertion)

    else
    {
        branch_bound_bis(new_str1, str2, ed+1);
        branch_bound_bis(new_str1, new_str2, ed+1);
        branch_bound_bis(str1, new_str2, ed+1);
        
    }
}