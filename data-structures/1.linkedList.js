export class LinkedList {
    #_head
    #_tail

    constructor (head = null) {
        this.#_head = head
        this._tail = null
    }

    getHead() {
        return this.#_head
    }

    getTail() {
        return this.#_tail
    }

    addToTail(dataset) {
        const node = {value: dataset, next: null}
        if (this.#_tail) this.#_tail.next = node
        if (!this.#_head) this.#_head = node
        this._tail = node
    }

    addToHead(dataset) {
        const node = {value: dataset, next: this.#_head}
        this.#_head = node
        if (!this.#_tail) this._tail = node
    }

    /**
     * 
     * @param {Function} callback 
     * @returns 
     */
    toArray(callback = undefined){

        let array = []
        if (!this.#_head) return array

        let currentNode = this.#_head
        let isEnded = false
        while (!isEnded) {
            if (!currentNode.next) {
                array.push(currentNode.value)
                isEnded = true
                continue
            }
            array.push(currentNode.value)
            currentNode = currentNode.next
        }

        if (callback) callback(array)
        return array
    }

    replace(oldValue, newValue, instancesCount = undefined, callback = undefined ) {
        if (this.#_head == null) return 0
        if (!instancesCount) instancesCount = 1
        let completedInstances = 0

        let currentNode = this.#_head
        let isEnded = false

        // O(n) alg. difficulty
        while (!isEnded) {
            if (completedInstances === instancesCount) return completedInstances
            if (currentNode.value === oldValue) {
                currentNode.value = newValue
                if (callback) callback(currentNode)
                completedInstances++
            }
            if (!currentNode.next) {
                isEnded = true
                continue
            }
            currentNode = currentNode.next
        }

        return completedInstances
    }
    
    remove(value, instancesCount = undefined, callback = undefined ) {
        if (this.#_head == null) return 0
        if (!instancesCount) instancesCount = 1

        let completedInstances = 0

        let currentNode = this.#_head
        let isEnded = false

        while (!isEnded) {
            if (completedInstances === instancesCount) return completedInstances
            if (currentNode.next && currentNode.next.value === value) {
                currentNode.next = currentNode.next.next
                if (callback) callback(currentNode)
                completedInstances++
                continue
            }
            if (!currentNode.next) {
                isEnded = true
                continue
            }
            currentNode = currentNode.next
        }
        if (this.#_tail?.value === value) this._tail = currentNode
        
        return completedInstances
    }

}



