"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var class_1 = __importDefault(require("./class"));
var integer = {
    MAX_SAFE_INTEGER: 9007199254740991,
    caseinArray: false
};
var numArray = [];
var evenArray = [];
var evenArrayDivBy4 = [];
var evenArrayDivBy6 = [];
var evenArrayDivBy8 = [];
var oddArray = [];
var primeArray = [];
//This while loop defines the number of numbers, their span and not to be repeated
while (numArray.length != 100) {
    var randomNum = randomNumber(1, integer.MAX_SAFE_INTEGER);
    var caseinArray = controlOfNums(numArray.length, randomNum);
    if (!caseinArray)
        numArray.push(randomNum);
    integer.caseinArray = true;
}
//numArray sorts numbers from smallest to largest
numArray = numArray.sort(function (num1, num2) { return num1 - num2; });
//this prints numbers in string
var allNums = numArray.toString();
console.log("Generated numbers are: " + allNums);
//this extension prints even numbers with their divider
class_1.default.sortNumbers(numArray, evenArray, numArray.length, 0, 2);
var evenNums = evenArray.toString();
console.log("Even Numbers are: " + evenNums);
//these extensions prints even numbers with their divider
console.log("Even numbers divisible by 2 are: " + evenNums);
class_1.default.sortNumbers(evenArray, evenArrayDivBy4, evenArray.length, 0, 4);
var evenNums4 = evenArrayDivBy4.toString();
console.log("Even numbers divisible by 4 are: " + evenNums4);
class_1.default.sortNumbers(evenArray, evenArrayDivBy6, evenArray.length, 0, 6);
var evenNums6 = evenArrayDivBy6.toString();
console.log("Even numbers divisible by 6 are: " + evenNums6);
class_1.default.sortNumbers(evenArray, evenArrayDivBy8, evenArray.length, 0, 8);
var evenNums8 = evenArrayDivBy8.toString();
console.log("Even numbers divisible by 8 are: " + evenNums8);
//this extension prints odd numbers string
class_1.default.sortNumbers(numArray, oddArray, numArray.length, 1, 2);
var oddNums = oddArray.toString();
console.log("Odd Numbers are: " + oddNums);
//this prime Array prints prime numbers string
primeArray = class_1.default.sortPrimeNumbers(oddArray, primeArray, oddArray.length);
var primeNums = primeArray.toString();
console.log("Prime Numbers are: " + primeArray);
/**
 * This function generates random numbers
 * @param min_num defines that min_num is number
 * @param max_num defines that max_num is number
 * @returns integer from span
 */
function randomNumber(min_num, max_num) {
    return Math.floor(Math.random() * (max_num - min_num)) + min_num;
}
/**
* This function ensures that numbers are not repeated
* @param repeatsControl defines number of repeats of this function
* @param integerControled defines that value is number
* @returns boolean
*/
function controlOfNums(repeatsControl, integerControled) {
    var control = false;
    for (var i = 0; i <= repeatsControl; i++) {
        if (integerControled == numArray[i]) {
            control = true;
            break;
        }
    }
    if (control)
        return true;
    if (!control)
        return false;
}
