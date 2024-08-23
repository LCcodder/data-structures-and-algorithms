// A binary tree is a data structure consisting of a set of linked nodes that represent a hierarchical tree structure. 
// Each node is linked to others via parent-children relationship. 
// Any given node can have at most two children (left and right). 
// The first node in the binary tree is the root, whereas nodes without any children are the leaves.


// Implementation from: https://www.30secondsofcode.org/js/s/data-structures-binary-tree/
class BinaryTreeNode {
    constructor(key, value = key, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }

    // if node haven't any children, then it must be considered as leaf
    get isLeaf() {
        return this.left === null && this.right === null;
    }
    
    get hasChildren() {
        return !this.isLeaf;
    }
}

class BinaryTree {
    constructor(key, value = key) {
      this.root = new BinaryTreeNode(key, value);
    }
    
    // iterates by the rule of Left-Root-Right  
    *inOrderTraversal(node = this.root) {
        if (node.left) yield* this.inOrderTraversal(node.left);
        yield node;
        if (node.right) yield* this.inOrderTraversal(node.right);
    }

    // iterates tree from bottom to top (Left -> Right -> Root) (from children to parents) 
    *postOrderTraversal(node = this.root) {
        if (node.left) yield* this.postOrderTraversal(node.left);
        if (node.right) yield* this.postOrderTraversal(node.right);
        yield node;
    }
  
    // iterates tree in order of child nodes - from top to bottom (Root -> Left -> Right)
    *preOrderTraversal(node = this.root) {
        yield node;
        if (node.left) yield* this.preOrderTraversal(node.left);
        if (node.right) yield* this.preOrderTraversal(node.right);
    }
  
    insert(
        parentNodeKey,
        key,
        value = key,
        { left, right } = { left: true, right: true }
    ) {
        for (let node of this.preOrderTraversal()) {
            if (node.key === parentNodeKey) {
                const canInsertLeft = left && node.left === null;
                const canInsertRight = right && node.right === null;
                if (!canInsertLeft && !canInsertRight) return false;
                if (canInsertLeft) {
                    node.left = new BinaryTreeNode(key, value, node);
                    return true;
                }
                if (canInsertRight) {
                    node.right = new BinaryTreeNode(key, value, node);
                    return true;
                }
            }
        }
        return false;
    }
  
    remove(key) {
        for (const node of this.preOrderTraversal()) {
            if (node.left.key === key) {
            node.left = null;
            return true;
            }
            if (node.right.key === key) {
            node.right = null;
            return true;
            }
        }
        return false;
    }
  
    find(key) {
        for (const node of this.preOrderTraversal()) {
            if (node.key === key) return node;
        }
        return undefined;
    }
}


const tree = new BinaryTree(1, 'AB');

tree.insert(1, 11, 'AC');
tree.insert(11, 111, 'AD')
tree.insert(11, 112, 'DC')
tree.insert(1, 12, 'BC');
tree.insert(12, 121, 'BD');

console.log(tree.find(12).left)

console.log([...tree.preOrderTraversal()].map(n => n.value))

console.log([...tree.postOrderTraversal()].map(n => n.value))

console.log([...tree.inOrderTraversal()].map(n => n.value))
