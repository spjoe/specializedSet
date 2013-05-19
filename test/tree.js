var Tree = require('../lib/tree');
var eqFn = function(a,b){return a == b};
var lesserFn = function(a,b){return a < b};

describe('Tree', function () {
	it('should add two values in correct order', function () {
		var t = new Tree(eqFn, lesserFn);
		t.Add(5);
		t.Add(3);
		var array = t.InOrderTravers();
		array.length.should.eql(2);
	});

	it('should find added values', function () {
		var t = new Tree(eqFn, lesserFn);
		t.Add(5);
		t.Add(3);
		t.Find(3).should.eql(true);
		t.Find(5).should.eql(true);
	});

	it('should remove item with two child elements', function () {
		var t = new Tree(eqFn, lesserFn);
		t.Add(5);
		t.Add(3);
		t.Add(10);
		t.Add(7);
		t.Add(13);
		t.Remove(10);
		var array = t.InOrderTravers();
		array.should.eql([3,5,7,13]);
	});

	it('should remove item with one child elements', function () {
		var t = new Tree(eqFn, lesserFn);
		t.Add(5);
		t.Add(3);
		t.Add(10);
		t.Add(7);
		t.Remove(10);
		var array = t.InOrderTravers();
		array.should.eql([3,5,7]);
	});

	it('should remove item with no child elements', function () {
		var t = new Tree(eqFn, lesserFn);
		t.Add(5);
		t.Add(3);
		t.Add(10);
		t.Remove(10);
		var array = t.InOrderTravers();
		array.should.eql([3,5]);
	});

	it('should remove root node', function () {
		var t = new Tree(eqFn, lesserFn);
		t.Add(5);
		t.Add(3);
		t.Add(10);
		t.Add(7);
		t.Add(13);
		t.Remove(5);
		var array = t.InOrderTravers();
		array.should.eql([3,7,10,13]);
	});
});