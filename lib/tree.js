//A key-value pair constructor function for internal use
var Node = function (value, parent, left, right) {
    this.value = value;
    this.left = typeof left !== 'undefined' ? left : null;
    this.right = typeof right !== 'undefined' ? right : null;
    this.parent = typeof parent !== 'undefined' ? parent : null;
};

var exports = module.exports = tree;

function tree(equalityFunction, lesserFunction)
{
	var lesserFn = lesserFunction;
	var equalityFn = equalityFunction;
	var root = null;

	var find = function(node, value){

		if (node === null) {
			return null;
		}

		if (equalityFn(value, node.value)) {
			return node;
		}else{
			if (lesserFn(value, node.value)) {
				return find(node.left, value);
			}else{
				return find(node.right, value);
			}
		}
	};

	var insert = function(node, value){
		if (lesserFn(value, node.value)) {
			if (node.left !== null) {
				insert(node.left, value);
			}else{
				node.left = new Node(value, node)
			}
		}else{
			if (node.right !== null) {
				insert(node.right, value);
			}else{
				node.right = new Node(value, node)
			}
		}
	};
	var minValue = function(node)
	{
        if (node.left === null){
              return node.value;
        }else{
              return minValue(node.left);
        }
	}

	var remove = function(value, node, parent){
		if (lesserFn(value, node.value)) {
			if(node.left !== null){
				return remove(value, node.left, node);
			}
			else{
				return false;
			}
		}
		else if(equalityFn(value, node.value)){
			if (node.left !== null && node.right !== null) {
				node.value = minValue(node.right);
				remove(node.value, node.right, node);
			}else if(parent.left === node){
				parent.left = (node.left !== null) ? node.left : node.right;
			}else if(parent.right === node){
				parent.right = (node.left !== null) ? node.left : node.right;
			}
			return true;
		}
		else{
			if (node.right !== null) {
				return remove(value, node.right, node);
			}else{
				return false;
			}
		}
	}

	this.Add = function(value){		
		if (root === null) {
			root = new Node(value);
		}else{
			insert(root, value);
		}
	};

	this.Find = function(value){
		return find(root, value) !== null;
	};

	this.Remove = function(value){
		if(root === null){
			return false;
		}else{
			if (equalityFn(value, root.value)) {
				tmpNode = new Node(0);
				tmpNode.left = root;
				var result = remove(value, root, tmpNode);
				root = tmpNode.left;
				return result;
			}else{
				return remove(value, root, null);
			}
		}
	};


	this.InOrderTravers = function(){
		var traversResult = [];
		var inOrderTravers = function(node){
			if (node === null) {
				return;
			}

			inOrderTravers(node.left);
			traversResult.push(node.value);
			inOrderTravers(node.right);
		}

		inOrderTravers(root);
		return traversResult;
	}
}