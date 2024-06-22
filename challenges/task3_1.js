// ========================
//
//
// Tutorial 3, task 1
//
//
// ========================

/** 1.1.
 * Get k biggest numbers of list of numbers
 */
function topK(list, k) {
  let test = list.sort((a, b) => a - b); // or sort reverse b-a
  k = test.slice(-1);
  // or use pop/apply, lastElement=test[test.length-1]
  //console.log(k)
  return k;
}

/** 1.2.
 * start - inclusive start of range
 * end - inclusive end of range
 */
function sum(start, end) {
  //(2,7) => 2 (i= 0) + 3(i=1) + 4 + 5 + 6 + 7 =27
  let result = 0;
  for (let i = 0; i <= end - start; i++) {
    result += start + i;
  }
  return result;
}

// test topK function
const testList = [3, 7, 44, 33, 22, 77];
const n = 0;
const topNr = topK(testList, n);
console.log("the biggest number is: ", topNr);

// test sum
console.log("sum=", sum(9, 11));

/**
 * @param {*} list list of recursively nested lists
 * @returns a flattened list that only contains the leaf elements (i.e. list elements which are not themselves lists like a number or a string)
 */
function flatten(list) {
  let result = [];

  function recursiveFlatten(innerList) {
    for (let i = 0; i < innerList.length; i++) {
      if (Array.isArray(innerList[i])) {
        // If the element is an array, recursively flatten it
        recursiveFlatten(innerList[i]);
      } else {
        // If the element is not an array, add it to the result
        result.push(innerList[i]);
      }
    }
  }

  // Start the recursion
  recursiveFlatten(list);

  return result;
}

function flattenWithFlat(list) {
  //level of flat with depth is length of array
  let flattenedList = list.flat(list.length);
  return flattenedList;
}

function flattenWithRecursion(list) {
  return list.reduce(
    (acc, cur) =>
      acc.concat(Array.isArray(cur) ? flattenWithRecursion(cur) : cur),
    []
  );
}

function flattenWithIterative(list) {
  let res = [];
  for (let li of list) {
    if (Array.isArray(li)) res.push(...flattenWithIterative(li));
    else res.push(li);
  }
  return res;
}

// usage:
const nestedList = [
  ["a"],
  ["b", ["c"]],
  ["d", ["e", ["f"]]],
  ["g", ["h", ["i", ["k"]]]],
];
const flattenedList = flatten(nestedList);
console.log("Flattened list:", flattenedList);
console.log("Flattened list with flat:", flattenWithFlat(nestedList));
console.log("Flattened list recursion:", flattenWithRecursion(nestedList));
console.log("Flattened list iteration:", flattenWithIterative(nestedList));
