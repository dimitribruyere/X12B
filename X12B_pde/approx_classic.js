var arrow_matrix;

function approx_classic(str1, str2, k) {
    k = parseInt(k);
    if (k < 0)
        return "Size error";

    var l1 = str1.length + 1;
    var l2 = str2.length + 1;

    if (l1 < l2) //If the size of the seconde string is bigger than the first one, we invert the 2 strings
    {
        var strtemp = str1;
        str1 = str2;
        str2 = strtemp;
        l1 += l2;
        l2 = l1 - l2;
        l1 = l1 - l2;
    }

    //Initialisation, filling by -1 and the 0 layer
    var matrix = init_matrix(l1, l2);
    arrow_matrix = init_matrix(l1, l2);
    matrix = diag_fill(matrix, l1, l2, k, str1, str2);

    complete_matrix(matrix, l1,l2);
    //display_matrix(matrix);
    displayClassic(str1, str2, l1, l2, matrix, arrow_matrix);
    return { "ed": matrix[l1 - 1][l2 - 1], "path": alignmentWithArrowMatrix(arrow_matrix, str1, str2) };
}

function init_matrix(l1, l2) {
    //Matrix initialisation
    var matrix = new Array(l1);
    for (var i = 0; i < l1; i++) {
        matrix[i] = new Array(l2);
        for (var j = 0; j < l2; j++) {
            // if (j == 0 || i == 0)
            //     matrix[i][j] = i + j; //Set the extremity of the array
            // else
                matrix[i][j] = -1;
        }
        matrix[0][0] = 0;
    }
    return matrix;
}

function diag_fill(matrix, l1, l2, k, str1, str2) {
    var X = 0;
    var Y = 0;
    var M = (l2-1) / (l1-1);
    var error = -0.5;
    for (X = 0; X < l1; X++) {
        //We extends the diagonal
        matrix = k_extend(X, Y, k, matrix, str1, str2);

        //console.log("X="+X+" Y="+Y);

        error += M;
        if (error >= 0) {
            Y++;
            error--;
        }
    }
    return matrix;
}

function k_extend(X, Y, k, matrix, str1, str2) {
    for (var i = Y - k; i < Y + k + 1; i++) {
        if (i > 0 && i < matrix[1].length)
            dynamic_prog(X, i, matrix, str1, str2);
    }
    return matrix;
}


function dynamic_prog(X, Y, matrix, str1, str2) {
    if (X == 0)
        return matrix;
    var haut = Number.MAX_SAFE_INTEGER;
    var gauche = Number.MAX_SAFE_INTEGER;
    var hautgauche = Number.MAX_SAFE_INTEGER;

    if (matrix[X - 1] !== undefined) {
        if (X-1 == 0)
            matrix[0][Y-1]=Y-1;
        if (matrix[X - 1][Y] != -1)
            haut = matrix[X - 1][Y] + 1;
    }
    if (matrix[X] !== undefined) {
        if (Y-1 == 0)
            matrix[X-1][0]=X-1;
        if (matrix[X][Y - 1] != -1)
            var gauche = matrix[X][Y - 1] + 1;
    }
    if (matrix[X - 1] !== undefined) {
        if (matrix[X - 1][Y - 1] != -1) {
            if (str1.charAt(X - 1) == str2.charAt(Y - 1)) //If the 2 letter are the same, we wont add the cost of this computation
            {
                var hautgauche = matrix[X - 1][Y - 1];
            } else {
                var hautgauche = matrix[X - 1][Y - 1] + 1;
            }
        }

    }

    var min = Math.min(haut, (Math.min(gauche, hautgauche))); //We take the minimun between the cell above, the cell on the left and the cell on the top left
    matrix[X][Y] = min;

    if (min == hautgauche)   //Here we fill the arrow array to know the path
    {
        arrow_matrix[X][Y] = 'D';
    } else if (min == gauche) {
        arrow_matrix[X][Y] = 'H';
    } else {
        arrow_matrix[X][Y] = 'G';
    }
    return matrix;
}

function complete_matrix(ed_matrix, l1, l2)
{
    for (l=1; l<l1; l++)
    {
        if (ed_matrix[l][0] !== -1)
        {
            arrow_matrix[l][0]='G';
        }
    }
    for (c=1; c<l2; c++)
    {
        if (ed_matrix[0][c] !== -1)
        {
            arrow_matrix[0][c]='H';
        }
    }
}