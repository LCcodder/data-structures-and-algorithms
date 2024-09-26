// This algorithm divides the input array into two sublists - a sorted and unsorted sublist. The sorted list is located at the start of the 
// collection, and all elements to the right of the final sorted element are considered unsorted.
// Initially, the sorted list is empty, while the rest of the collection is unsorted. Selection Sort goes through the unsorted sublist and finds the smallest or largest element.
// The element is then swapped with the leftmost element of the unsorted sublist. Then, the sorted sublist is expanded to include that element.

const selectionSort = (inputArr) => { 
    let n = inputArr.length;
        
    for(let i = 0; i < n; i++) {
        // Finding the smallest number's index in the subarray
        let min = i
        for(let j = i+1; j < n; j++){
            if(inputArr[j] < inputArr[min]) {
                min=j; 
            }
        }
        
        if (min != i) {
            // Swapping the elements
            let tmp = inputArr[i]; 
            inputArr[i] = inputArr[min];
            inputArr[min] = tmp;      
        }
    }
    return inputArr;
}

console.log(selectionSort([3, 7, 1, 5, 19, 18, 5]))