class Graph {
    // key of type T, value of type array of T
    #nodes

    constructor() {
        this.nodes = new Map();
    }

    // add node
    addNode(node) {
        if (!this.nodes.has(node)) {
            this.nodes.set(node, []);
        }
    }

    // add edge between two nodes
    addEdge(node1, node2) {
        if (this.nodes.has(node1) && this.nodes.has(node2)) {
            const neighbors = this.nodes.get(node1)
            // as T[] is a type assertion: we know for sure node1 exists
            // so neighbors cannot possibly be undeifned
            neighbors.push(node2);
        } else {
            console.log("Node not found in the graph.");
        }
    }

    // remove edge between two nodes
    removeEdge(node1, node2) {
        if (this.nodes.has(node1)) {
            const neighbors = this.nodes.get(node1)

            const index = neighbors.indexOf(node2);

            if (index !== -1) {
                // index exists
                neighbors.splice(index, 1);
            } else {
                // index doesn't exist
                console.log("Edge not found between the nodes.");
            }
        } else {
            console.log("Node not found in the graph.");
        }
    }

    // remove a node from the graph
    removeNode(nodeToRemove) {
        if (this.nodes.has(nodeToRemove)) {
            this.nodes.delete(nodeToRemove);

            for (const [node, neighbors] of this.nodes.entries()) {
                if (neighbors.includes(nodeToRemove)) {
                    this.removeEdge(node, nodeToRemove);
                }
            }
        } else {
            console.log("Node not found in the graph.");
        }
    }

    printGraph() {
        for (const [node, neighbors] of this.nodes.entries()) {
            const neighborString = neighbors.join(", ");
            console.log(`${node} -> [${neighborString}]`);
        }
    }

    // returns an array of a node's neighbors (value) of a given node, if it exists
    getNeighbors(node) {
        if (this.nodes.has(node)) {
            const neighbors = this.nodes.get(node)
            return neighbors;
        } else {
            console.log("Node not found in the graph.");
            return [];
        }
    }

    // checks if there's an edge (connection) between two nodes
    hasEdge(node1, node2) {
        if (this.nodes.has(node1)) {
            return this.nodes.get(node1).includes(node2);
            // ! is the non-null assertion operator,
            // which asserts that the result of .get(node1) is not null or undefined
        } else {
            console.log("Node not found in the graph.");
            return false;
        }
    }

    // perform a depth-first traversal from a starting node
    depthFirstTraversal(startNode, visitCallback) {
        const visited = new Set();

        // helper recursive function that traverses the graph
        const dfs = (node) => {
            visited.add(node);

            visitCallback(node);

            const neighbors = this.getNeighbors(node);

            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    dfs(neighbor);
                }
            }
        };

        if (this.nodes.has(startNode)) {
            dfs(startNode);
        } else {
            console.log("Node not found in the graph.");
        }
    }

    // perform a breath first traveral from a starting node
    breadthFirstTraversal(startNode, visitCallback) {
        const visited = new Set();
        const queue = [];

        // if the starting node exists, start the traversal
        if (this.nodes.has(startNode)) {
            queue.push(startNode);
            visited.add(startNode);

            // loop that iterates through queue, as long as there are items on it
            while (queue.length > 0) {
                const currentNode = queue.shift(); // we know for sure .shift() can't return undefined
                visitCallback(currentNode);
                const neighbors = this.getNeighbors(currentNode);

                for (const neighbor of neighbors) {
                    if (!visited.has(neighbor)) {
                        queue.push(neighbor);
                        visited.add(neighbor);
                    }
                }
            }
        } else {
            console.log("Node not found in the graph.");
        }
    }

    // check if the graph is connected (no isolated nodes)
    isConnected() {
        if (this.nodes.size === 0) {
            return true;
        }

        const startNode = this.nodes.keys().next().value;
        const visited = new Set();
        this.breadthFirstTraversal(startNode, (node) => {
            visited.add(node);
        });

        return visited.size === this.nodes.size;
    }

    // finds the shortest path between two nodes
    shortestPath(startNode, endNode) {
        if (!this.nodes.has(startNode) || !this.nodes.has(endNode)) {
            return null;
        }

        const queue = [];
        const parentMap = new Map();
        queue.push(startNode);
        parentMap.set(startNode, null);

        // loop that performs a bfs and keeps track of a node - parent map throughout the path
        while (queue.length > 0) {
            const currentNode = queue.shift();

            if (currentNode === endNode) {
                const path = [];
                let node = endNode;

                while (node !== null) {
                    path.unshift(node);
                    node = parentMap.get(node);
                }

                return path;
            }

            const neighbors = this.getNeighbors(currentNode);

            // iterate through all neighbors
            for (const neighbor of neighbors) {
                if (!parentMap.has(neighbor)) {
                    parentMap.set(neighbor, currentNode);
                    queue.push(neighbor);
                }
            }
        }

        return null;
    }
}

const graph = new Graph();

// add nodes to the graph
graph.addNode("A");
graph.addNode("B");
graph.addNode("C");
graph.addNode("D");
graph.addNode("E");
graph.addNode("F");

// add edges to create a sample graph
graph.addEdge("A", "B");
graph.addEdge("B", "C");
graph.addEdge("B", "D");
graph.addEdge("C", "E");
graph.addEdge("D", "E");
graph.addEdge("E", "F");

console.log(graph);

// print graph
graph.printGraph();

// get neighbors
console.log(graph.getNeighbors("B")); // [ 'C', 'D' ]

// has edge
console.log(graph.hasEdge("A", "B")); // true
console.log(graph.hasEdge("A", "E")); // false

// is connected
console.log(graph.isConnected()); // true

// depth first traversal (dfs)
graph.depthFirstTraversal("A", print); // A, B, C, E, F, D

// breadth first traversal (bfs)
graph.breadthFirstTraversal("A", print); // A, B, C, D, E, F

// shortest path
console.log(graph.shortestPath("A", "F")); // A, B, C, E, F


