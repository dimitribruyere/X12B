var best_ed_so_far
var best_path_so_far

function branch_bound(str1, str2) 
{
    var timerStart = new Date();
    best_ed_so_far = Number.MAX_SAFE_INTEGER; //We initialize the best solution each time we call the algo
    best_path_so_far = "";
    branch_bound_bis(str1, str2, 0, ""); //On the first call of the recursion we take both strings and edit distance of 0
    var timerEnd = new Date();
    var computationTime = timerEnd - timerStart;
    return { "ed" : best_ed_so_far, "path" : best_path_so_far, "time" : computationTime};
}

function branch_bound_bis(str1, str2, ed, path)
{
    // If any of the two strings is empty, then we stop the recursion in this branch and update the best solution found so far, if it's better
    if (str1 === "") 
    { 
        final_ed_in_this_branch = ed + str2.length;
        if (final_ed_in_this_branch < best_ed_so_far)
        {
            best_ed_so_far = final_ed_in_this_branch;
            for (i=0; i<str2.length; i++)
            {
                path+='+';
            }
            best_path_so_far = path;
        }
        return;
    }
    if (str2 === "")
    {
        final_ed_in_this_branch = ed + str1.length;
        if (final_ed_in_this_branch < best_ed_so_far)
        {
            best_ed_so_far = final_ed_in_this_branch;
            for (i=0; i<str1.length; i++)
            {
                path+='-';
            }
            best_path_so_far = path;
        }
        return;
    }

    // Else we need to compute the heuristic, which is the best ED possible (optimistic) 

    var heuristic = Math.abs(str1.length - str2.length);
    
    // If even with the optimistic heuristic we won't improve our solution, we stop the recursion

    if ((ed + heuristic) >= best_ed_so_far )
        return;

    var new_str1 = str1.substr(1,str1.length-1);
    var new_str2 = str2.substr(1,str2.length-1);

    // Else, we have to check if the two strings have the same first character

    if (str1.charAt(0) === str2.charAt(0)) 
    {
        var path_sub = path+='S';
        branch_bound_bis(new_str1, new_str2, ed, path_sub);
    }

    // Else, we have to recursively call with the 3 possibilities, (substitution, deletion, insertion)

    else
    {
        var path_add = path+'+';
        var path_sub = path+'S';
        var path_rem = path+'-';
        branch_bound_bis(new_str1, str2, ed+1, path_rem);
        branch_bound_bis(new_str1, new_str2, ed+1, path_sub);
        branch_bound_bis(str1, new_str2, ed+1, path_add);
        
    }
}