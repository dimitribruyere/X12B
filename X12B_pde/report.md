### Advanced algorithmics and programming

# Project - Edit distance

* Hugo Thiollière
* Clément Colin
* Christopher Jeamme
* Dimitri Bruyère



## Table of contents

- [1. Introduction](#1-introduction)
- [2. Algorithms](#2-algorithms)
    - [2.1. Classic](#21-classic)
    - [2.2. Pure recursive](#22-pure-recursive)
    - [2.3. Branch and Bound](#23-branch-and-bound)
    - [2.4. Divide and Conquer](#24-divide-and-conquer)
    - [2.5. Classic with approximation](#25-classic-with-approximation)
    - [2.6. Greedy](#26-greedy)
- [3. Evaluation protocol](#3-evalution-protocol)
- [4. Proteins](#4-proteins)
- [5. Organisation](#5-organisation)

<!-- /TOC -->

## 1. Introduction 

For this project, we had to implement algorithms to solve the edit distance problem.
Specifically, we had to implement the follow ones :
* Classic 
* Recursive
* Branch and bound
* Divide and conquer
* An opproximation of the classic
* Greedy

After that, we had to evaluate those algorithm, in order to compare their performance.
This is possible thanks to creation of random strings. Also, we have at our disposition a protein database to process our algorithm.

## 2. Algorithms

### 2.1. Classic 

#### 2.1.1 Functionnement

Basically, we fill a matrix with one string vertically and one horizontally. 

The first line and column are set with increasing number, starting by 0.
Then, we fill the matrix one cell at a time, starting by the top-left one.

To fill a cell, we take the minimum of the upper plus one, the left plus one and the upper-left plus one except if the characters of the column and the line are the same.
In order to get the backtrace (//chris), we fill at the same time another matrix of the same size with the origin of the cell.

Finally, we have the cost of the edit distance by taking the bottom-right cell, and we compute the backtracking thanks to the other matrix.

#### 2.1.2 Complexity

We use and fill a matrix of size of n*m, so the time and space complexity  :

$$O(n*m)$$

### 2.2. Pure recursive

#### 2.2.1 Functionnement

The functionnement of this algorithm is simple. For each reccurrence, if the first letter of both strings are the same, we call the algorithm with the first letter deleted in both string, else we add 1 to the edit distance and we add the minimum of the three calls with the suppression, the substitution and the addition. If one of the strings is empty, we return the remainder of the second string in the edit distance.

#### 2.2.2 Complexity

$$O(3^{max\{n,m\}})$$

### 2.3. Branch and Bound

#### 2.3.1 Functionnement

The branch and bound algorithm is base on the same principle than the pure recursive algorithm. The difference is that when we have found a solution, we explore a branch only if we have the chance of getting a better solution. For that, we use an heuristic. At each call, the heuristic is egal to the different of letters between the 2 strings (because it will be the edit distance minimal if maximum of letters match). If the sum of the path we used to get the current node plus the heuristic is not smaller than the solution we found so far, we stop exploring the banch. It is thus an optimistic heuristic.  

#### 2.3.2 Complexity

The complexity of this algorithm depends of the time when we found the solution. 
If the solution is found fastly and the heuristic permits to stop the exploration of many branch, the algorithm will be efficient. Else, we could need the entire exploration of the tree and so the complexity will be equals to the pure recursive once.


### 2.4. Divide and Conquer

### 2.5. Classic with approximation

#### 2.5.1 Functionnement

This algorithm looks like the classic one, but it has an additional feature.
In order to save time and space, we will only explore a diagonal set with the Bresenham algorithm.
We can extend this diagonal by a factor K if we want to.
But this gain of space and time have a cost: the edit distance found is not the optimal, since we don't explore all the path possible for a small K.

#### 2.5.2 Time and space complexity

Since we still use a matrix of size of n*m, and we explore it all on the worst case, i.e, with a big K, the time and space complexity are the same that the classic algorithm.
Of course, with a pertinent K, we save some space and time.


$$O(n*m)$$

### 2.6. Greedy 

#### 2.6.1 Functionnement

A greedy algorithm is an algorithm that solve the subproblem the easiest way possible.
To us, we substitute one character at a time until we meet the end of a string. If the two characteres are the same, we don't add this to the cost.
Then, we add to the cost all remaining letter.

We could have also compare the two strings before to obtain the biggest factor between them, to minimise easily the edit distance. But we decide not to implement it because the edit distance is still not an optimal one, and the cost to find the biggest factor can be significative.

#### 2.6.2 Complexity

We only compute the smaller strings, then we add the difference between the string.
So, the time complexity is : 

$$O(n)$$

We need the two words, so the space complexity is : 

$$O(n+m)$$

## 3. Evalution protocol

## 4. Proteins

## 5. Organisation


