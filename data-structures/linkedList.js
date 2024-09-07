// linked list is a linear collection of data elements whose order is not given by their physical placement in memory.
// Instead, each element points to the next.
// It is a data structure consisting of a collection of nodes which together represent a sequence

class LinkedList {
    #head;
    #tail;

    constructor(headValue = null) {
        // if LL has 1 node, then head is tail and tail is head
        const node = headValue ? {value: headValue, next: null} : null;
        this.#head = node;
        this.#tail = node;
    }

    get head() {
        return this.#head;
    }

    get tail() {
        return this.#tail;
    }

    addToTail(value) {
        const node = {value, next: null};

        // adding to the end if this "end" exists
        if (this.#tail) this.#tail.next = node;

        // if HEAD initial value is null, then creating node with rule: head is tail and tail is head
        if (!this.#head) this.#head = node;
        this.#tail = node;
    }

    addToHead(value) {
        const node = {value, next: this.#head};

        // if TAIL initial value is null, then creating node with rule: head is tail and tail is head
        if (!this.#tail) this.#tail = node;
        this.#head = node;
    }

    *iterate(node = this.#head) {
        if (!node?.next) return yield node;

        yield node;
        yield* this.iterate(node.next);
    }

    mapValue(callback) {
        for (const node of this.iterate()) node.value = callback(node.value);

        return this.#head;
    }

    toArray() {
        if (!this.#head) return [];
        return [...this.iterate()].map((n) => n.value);
    }

    replace(oldValue, newValue, instancesCount = undefined) {
        if (this.#head == null) return 0;

        // if instances count is undefined, code will replace values until list ends
        if (!instancesCount) instancesCount = -1;
        let completedInstances = 0;

        for (const node of this.iterate()) {
            if (completedInstances === instancesCount)
                return completedInstances;

            if (node.value === oldValue) {
                node.value = newValue;
                completedInstances++;
            }
        }

        return completedInstances;
    }

    remove(value, instancesCount = undefined) {
        if (this.#head == null) return 0;

        // if instances count is undefined, code will remove value until list ends
        if (!instancesCount) instancesCount = -1;

        let completedInstances = 0;
        
        let currentNode = this.#head
        let isEnded = false

        while (!isEnded) {
            if (completedInstances === instancesCount) return completedInstances
            if (currentNode.next && currentNode.next.value === value) {
                currentNode.next = currentNode.next.next
                completedInstances++
                continue
            }
            if (!currentNode.next) {
                isEnded = true
                continue
            }
            currentNode = currentNode.next
        }
        if (this.#tail?.value === value) this.#tail = currentNode

        return completedInstances;
    }
}

const ll = new LinkedList(1);

ll.addToHead(2);
ll.addToTail(3);

console.log(ll.head);
// { value: 2, next: { value: 1, next: { value: 3, next: null } } }

console.log(ll.tail);
// { value: 3, next: null }

ll.addToHead(9);
ll.addToTail(4);
ll.addToTail(4);

console.log(ll.toArray());
// [ 9, 2, 1, 3, 4, 4 ]

ll.mapValue((v) => v * v);
console.log(ll.toArray());
// [ 81, 4, 1, 9, 16, 16 ]

ll.remove(16);
console.log(ll.toArray());
// [ 81, 4, 1, 9 ]

ll.replace(4, 0);
console.log(ll.toArray());
// [ 81, 0, 1, 9 ]

for (const node of ll.iterate()) {
    console.log(node);
}

console.log(ll.tail);
