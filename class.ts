class division {
    /**
     * this function sorts the numers by their divider
     * @param fromArray This fromArray gets the numbers from array
     * @param resultArray This resultArray puts the numbers out in the array
     * @param numOfRepeats This numOfRepeats contains some number of repeats
     * @param remainder defines that remaing value is number
     * @param divider define that divider is number
     * @returns something in 
     */
    public static divisionNum(fromArray: number[], resultArray: number[], numOfRepeats: number, remainder: number, divider: number) {
        for (let i: number = 0; i <= numOfRepeats; i++)
        {
          if(fromArray[i] % divider == remainder)
          {
            resultArray.push(fromArray[i]);
          }  
        }
        return resultArray;
    }
    /**
     * this function sorts prime numbers
     * @param fromArray This fromArray gets the numbers from array
     * @param resultArray This resultArray puts the numbers out in the array
     * @param numOfRepeats This numOfRepeats contains some number of repeats
     * @returns something in resultArray
     */
    public static primeNumbers(fromArray:number[], resultArray: number[], numOfRepeats: number)
    { 
    for (let i: number = 0; i <= numOfRepeats; i++)
    {
        let isPrime = true;
        for (let j: number = 2; j * j < fromArray[i]; j++) {
            if(fromArray[i] % j == 0 )
            {
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            resultArray.push(fromArray[i]); 
        }
    }
    return resultArray;
    }
}
export default division;