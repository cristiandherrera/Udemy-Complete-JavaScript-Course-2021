"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

// DISPLAYING TRANSACTIONS
const displayMovements = function (movements) {
  // Setting HTML within '.movements' class to empty
  containerMovements.innerHTML = "";
  // Looping through function argument 'movements'
  movements.forEach(function (mov, i) {
    // Creating string on whether value is below or above 0
    const type = mov > 0 ? "deposit" : "withdrawal";
    // Creating string of html to create a new row to display withdrawals and deposits
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}</div>
      </div>
     `;
    // Inserting HTML using the string from variable 'html'
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};
displayMovements(account1.movements);

// CALCULATING AND DISPLAYING BALANCE
const calcDisplayBalance = function (movements) {
  // Using reduce() to create the sum of withdrawls and deposits
  const balance = movements.reduce((acc, curr) => acc + curr, 0);
  // Updating text to display calculations
  labelBalance.textContent = `${balance} EUR`;
};
calcDisplayBalance(account1.movements);

// COMPUTING USERNAMES
const createUsernames = function (accs) {
  // Looing through 'accs' arg using forEach() SO we can mutate the ORIGINAL accounts array.("side effects")
  accs.forEach(function (acc) {
    // Creating property 'username' for each account object using the property 'owner' as a beginning value
    acc.username = acc.owner
      // Manipulating the string to create intials of the name
      .toLowerCase()
      .split(" ")
      // Creating new simple array with map() to actually grab the intials
      .map((name) => name[0])
      .join("");
  });
};
createUsernames(accounts);
console.log(accounts);

/////////////////////////////////////////////////
/////////////////////////////////////////////////

// *****************
// The reduce Method
// *****************

/*
 REMEMBER: executes a REDUCER function (that you provide) on each element of the array, resulting in SINGLE output value.

   SYNTAX: 'arr.reduce(callback(accumulator, currentValue, index, array), initialValue) {}) ' 
 
 COMPARISON: We always need an external variable whenever we want to use a for loop, these method on the otherhand, they completely avoid this and simply return the variable or the value actually right away.

 JONAS: "It is by far the most powerful array method there is. And because of that, it can also be the hardest one to use. So we always need to think exactly what we want the accumulator and the core value to be and how they should interact."
*/

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // REDUCE METHOD
// const balance = movements.reduce((acc, curr) => acc + curr, 0);
// console.log(balance);

// // FOR LOOP COMPARISON
// let sum = 0;
// for (const mov of movements.entries()) sum += mov;
// console.log(sum);

// // REDUCE METHOD - checking maximum value
// const max = movements.reduce(
//   (acc, mov) => (acc > mov ? acc : mov),
//   movements[0]
// );
// console.log(max);

// *****************
// The filter Method
// *****************

/*
 REMEMBER: Creates a new array with all elements that pass the test implemented by the provided callback function.

   SYNTAX: 'let newArray = arr.filter(callback (value, index, array) {})'
   return element; (if true) 

 SYNTAX: MUST use a conditional statement that produces a boolean value
*/

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // FILTER METHOD
// const deposits = movements.filter(function (mov) {
//   return mov > 0;
// });
// console.log(movements);
// console.log(deposits);

// // FOR LOOP COMPARISON
// const depositsForLoop = [];
// for (const mov of movements) if (mov > 0) depositsForLoop.push(mov);
// console.log(depositsForLoop);

// // CHALLENGE
// const withdrawals = movements.filter((mov) => mov < 0);
// console.log(withdrawals);

// const withdrawalsForLoop = [];
// for (const mov of movements) if (mov < 0) withdrawalsForLoop.push(mov);
// console.log(withdrawalsForLoop);

// **************
// The map Method
// **************

/*
 REMEMBER: The map() method creates a NEW ARRAY populated with the results of calling a provided function on every element in the calling array.

   SYNTAX: 'let newArray = arr.map(callback (value, index, array) {}) 
   return element;' (after executing something) 

 NOTE: We do not call this function by ourselves. It is the map method who we'll call this function for each of the array elements in the movement array.
 
 USE: loops over arrays just like the forEach() EXCEPT the map() creates a whole NEW array and the elements values will be the result of a callback functions execution!!
*/

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const eurToUsd = 1.1;

// // const movementsToUsd = movements.map(function (mov) {
// //   return mov * eurToUsd;
// // });

// // MAP METHOD with arrow function callback
// const movementsToUsd = movements.map((mov) => mov * eurToUsd);
// console.log(movementsToUsd);
// console.log(movements);

// // FOR OF LOOP (comparison to above)
// const movementsToUSDfor = [];
// for (const mov of movements) {
//   movementsToUSDfor.push(mov * eurToUsd);
// }
// console.log(movementsToUSDfor);
// console.log(movements);

// console.log("");

// // MAP METHOD: returning each string from the callback into a new array and then logging the entire array (not one by one like in the 'forEach' method example below)
// const movementsDescriptions = movements.map(
//   (mov, i) =>
//     `Movement ${i + 1}: You ${mov > 0 ? "deposited" : "withdrew"} ${Math.abs(
//       mov
//     )}`
// );
// console.log(movementsDescriptions);

// // FOR EACH METHOD: printing each line individually as we loop over array(each iterations performing an action which is known as a "side effect")
// movements.forEach(function (mov, i, arr) {
//   if (mov > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${mov} ${arr}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
//   }
// });

// *****************************************
// Data Transformations: map, filter, reduce
// *****************************************

/*
 The Map array method: returns a NEW ARRAY containing the results of applying an operation on all original array elements

 The Filter array method: returns a NEW ARRAY containing the array elements that passed a SPECIFIED test CONDITION

 The Reduce array method: reduces all ORIGINAL array elements down to one single value. (e.g. adding all elements togther)

*/

// **************************
// forEach With Maps and Sets
// **************************

/*
 The map.forEach() method: executes a provided function once for each value in the Set object, in insertion order.
   SYNTAX: 'map.forEach(callback (value, key, map) {})' (WHEN USED WITH MAPS)

 The set.forEach() method: executes a provided function once per each key/value pair in the Map object, in insertion order.
   SYNTAX: 'set.forEach(callback (value1, value2, map) {})' (WHEN USED WITH SETS)
   note: that the second arguement in set.forEach() ALWAYS will have the same value as the first. 

 PRACTICE: When '_' is used as a variable name, it means it is a "throwaway variable".(useless/has no meaning)
*/

// // MAPS
// const currencies = new Map([
//   ["USD", "United States dollar"],
//   ["EUR", "Euro"],
//   ["GBP", "Pound sterling"],
// ]);

// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });

// // SETS
// const currenciesUnique = new Set(["USD", "GBP", "USD", "EUR", "EUR", "RUP"]);
// console.log(currenciesUnique);

// currenciesUnique.forEach(function (value1, _, set) {
//   console.log(value1, _, set);
// });

// ***********************
// Looping Arrays: forEach
// ***********************

/*
 The array.forEach() method: is a method that requires a callback to execute once for every item in the array.

 SYNTAX: Can take up to THREE arguements in a specific order. (WHEN USED WITH ARRAYS) 
   Ex. array.forEach(callback (item, index, array) {})

 USE: You CANNOT break out of a forEach() loop! 'continue' and 'break' statements DONOT work with them!

 REMEMBER: 
   A higher-order function is a func that requires a callback(function) as an arguement 
   A callback function is a function passed into a higher-order function as an argument.
*/

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
//   }
// }

// console.log("");

// movements.forEach(function (mov, i, arr) {
//   if (mov > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${mov} ${arr}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
//   }
// });

// ********************
// Simple Array Methods
// ********************

/*  
 The slice() method: returns a shallow copy of an array into a new array object using two arguements that select the start and end of the array using the index.

 The splice() method: mutates the contents of an array by removing OR replacing existing elements and/or adding new elements.

 The reverse() method: mutates the contents of an array by reversing there index value.

 The concat() method: creates a new array by concatinating two arrays together

 The join() method: creates and returns a new string by concatenating all of the elements in an array, seperated by commas or a specified sperator string in the argument
*/

// let arr = ["a", "b", "c", "d", "e"];
// let arr2 = ["a", "b", "c", "d", "e"];
// let arr3 = ["a", "b", "c", "d", "e"];

// // SLICE - shallow copy
// console.log(arr.slice(2)); // ["c", "d", "e"]
// console.log(arr.slice(2, 4)); // ["c", "d"]
// console.log(arr); // ["a", "b", "c", "d", "e"]

// console.log(arr.slice(-2)); // ["d", "e"]
// console.log(arr.slice(-1)); // ["e"]
// console.log(arr.slice(1, -1)); // ["b", "c", "d"]

// // both create shallow copy
// console.log(arr.slice());
// console.log([...arr]);

// // SPLICE - mutates
// // console.log(arr.splice(2)); // ["c", "d", "e"] deletes
// arr.splice(-1);
// console.log(arr); // ["a", "b", "c", "d"]
// arr.splice(1, 2);
// console.log(arr); // ["a", "d"]

// console.log(arr2.splice(3, 0, "x"));
// console.log(arr2);

// // REVERSE - mutates
// const arr2 = ["j", "i", "h", "g", "f"];
// console.log(arr2.reverse()); // ['f', 'g', 'h', 'i', 'j']
// console.log(arr2); // ['f', 'g', 'h', 'i', 'j']

// // CONCAT - shallow copies
// arr = ["a", "b", "c", "d", "e"];
// const letters = arr.concat(arr3);
// console.log(letters); // ["a", "b", "c", "d", "e" , 'f', 'g', 'h', 'i', 'j']
// console.log([...arr, ...arr3]); // SAME EFFECT AS concat()

// // JOINc -  shallow copy
// console.log(letters.join(" + ")); // a + b + c + d + e + f + g + h + i + j
