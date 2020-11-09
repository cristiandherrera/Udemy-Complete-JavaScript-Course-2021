"use strict";

// ************************************
// An High-Level Overview of Javascript
// ************************************

// Javascript is a high-level, prototype-based object oriented, multi-paradigm, interpreted or just-in-time compiled, dynamic, single threaded, garbage-collected programming language with first-class funtions and a non blocking event loop concurrency model!!!

// High-Level
//  - DOES NOT have to manually ask the computer for memory resources when creating a variable.
//  - These are called abstractions, they take all the work away from us. Makeing it nice and easy to learn/use!!
//  - Downside? Yes, not nearly as fast or as optimized as low level languages like C.

// Garbage-collected
//  - Is a memory management tool; is an algorithim inside of the javascript engine that removes old unused objects from computer memory.

// Interpreted or Just-in-Time Compiled language
//  - Converts our javascript into machine code(0s & 1s) inside the javascript engine

// Multi-Paradigm
//  - A paradigm is an approach and midset of structuring code, which will direct your coding style and technique.
//    * Procedural programming
//    * Object-oriented programming(OOP)
//    * Funcitonal programming(FP)

// Prototype-based object-oriented
//  - Contains prewrtten object blue prints that have yet to have its classes defined.

// First-class functions
//  - Functions are simply treated as variables. We can pass them into other functions, and return them from functions.

// Dynamic
//  - Refers to Dynamically typed laguages: We do not have to define the datatype when declaring variables and can be automatically changed.

// Non-Blocking Event Loop Conurrency Model in a Single Thread
//  - concurrency model: how the javascript engine handles mulitple tasks happening at the same time.
//  - Javascript runs on a single thread; can only do one thing at a time.
//  - Event loop takes long running tasks and executes them in the 'background', and puts them on main thread when finished!

// *********************************
// The Javascript Engine and Runtime
// *********************************

// What is a javascript engine??
//  The engine is a program that executes javascript code!
//  Every browser has its own engine! Google chromes engine is the V8 engine! This engine is also used to execute server side JS code.(node js)
//  JS engines are composed of two parts; the call stack and heap!
//    - call stack: where our code is executed!
//    - heap: where objects are stored!

// Compiled languages vs Interpreted
//  Interpreted: Interpreter runs through the source code and executes it line by line.
//  Compiled: Entire code is converted into machine code at once, and written into a binary file that can be executed by a computer.
//  Just-in-time(JIT) compilation: Entire code is converted into machine code at once, then executed immediatley!(IS NOT written into binary file)

// Javascript Runtime Environment
//  Includes everything we need to run JS in the browser(in this case)!!
//  JS runtime is essentially a big container!! Within in this container are other smaller containers!!
//  These smaller containers in the JS runtime are the JS engine, the Web API's, Call Back Queue, and the Event Loop!
//    - JS Engine: Parses the JS code for errors. If none; reads rest from top to bottom!
//    - Web API's: funcitonalities provided to the engine, accessible on window object.
//    - Call Back Queue: A data stucture that contains all of the call back functions
//    - Event Loop: Takes events from call back queue and puts them in engine call stack to be executed!! (essentialy non blocking concurrency model)
