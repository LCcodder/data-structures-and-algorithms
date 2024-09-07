// binary search tree (BST), also called an ordered or sorted binary tree, 
// is a rooted binary tree data structure with the key of each internal node 
// being greater than all the keys in the respective node's left subtree and less than the ones in its right subtree.

class Node {
    constructor(key, value = key) {
        this.key = key;
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor(key, value = key) {
        this.root = new Node(key, value);
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

    insert(newNode, currentNode = this.root) {
        if (currentNode.key > newNode.key) {
            if (currentNode.left) {
                currentNode = currentNode.left
                this.insert(newNode, currentNode)
            } else {

                currentNode.left = newNode
            }
        }
        if (currentNode.key < newNode.key) {
            if (currentNode.right) {
                currentNode = currentNode.right
                this.insert(newNode, currentNode)
            } else {
                currentNode.right = newNode
            }
        }
    }

    find(key) {
        for (const node of this.preOrderTraversal()) {
            if (node.key === key) return node;
        }
        return undefined;
    }

    // also removes all children that are linked to that node
    remove(key) {
        for (const node of this.preOrderTraversal()) {
            // checking children keys for deleting 
            if (node.left?.key === key) {
                node.left = null;
                return true;
            }
            if (node.right?.key === key) {
                node.right = null;
                return true;
            }
        }
        return false;
    }
}

const t = new BinarySearchTree(8)
t.insert(new Node(3))
t.insert(new Node(15))
t.insert(new Node(21))
t.insert(new Node(6))
t.insert(new Node(4))
t.insert(new Node(14))

console.log(t.find(15).right.value)
// 21

t.remove(14)
console.log([...t.inOrderTraversal()].map(n => n.value))
// [ 3, 4, 6, 8, 15, 21 ]