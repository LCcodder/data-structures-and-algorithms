// The stack data structure is a linear data structure that accompanies
// a principle known as LIFO (Last In First Out) or FILO (First In Last Out). 
// Real-life examples of a stack are a deck of cards, piles of books, 
// piles of money, and many more.

class Stack {
    #stack
    constructor(initialValue) {
        this.#stack = initialValue ? [initialValue] : []
    }

    get values() {
        return this.#stack
    }

    push(...values) {
        for (const value of values) {
            this.#stack.push(value)
        }
        return this.#stack
    }

    pop(count = 1) {
        for (let i = 0; i < count; i++) {
            this.#stack.pop()
        }
        return this.#stack
    }
}

const stack = new Stack(1)

stack.push(23, 12, 2)
stack.push(4)
stack.pop(2)

console.log(stack.values)
// [ 1, 23, 12 ]