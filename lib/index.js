
var exports = module.exports = setFrameWork;

exports.SetFrameWork = setFrameWork;

var tree = require('./tree');

function setFrameWork(equalityFunction, lesserFunction) {
	var set = function(elements) {
		var unionFunction = function(a, b) {
			if (!a && b)
				return new set(b);
			var s = new set(a);
			if (b)
				b.values().forEach(s.add.bind(s));
			return s;
		};

		var intersectFunction = function(a, b) {
			if (!a && b)
				return new set(b);
			if (!b && a)
				return new set(a);
			var s = new set();
			a.values().forEach(function (val) {
				if (b.has(val))
					s.add(val);
			});
			return s;
		};

		var equalsFunction = function (a, b) {
			if (a.size != b.size)
				return false;
			return a.values().every(function (val) {
				return b.has(val);
			});
		};

		var minusFunction = function (a, b) {
			var s = new set(a);
			b.values().forEach(s.delete.bind(s));
			return s;
		};

		this.equality = equalityFunction;
		this.lesser = lesserFunction;

		this._data = new tree(equalityFunction, lesserFunction);
		this.union = function(set) {
			if (this.equality === set.equality && this.lesser === set.lesser) {
				return unionFunction(this, set);
			}else{
				throw new Error("only set from the same set framework are supported");
			}
		};

		this.intersect = function(set) {
			if (this.equality === set.equality && this.lesser === set.lesser) {
				return intersectFunction(this, set);
			}else{
				throw new Error("only set from the same set framework are supported");
			}
		};

		this.minus = function(set) {
			if (this.equality === set.equality && this.lesser === set.lesser) {
				return minusFunction(this, set);
			}else{
				throw new Error("only set from the same set framework are supported");
			}
		};

		this.equals = function(set) {
			if (this.equality === set.equality && this.lesser === set.lesser) {
				return equalsFunction(this, set);
			}else{
				throw new Error("only set from the same set framework are supported");
			}
		};

		this.intersect = function(set) {
			if (this.equality === set.equality && this.lesser === set.lesser) {
				return intersectFunction(this, set);
			}else{
				throw new Error("only set from the same set framework are supported");
			}
		};

		this.has = function(value) {
			return this._data.Find(value);
		};

		this.values = function(){
			return this._data.InOrderTravers();
		};

		this.delete = function(value){
			this._data.Remove(value);
		};

		if (Array.isArray(elements))
			elements.forEach(this.add.bind(this));
		else if (elements instanceof set)
			elements.values().forEach(this.add.bind(this));
	};

	this.Set = set;

	set.intersect = function(a,b){
		var a = typeof a !== 'undefined' ? a : new set();
		var b = typeof b !== 'undefined' ? b : new set();
		return a.intersect(b);
	}

	set.union = function(a,b){
		var a = typeof a !== 'undefined' ? a : new set();
		var b = typeof b !== 'undefined' ? b : new set();
		return a.union(b);
	}

	set.minus = function(a,b){
		var a = typeof a !== 'undefined' ? a : new set();
		var b = typeof b !== 'undefined' ? b : new set();
		return a.minus(b);
	}

	set.equals = function(a,b){
		var a = typeof a !== 'undefined' ? a : new set();
		var b = typeof b !== 'undefined' ? b : new set();
		return a.equals(b);
	}

	set.prototype.add = function (value) {
		if (this._data.Find(value) == false) {
			this._data.Add(value);
		}
	};

	Object.defineProperty(set.prototype, 'size', {
	enumerable: false,
	configurable: false,
	get: function () {
		return this.values().length;
	}
});
};
	
