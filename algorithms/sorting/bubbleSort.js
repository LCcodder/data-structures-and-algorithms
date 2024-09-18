// Bubble sort, sometimes referred to as sinking sort, is a simple sorting algorithm 
// that repeatedly steps through the input list element by element, 
// comparing the current element with the one after it, swapping their values if needed.


const bubbleSort = (array) => {
  for (var i = 0; i < array.length; i++) {
    // Last i elements are already in place
    for (var j = 0; j < array.length - i - 1; j++) {
      // Checking if the item at present iteration
      // is greater than the next iteration
      if (array[j] > array[j + 1]) {
        // then swap them
        var temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }

  return array
}

var arr = [234, 43, 55, 63, 5, 6, 235, 547];

console.log(bubbleSort(arr))