# 

[![Build Status](https://travis-ci.org/spjoe/specializedSet.png?branch=master)](https://travis-ci.org/spjoe/)
[![Coverage Status](https://coveralls.io/repos/spjoe/specializedSet/badge.png?branch=master)](https://coveralls.io/r/spjoe/)
[![Dependency Status](https://gemnasium.com/spjoe/specializedSet.png)](https://gemnasium.com/spjoe/)
## Introduction

	Uses a binary tree for so you have a faster impl of a set when you don not have a hash function for your objects. When you have hashes use Hashset!

	You have to define a complete lesser and equality fn.

## Installation

    $ npm install 

## Usage
```js
var equalityFunction = function(a,b){return a == b};
var lesserFunction = function(a,b){return a < b};
var Set = require('../')(equalityFunction, lesserFunction);

var set1 = new Set(['a', 'd','c','c']);
var set2 = new Set(['b','d','e']);

set1.add('x');
set1.values(); // ['a','c','d','x'];

set1.minus(new Set(['x']))
set1.values(); // ['a','c','d'];
// or
Set.minus(set1, new Set(['x']))
set1.values(); // ['a','c','d'];

set1.union(set2).values(); // ['a','b','c','d','e'] 
// or
Set.union(set1, set2).values(); // ['a','b','c','d','e'] 

set1.intersect(set2).values(); // ['d'] 
// or
Set.intersect(set1, set2).values(); // ['d'] 

set1.equals(set2); // false
// or
Set.equals(set1, set2)// false

set1.equals(new Set(['a', 'd','c'])); // true
```

## License

  LGPLv3

