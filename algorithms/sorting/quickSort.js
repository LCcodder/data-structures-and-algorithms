// Quicksort is a divide-and-conquer algorithm. It works by selecting a 'pivot' element from the array and 
// partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot. 
// For this reason, it is sometimes called partition-exchange sort.[4] The sub-arrays are then sorted recursively.

const quickSort = (array) => {
    if (array.length < 2) return array
    const pivot = array[0]
    const less = array.slice(1).filter(e => e < pivot)
    const greater = array.slice(1).filter(e => e >= pivot)

    return quickSort(less).concat(pivot, quickSort(greater))
}

console.log(quickSort([4, 6, 1, 23, 14, 7, 9, 7]))