// Conceptually, a merge sort works as follows:
// Divide the unsorted list into n sublists, each containing one element (a list of one element is considered sorted).
// Repeatedly merge sublists to produce new sorted sublists until there is only one sublist remaining. This will be the sorted list.

const mergeSort = (left, right) => {
    let sortedArr = [] // the sorted items will go here
    
    while (left.length && right.length) {
        // Insert the smallest item into sortedArr
        if (left[0] < right[0]) {
            sortedArr.push(left.shift())
        } else {
            sortedArr.push(right.shift())
        }
    }
    
    // Use spread operators to create a new array, combining the three arrays
    return [...sortedArr, ...left, ...right]
}

console.log(mergeSort([1, 4], [2, 6, 9]))