var Node = function (value, parent, left, right) {
    this.value = value;
    this.left = left;
    this.right = right;
    this.parent = parent
};

var exports = module.exports = tree;

function tree(equalityFunction, lesserFunction)
{
	this._root = null;
	this._lesserFunction = lesserFunction;
	this._equalityFunction = equalityFunction; 
};

tree.prototype._find = function(node, value){
	if (!node) {
		return null;
	}

	if (this._equalityFunction(value, node.value)) {
		return node;
	}else{
		if (this._lesserFunction(value, node.value)) {
			return this._find(node.left, value);
		}else{
			return this._find(node.right, value);
		}
	}
};

tree.prototype._insert = function(node, value){
	if (this._lesserFunction(value, node.value)) {
		if (node.left) {
			this._insert(node.left, value);
		}else{
			node.left = new Node(value, node)
		}
	}else{
		if (node.right) {
			this._insert(node.right, value);
		}else{
			node.right = new Node(value, node)
		}
	}
};

tree.prototype._minValue = function(node)
{
    if (!node.left){
          return node.value;
    }else{
          return this._minValue(node.left);
    }
};

tree.prototype._remove = function(value, node, parent){
	if (this._lesserFunction(value, node.value)) {
		if(node.left){
			return this._remove(value, node.left, node);
		}
		else{
			return false;
		}
	}
	else if(this._equalityFunction(value, node.value)){
		if (node.left && node.right) {
			node.value = this._minValue(node.right);
			this._remove(node.value, node.right, node);
		}else if(parent.left === node){
			parent.left = (node.left) ? node.left : node.right;
		}else if(parent.right === node){
			parent.right = (node.left) ? node.left : node.right;
		}
		return true;
	}
	else{
		if (node.right) {
			return this._remove(value, node.right, node);
		}else{
			return false;
		}
	}
};

tree.prototype.add = function(value){		
	if (!this._root) {
		this._root = new Node(value);
	}else{
		this._insert(this._root, value);
	}
};

tree.prototype.find = function(value){
	return this._find(this._root, value) !== null;
};

tree.prototype.remove = function(value){
	if(!this._root){
		return false;
	}else{
		if (this._equalityFunction(value, this._root.value)) {
			tmpNode = new Node(0);
			tmpNode.left = this._root;
			var result = this._remove(value, this._root, tmpNode);
			this._root = tmpNode.left;
			return result;
		}else{
			return this._remove(value, this._root, null);
		}
	}
};


tree.prototype.inOrderTraverse = function(){
	var traversResult = [];
	var _inOrderTraverse = function(node){
		if (!node) {
			return;
		}

		_inOrderTraverse(node.left);
		traversResult.push(node.value);
		_inOrderTraverse(node.right);
	}

	_inOrderTraverse(this._root);
	return traversResult;
};
