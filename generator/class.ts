class extension {
    /**
     * this function sorts the numers by their divider
     * @param firstArray This firstArray gets the numbers from array
     * @param finalArray This finalArray puts the numbers out in the array
     * @param repeats This contains some number of repeats
     * @param numRemainder Defines that remaing value is number
     * @param numDivider Defines that numDivider is number
     * @returns something in finalArray
     */
    public static sortNumbers(firstArray: number[], finalArray: number[], repeats: number, numRemainder: number, numDivider: number) {
        for (let i: number = 0; i <= repeats; i++)
        {
          if(firstArray[i] % numDivider == numRemainder)
          {
            finalArray.push(firstArray[i]);
          }  
        }
        return finalArray;
    }
    /**
     * this function sorts prime numbers
     * @param firstArray This firstArray gets the numbers from array
     * @param finalArray This finalArray puts the numbers out in the array
     * @param repeats This repeats contains some number of repeats
     * @returns something in finalArray
     */
    public static sortPrimeNumbers(firstArray:number[], finalArray: number[], repeats: number)
    { 
    for (let i: number = 0; i <= repeats; i++)
    {
        let isPrime = true;
        for (let j: number = 2; j * j < firstArray[i]; j++) {
            if(firstArray[i] % j == 0 )
            {
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            finalArray.push(firstArray[i]); 
        }
    }
    return finalArray;
    }
}
export default extension;