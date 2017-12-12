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
- [3. Evalution protocol](#3-evalution-protocol)
- [4. Proteins](#4-proteins)
- [5. Organisation](#5-organisation)

<!-- /TOC -->

## 1. Introduction 

## 2. Algorithms

### 2.1. Classic 

$$O(n+m)^{2}$$

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

### 2.6. Greedy 

## 3. Evalution protocol

## 4. Proteins

## 5. Organisation


