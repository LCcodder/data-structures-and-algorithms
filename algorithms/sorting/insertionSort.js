// Insertion sort iterates, consuming one input element each repetition, and grows a sorted output list. 
// At each iteration, insertion sort removes one element from the input data, finds the location it belongs within the sorted list, 
// and inserts it there. It repeats until no input elements remain.

const insertionSort = (arr) => {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;

        /* Move elements of arr[0..i-1], that are
           greater than key, to one position ahead
           of their current position */
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}

let arr = [12, 11, 13, 5, 6];

insertionSort(arr);
console.log(arr.join(" "));
