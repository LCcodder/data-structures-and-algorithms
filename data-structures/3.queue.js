// A queue is a linear data structure that stores the elements sequentially. 
// It uses the FIFO (First In First Out) approach for accessing elements. 
// Queues are typically used to manage threads in multithreading 
// and implementing priority queuing systems.

class Queue {
    #queue

    constructor(initialValue) {
        this.#queue = initialValue ? [initialValue] : []
    }

    get values() {
        return this.#queue
    }

    enqueue(...values) {
        for (const value of values) {
            this.#queue.push(value)
        }
        return this.#queue
    }

    dequeue(count = 1) {
        for (let i = 0; i < count; i++) {
            this.#queue.shift()
        }
        return this.#queue
    }
}

const queue = new Queue(1)
queue.enqueue(12, 11, 10)
queue.dequeue(2)

console.log(queue.values)
// [ 11, 10 ]