//  3.1.1 takes a list of numbers as input and returns the k biggest numbers as output
function topK(list, k) {
  const sort_list = list.sort((a, b) => a - b)
  console.log(sort_list)
  const new_list = sort_list.slice(-k)
  console.log('the biggest numbers are: ')
  //console.log(new_list)
  return new_list
}

const list = [3, 88, 1111, 1111, 2, 5, 66, 99, 33, 77, 9, 89]
const k = 6
const test_list = topK(list, k)
console.log(test_list)

//------------------------------------------------------------
/* 3.1.2
* Implement a function sum(start, end) that takes in two parameters representing 
the start (inclusive) and the end (inclusive) of a range. 
The function should output start+(start+1)+(start+2)+...+end=∑n

*/

function sum(start, end) {
  let result = 0
  for (let i = start; i <= end; i++) {
    result += i
  }

  return result
}

// test sum
console.log('The sum of numbers is \n', sum(2, 5))

/**
 * Implement a function flatten(list) that takes a list of recursively nested lists as input
 * and returns a flattened list that only contains the leaf elements
 * (i.e. list elements which are not themselves lists like a number or a string).
 * The input could look like this: [["a"],["b", ["c"]]].
 * The output however, would return a flattened version of that list, namely ["a", "b", "c"]
 */

function flatten(list) {
  let result = []
  function recursiveFlatten(innerList) {
    for (let i = 0; i < innerList.length; i++) {
      //check if innerlist is array or not
      // when true, then check recursive innernlist again
      if (Array.isArray(innerList[i])) {
        recursiveFlatten(innerList[i])
      }
      //when not list anymore, then push element in result array
      else {
        result.push(innerList[i])
      }
    }
  }
  // Start the recursion
  recursiveFlatten(list)

  return result
}

// Alternatives:
//implicit recursive flat()
function flattenWithFlat(list) {
  //level of flat with depth is length of array
  let flattenedList = list.flat(Infinity)
  return flattenedList
}

function flattenWithRecursion(list) {
  return list.reduce((acc, cur) => acc.concat(Array.isArray(cur) ? flattenWithRecursion(cur) : cur), [])
}

function flattenWithIterative(list) {
  let res = []
  for (let li of list) {
    if (Array.isArray(li)) res.push(...flattenWithIterative(li))
    else res.push(li)
  }
  return res
}

//test
const test_list_flatten = [['a'], ['b', ['c']], ['d', ['e', ['f']]], ['g', ['h', ['i', ['k']]]]]
const flatternList = flatten(test_list_flatten)
console.log('flattern list : \n', flatternList)
console.log('Flattened list with flat:', flattenWithFlat(test_list_flatten))
console.log('Flattened list recursion:', flattenWithRecursion(test_list_flatten))
console.log('Flattened list iteration:', flattenWithIterative(test_list_flatten))
