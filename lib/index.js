
var exports = module.exports = setFrameWork;

var tree = require('./tree');

function setFrameWork(equalityFunction, lesserFunction) {
	var set = function (init) { return new Set(equalityFunction, lesserFunction, init) };

	set.intersect = function(a,b){
		var a = typeof a !== 'undefined' ? a : b;
		var b = typeof b !== 'undefined' ? b : a;
		return a.intersect(b);
	};

	set.union = function(a,b){
		var a = typeof a !== 'undefined' ? a : new Set(equalityFunction, lesserFunction);
		var b = typeof b !== 'undefined' ? b : new Set(equalityFunction, lesserFunction);
		return a.union(b);
	};

	set.minus = function(a,b){
		var a = typeof a !== 'undefined' ? a : new Set(equalityFunction, lesserFunction);
		var b = typeof b !== 'undefined' ? b : new Set(equalityFunction, lesserFunction);
		return a.minus(b);
	};

	set.equals = function(a,b){
		var a = typeof a !== 'undefined' ? a : new Set(equalityFunction, lesserFunction);
		var b = typeof b !== 'undefined' ? b : new Set(equalityFunction, lesserFunction);
		return a.equals(b);
	};

	return set;
};

function Set(equalityFunction, lesserFunction, elements) {
	this._equality = equalityFunction;
	this._lesser = lesserFunction;

	this._data = new tree(equalityFunction, lesserFunction);
	if (Array.isArray(elements))
		elements.forEach(this.add.bind(this));
	else if (elements instanceof Set)
		elements.values().forEach(this.add.bind(this));
};

Set.prototype._unionFunction = function(a, b) {
	if (!a && b)
		return new Set(this._equality, this._lesser, b);
	var s = new Set(this._equality, this._lesser, a);
	if (b)
		b.values().forEach(s.add.bind(s));
	return s;
};

Set.prototype._intersectFunction = function(a, b) {
	if (!a && b)
		return new Set(this._equality, this._lesser, b);
	if (!b && a)
		return new Set(this._equality, this._lesser, a);
	var s = new Set(this._equality, this._lesser);
	a.values().forEach(function (val) {
		if (b.has(val))
			s.add(val);
	});
	return s;
};

Set.prototype._equalsFunction = function (a, b) {
	if (a.size != b.size)
		return false;
	return a.values().every(function (val) {
		return b.has(val);
	});
};

Set.prototype._minusFunction = function (a, b) {
	var s = new Set(this._equality, this._lesser, a);
	b.values().forEach(s.delete.bind(s));
	return s;
};

Set.prototype.union = function(set) {
	if (this._equality === set._equality && this._lesser === set._lesser) {
		return this._unionFunction(this, set);
	}else{
		throw new Error("only set from the same set framework are supported");
	}
};

Set.prototype.intersect = function(set) {
	if (this._equality === set._equality && this._lesser === set._lesser) {
		return this._intersectFunction(this, set);
	}else{
		throw new Error("only set from the same set framework are supported");
	}
};

Set.prototype.minus = function(set) {
	if (this._equality === set._equality && this._lesser === set._lesser) {
		return this._minusFunction(this, set);
	}else{
		throw new Error("only set from the same set framework are supported");
	}
};

Set.prototype.equals = function(set) {
	if (this._equality === set._equality && this._lesser === set._lesser) {
		return this._equalsFunction(this, set);
	}else{
		throw new Error("only set from the same set framework are supported");
	}
};

Set.prototype.intersect = function(set) {
	if (this._equality === set._equality && this._lesser === set._lesser) {
		return this._intersectFunction(this, set);
	}else{
		throw new Error("only set from the same set framework are supported");
	}
};

Set.prototype.has = function(value) {
	return this._data.find(value);
};

Set.prototype.values = function(){
	return this._data.inOrderTraverse();
};

Set.prototype.delete = function(value){
	this._data.remove(value);
};	

Set.prototype.add = function (value) {
	if (this._data.find(value) == false) {
		this._data.add(value);
	}
};

Object.defineProperty(Set.prototype, 'size', {
	enumerable: false,
	configurable: false,
	get: function () {
		return this.values().length;
	}
});	
