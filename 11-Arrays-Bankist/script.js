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
const displayMovements = function (movements, sort = true) {
  // Setting HTML within '.movements' class to empty
  containerMovements.innerHTML = "";
  // Variable to sort based on 'sort' boolean value
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  // Looping through function argument 'movements'
  movs.forEach(function (mov, i) {
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

// CALCULATING AND DISPLAYING BALANCE
const calcDisplayBalance = function (acc) {
  // Using reduce() to create the sum of withdrawls and deposits
  acc.balance = acc.movements.reduce((acc, curr) => acc + curr, 0);
  // Updating text to display calculations
  labelBalance.textContent = `${acc.balance} EUR`;
};

// CALCULATING AND DISPLAYING SUMMARY
const calcDisplaySummary = function (acc) {
  // Display incomes
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov);
  labelSumIn.textContent = `${incomes}€`;

  // Display out
  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  // Display interest
  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((mov) => (mov * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int);
  labelSumInterest.textContent = `${interest}€`;
};

// COMPUTING USERNAME OBJECTS
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

// UPDATE UI LOGIC
const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);
  // Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
};

// LOGIN LOGIC
let currentAccount;
btnLogin.addEventListener("click", function (e) {
  // Stops the html element 'form' automatic reload of page when 'click' event is fired
  e.preventDefault();
  // Setting 'currentAccount' to value of input user login
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  // Checking if value of the input pin is matached to the 'currentAccount' pin
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;
    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

// TRANSFER MONEY LOGIC
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  console.log(amount, recieverAcc);

  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    recieverAcc &&
    currentAccount.balance >= amount &&
    recieverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);

    updateUI(currentAccount);
  }
});

// REQUEST LOAN LOGIC
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  // Variable of input value
  const amount = Number(inputLoanAmount.value);
  // Checking loan conditions
  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    // Add movement
    currentAccount.movements.push(amount);
    // Update UI
    updateUI(currentAccount);
  }
  // reset input text
  inputLoanAmount.value = "";
});

// CLOSE ACCOUNT LOGIC
btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    // Delete account
    accounts.splice(index, 1);
    // Hide UI
    containerApp.style.opacity = 0;
  }
  // Removing inputs
  inputCloseUsername.value = inputClosePin = "";
});

// SORT BUTTON LOGIC
let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////

// ****************************************
// More Ways of Creating and Filling Arrays
// ****************************************

/*
 The Array() constructor: Is used to create Array objects.

   SYNTAX: 'new Array(element0, element1)' OR 'new Array(arrayLength)' 

   REMEMBER: If using the 'new Array()' constructor and only one integer argument is passed in, then it returns an empty array with its length property set to that number.

 The fill() method: MUTATES all elements in an array to a single value
   
   SYNTAX: 'arr.fill(value, start, end)'

 The Array.from() method: creates a NEW SHALLOW COPIED Array instance from an array-like or iterable object.(turns iterable objects into arrays!)

   SYNTAX: Array.from(arrayLike , mapFunction , thisArg)

   TIP: Allows us to apply array methods on other data structures once we turn them into an array using this method!!
   
*/

// // ARRAY CONSTRUCTOR
// const arr = [1, 2, 3, 4, 5, 6, 7];
// console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// const x = new Array(7);
// console.log(x); // [empty * 7]

// console.log(x.map(() => 5)); // DOES NOT FILL THE ARRAY // output: [empty * 7]

// // FILL METHOD
// x.fill(1, 3, 5);
// console.log(x); // [<empty * 3>, 1, 1,  <empty * 2> ]
// x.fill(1);
// console.log(x); // [1, 1, 1, 1, 1, 1, 1]

// arr.fill(23, 2, 6);
// console.log(arr); // [1, 2, 23, 23, 23, 23, 7]

// // FROM METHOD
// const y = Array.from({ length: 7 }, () => 1);
// console.log(y);

// const z = Array.from({ length: 7 }, (_, i) => i + 1);
// console.log(z);

// // FROM VS SPREAD AND MAP
// labelBalance.addEventListener("click", function () {
//   // Array.from() - grabbing movements nodelist from the DOM
//   const movementsUI = Array.from(
//     document.querySelectorAll(".movements__value"),
//     (el) => Number(el.textContent.replace("€", ""))
//   );
//   console.log(movementsUI);

//   // spread operator then map()
//   const movementUI2 = [...document.querySelectorAll(".movements__value")];
//   const map = movementUI2.map((el) => Number(el.textContent.replace("€", "")));
//   console.log(map);
// });

// **************
// Sorting Arrays
// **************

/*
 The sort() method: Sorts the elements of an array IN PLACE(doesnt copy) and returns the sorted array.
   
   SYNTAX: arr.sort([compareFunction])

   Ex. arr.sort(function(a, b) {a - b}) - If 'a' is greater than 'b' than ascends order if otherwise than it decends. 

   If you do NOT specify the sort order with a function THEN he array elements are converted to strings and sorted according to each character's Unicode code point value.

 NOTE: DO NOT use sort() method if the array of question contains mulitple data types

*/

// // Strings
// const owners = ["Jonas", "Zach", "Adam", "Martha"];
// console.log(owners.sort());
// console.log(owners); // ["Adam", "Jonas", "Martha", "Zach"]

