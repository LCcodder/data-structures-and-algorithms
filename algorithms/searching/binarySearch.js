// binary search, also known as half-interval search, logarithmic search, 
// or binary chop, is a search algorithm that finds the position of a target value within a sorted array. 
// Binary search compares the target value to the middle element of the array.

const binarySearch = (array, value) => {
  let start = 0;
  let end = array.length - 1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);

    if (array[mid] === value) {
      return mid;
    }

    if (value < array[mid]) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return -1;
}

const recursionalBinarySearch = (array, value, start = 0, end = array.length - 1) => {
  if (start >= end) return -1;
  
  let mid = Math.floor((start + end) / 2);
  if (array[mid] === value) return mid

  return value < array[mid] 
    ? recursionalBinarySearch(array, value, start, mid - 1)
    : recursionalBinarySearch(array, value, mid + 1, end)
  
}

const arr = [0,1,2,3,4,6,100,10000];

console.log(binarySearch(arr, 100)); // 6
console.log(recursionalBinarySearch(arr, 100)); // 6