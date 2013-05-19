# 

[![Build Status](https://travis-ci.org/spjoe/specializedSet.png?branch=master)](https://travis-ci.org/spjoe/)
[![Coverage Status](https://coveralls.io/repos/spjoe/specializedSet/badge.png?branch=master)](https://coveralls.io/r/spjoe/)
[![Dependency Status](https://gemnasium.com/spjoe/specializedSet.png)](https://gemnasium.com/spjoe/)

## Introduction

This lib provides a set that uses a binary tree as data structure. If you are able to hash all or object use a hash set instead, it is faster! If not and you can provide a complete lesser and equality function for your objects you can use this set. 

Speed Comparison for insert, find, remove;
HashSet is O(1)
BinaryTree is O(log(n))
Array is O(n)

## Installation

    $ npm install specialized-set

## Usage
```js
var equalityFunction = function(a,b){return a == b};
var lesserFunction = function(a,b){return a < b};
var SpecializedSet = require('../')(equalityFunction, lesserFunction);

var set1 = new SpecializedSet(['a', 'd','c','c']);
var set2 = new SpecializedSet(['b','d','e']);

set1.add('x');
set1.values(); // ['a','c','d','x'];

set1.minus(new SpecializedSet(['x']))
set1.values(); // ['a','c','d'];
// or
SpecializedSet.minus(set1, new SpecializedSet(['x']))
set1.values(); // ['a','c','d'];

set1.union(set2).values(); // ['a','b','c','d','e'] 
// or
SpecializedSet.union(set1, set2).values(); // ['a','b','c','d','e'] 

set1.intersect(set2).values(); // ['d'] 
// or
SpecializedSet.intersect(set1, set2).values(); // ['d'] 

set1.equals(set2); // false
// or
SpecializedSet.equals(set1, set2)// false

set1.equals(new SpecializedSet(['a', 'd','c'])); // true
```

## License

  LGPLv3

