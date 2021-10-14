/**  nastavenie konštanty readline*/
const readline = require('readline');

/**  nastavenie konštanty r tak, aby do nej mohol užívateľ písať*/
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**  pomocou konštanty rl.question sa spýtame na to, aký typ počítania chce používateľ využívať*/
rl.question('Ahoj, najprv mi povedz, čo chceš počítať? sčítavanie (s), odpočítavanie (o), násobenie (n), delenie (d) : ', (answer1) => {

    /**  vloženie poďakovania */
    console.log('Ďakujem :)')

    /**  nastavenie podmienky if*/
    if (answer1 == 's'){
        /** pomocou rl.question zistíme čísla s ktorými chce užívateľ počítať */
        rl.question('Prosím, zadaj prvé číslo : ', (num1) => {
            rl.question('Prosím, zadaj druhé číslo : ', (num2) => {
                /** cez premennú var si určíme hodnotu result1 */
                var result1 = (+num1) + (+num2);
                /** pomocou console.log ukážeme používateľovi výsledok */
                console.log(`Súčet týchto čísel je: ${result1}`);
                /** a pomocou rl.close() zatvorime našu kalkulačku */
                rl.close();
            });
        });
    }
/**  nastavenie podmienky else if*/
    else if (answer1 == 'o'){
        /** pomocou rl.question zistíme čísla s ktorými chce užívateľ počítať */
        rl.question('Prosím, zadaj prvé číslo : ', (num1) => {
            rl.question('Prosím, zadaj druhé číslo  : ', (num2) => {
                /** cez premennú var si určíme hodnotu result2 */
                var result2 = (+num1) - (+num2);
                /** pomocou console.log ukážeme používateľovi výsledok */
                console.log(`Rozdiel týchto čísel je: ${result2}`);
                /** a pomocou rl.close() zatvorime našu kalkulačku */
                rl.close();
            });
        });
    }
/**  nastavenie podmienky else if*/
    else if (answer1 == 'n'){
        /** pomocou rl.question zistíme čísla s ktorými chce užívateľ počítať */
        rl.question('Prosím, zadaj prvé číslo : ', (num1) => {
            rl.question('Prosím, zadaj druhé číslo  : ', (num2) => {
                /** cez premennú var si určíme hodnotu result3 */
                var result3 = (+num1) * (+num2);
                /** pomocou console.log ukážeme používateľovi výsledok */
                console.log(`Súčin týchto čísel je: ${result3}`);
                /** a pomocou rl.close() zatvorime našu kalkulačku */
                rl.close();
            });
        });
    }
/**  nastavenie podmienky else if*/
    else if (answer1 == 'd'){
        /** pomocou rl.question zistíme čísla s ktorými chce užívateľ počítať */
        rl.question('Prosím, zadaj prvé číslo : ', (num1) => {
            rl.question('Prosím, zadaj druhé číslo : ', (num2) => {
                /** cez premennú var si určíme hodnotu result4 */
                var result4 = (+num1) / (+num2);
                /** pomocou console.log ukážeme používateľovi výsledok */
                console.log(`Podiel týchto čísel je: ${result4}`);
                /** a pomocou rl.close() zatvorime našu kalkulačku */
                rl.close();
            });
        });
    }

    /** ak užívateľ nezadá správne hodnoty pri otázke, tak bude presmerovaný na else */
    else
    {
        /** pomocou console.log vysvetlíme, aby si najprv vybral správnu operáciu */
        console.log('Ale najprv vyber správnu operáciu ;)');
        /** a pomocou rl.close() zatvorime kalkulačku, aby do nej mohol užívateľ znova zadať správne hodnoty */
        rl.close();
    }
});