var Set = require('../')(function(a, b) {return a == b}, function(a,b){return a < b});
var SetOther = require('../')(function(a, b) {return a.is(b)}, function(a,b){return a < b});

describe('Set', function () {
	it('should not add same values twice', function () {
		var s = new Set();
		s.add(4);
		s.add(4);
		s.size.should.eql(1);
	});
	it('should support delete', function () {
		var s = new Set([2]);
		s.delete(2);
		s.size.should.eql(0);
		s.delete(2);
		s.size.should.eql(0);
	});
	it('should support equals', function () {
		var a = new Set([1, 2]);
		var b = new Set([1, 2, 3]);
		a.equals(b).should.be.false;
		b.delete(3);
		a.equals(b).should.be.true;
	});
	it('should support union', function () {
		var a = new Set([1, 2, 3]);
		var b = new Set([1, 2, 4]);
		var u = a.union(b);
		u.size.should.eql(4);
	});
	it('should support intersect', function () {
		var a = new Set([1, 2, 3]);
		var b = new Set([1, 2, 4]);
		var i = a.intersect(b);
		i.size.should.eql(2);
		i.has(4).should.be.false;
		i.has(3).should.be.false;
	});
	it('should support minus', function () {
		var a = new Set([1, 2]);
		var b = new Set([2]);
		var m = a.minus(b);
		m.size.should.eql(1);
		m.has(2).should.be.false;
	});
	it('should throw error when used other set type', function () {
		var s = new Set();
		s.union.should.throw();
		s.intersect.should.throw();
		s.minus.should.throw();
	});
});