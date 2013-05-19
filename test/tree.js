var Tree = require('../lib/tree');
var eqFn = function(a,b){return a == b};
var lesserFn = function(a,b){return a < b};

describe('Tree', function () {
	it('should add two values in correct order', function () {
		var t = new Tree(eqFn, lesserFn);
		t.add(5);
		t.add(3);
		var array = t.inOrderTraverse();
		array.length.should.eql(2);
	});

	it('should find added values', function () {
		var t = new Tree(eqFn, lesserFn);
		t.add(5);
		t.add(3);
		t.find(3).should.eql(true);
		t.find(5).should.eql(true);
	});

	it('should remove item with two child elements', function () {
		var t = new Tree(eqFn, lesserFn);
		t.add(5);
		t.add(3);
		t.add(10);
		t.add(7);
		t.add(13);
		t.remove(10);
		var array = t.inOrderTraverse();
		array.should.eql([3,5,7,13]);
	});

	it('should remove item with one child elements', function () {
		var t = new Tree(eqFn, lesserFn);
		t.add(5);
		t.add(3);
		t.add(10);
		t.add(7);
		t.remove(10);
		var array = t.inOrderTraverse();
		array.should.eql([3,5,7]);
	});

	it('should remove item with no child elements', function () {
		var t = new Tree(eqFn, lesserFn);
		t.add(5);
		t.add(3);
		t.add(10);
		t.remove(10);
		var array = t.inOrderTraverse();
		array.should.eql([3,5]);
	});

	it('should remove root node', function () {
		var t = new Tree(eqFn, lesserFn);
		t.add(5);
		t.add(3);
		t.add(10);
		t.add(7);
		t.add(13);
		t.remove(5);
		var array = t.inOrderTraverse();
		array.should.eql([3,7,10,13]);
	});
});