// // Numbers
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements); // [200, 450, -400, 3000, -650, -130, 70, 1300] (WEIRD)

// // Ascending
// movements.sort((a, b) => a - b);
// console.log(movements); // [-650, -400, -130, 70, 200, 450, 1300, 3000

// // Descending
// movements.sort((a, b) => b - a);
// console.log(movements); // [3000, 1300, 450, 200, 70, -130, -400, -650]

// ****************
// flat and flatMap
// ****************

/*
 The flat() method: creates a new array and UNnests nested arrays within the new array. Can specify the depth of nest you want to UNnest.

   SYNTAX: var newArray = arr.flat(depth);

 The flatMap() method: Returns a new array formed by applying a given callback function to each element of the array, and then flattening the result by one level. SAME AS chaining map() and flat()

   SYNTAX: var newArray = arr.flatMap(function callback(currentValue, index, array) {
   // return element for newArray
   }, thisArg)

*/

// // flat
// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// console.log(arr.flat());

// const arrDeep = [[[1, [2]], 3], [4, [5, 6]], 7, 8];
// console.log(arr.flat(3));

// const overallBalance = accounts
//   .map((acc) => acc.movements)
//   .flat()
//   .reduce((acc, curr) => acc + curr, 0);
// console.log(overallBalance);

// // flatMat
// const overallBalance2 = accounts
//   .flatMap((acc) => acc.movements)
//   .reduce((acc, curr) => acc + curr, 0);
// console.log(overallBalance2);

// **************
// some and every
// **************

/*
 The some() method: tests if ANY element in the array passes the CONDITIONAL implemented by the provided function. It returns a Boolean value.

   SYNTAX: arr.some(callback(element, index, array), thisArg)
   COMPARISON: includes() method ONLY checks for equality, where as the some() method checks a condition 

 The every() method: tests if ALL elements in the array passes the CONDITIONAL implemented by the provided function. It returns a Boolean value.

   SYNTAX: arr.every(callback(element, index, array), thisArg)

 TIP: We CAN write our callback functions OUTSIDE the methods we are supposed to callback too!! This will help us with the DRY principle!!
*/

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // INCLUDES MEHTOD
// console.log(movements);
// console.log(movements.includes(-130));

// // SOME METHOD
// console.log(movements.some((mov) => mov === -130));

// const some = movements.some((mov) => mov > 0);
// console.log(some);

// // EVERY
// console.log(movements.every((mov) => mov > 0));
// console.log(account4.movements.every((mov) => mov > 0));

// // Seperate callback
// const callBack = (mov) => mov > 0;
// console.log(movements.every(callBack));
// console.log(movements.some(callBack));
// console.log(movements.filter(callBack));

// ********************
// The findIndex Method
// ********************

/*
The findIndex() method: Returns the index of the FIRST element in the array that satisfies the provided testing function. Otherwise, it returns -1, indicating that no element passed the test.
  
   SYNTAX: arr.findIndex(callback( element, index, array ), thisArg)
*/

// ***************
// The find Method
// ***************

/*
 The find() method: returns the value of the FIRST ELEMENT in the provided array that satisfies the provided BOOLEAN CONDITIONAL.
   SYNTAX: 'arr.find(callback(element, index, array), thisArg)'
   
 find() vs. filter():
   filter() returns all the elements that match the condition while the Find method only returns the first one. 
   The Filter method returns a new array while Find only returns the element itself, NOT an array.
*/

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const firstWithdrawal = movements.find((mov) => mov < 0);
// console.log(movements);
// console.log(firstWithdrawal);

// const account = accounts.find((accs) => accs.owner === "Jessica Davis");
// console.log(account);

// for (const accs of accounts)
//   if (accs.owner === "Jessica Davis") console.log(accs);

// *****************************
// The Magic of Chaining Methods
// *****************************

/*
 We can only chain a method after another one, IF the first one returns an ARRAY.

 Debuggin can be challenging with chaining. BUT we can inspect the current array at any stage of the chain using the third parameter of the callback function!

 PERFORMANCE: Chaining tons of methods one after the other can cause a real performance issues. Try to compress all the functionality that they do into as little methods as possible.

 BAD PRACTICE: It is bad in JavaScript to chain methods that mutate the underlying original array.
   Ex. DO NOT chain a method like the splice or the reverse method BECAUSE THEY MUTATE arrays
*/

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const eurToUsd = 1.1;

// const totalDepositUSD = movements
//   .filter((mov) => mov > 0)
//   .map((mov) => mov * eurToUsd)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(totalDepositUSD);

// *****************
// The reduce Method
// *****************

/*
 REMEMBER: executes a REDUCER function (that you provide) on each element of the array, resulting in SINGLE output value.

   SYNTAX: 'arr.reduce(callback(accumulator, currentValue, index, array), initialValue) {})' 
 
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
 REMEMBER: Creates a NEW ARRAY with all elements that pass the CONDITIONAL implemented by the provided callback function.

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
 
 USE: loops over arrays just like the forEach() EXCEPT the map() creates a NEW ARRAY and the elements values will be the result of a callback functions execution!!
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
