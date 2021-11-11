"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var extension = /** @class */ (function () {
    function extension() {
    }
    /**
     * this function sorts the numers by their divider
     * @param firstArray This firstArray gets the numbers from array
     * @param finalArray This finalArray puts the numbers out in the array
     * @param repeats This contains some number of repeats
     * @param numRemainder Defines that remaing value is number
     * @param numDivider Defines that numDivider is number
     * @returns something in finalArray
     */
    extension.sortNumbers = function (firstArray, finalArray, repeats, numRemainder, numDivider) {
        for (var i = 0; i <= repeats; i++) {
            if (firstArray[i] % numDivider == numRemainder) {
                finalArray.push(firstArray[i]);
            }
        }
        return finalArray;
    };
    /**
     * this function sorts prime numbers
     * @param firstArray This firstArray gets the numbers from array
     * @param finalArray This finalArray puts the numbers out in the array
     * @param repeats This repeats contains some number of repeats
     * @returns something in finalArray
     */
    extension.sortPrimeNumbers = function (firstArray, finalArray, repeats) {
        for (var i = 0; i <= repeats; i++) {
            var isPrime = true;
            for (var j = 2; j * j < firstArray[i]; j++) {
                if (firstArray[i] % j == 0) {
                    isPrime = false;
                    break;
                }
            }
            if (isPrime) {
                finalArray.push(firstArray[i]);
            }
        }
        return finalArray;
    };
    return extension;
}());
exports.default = extension;
