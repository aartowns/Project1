function multiply(a,b){
    let c = 0;
    while(a>0){
        c+=b;
        a--;
    }
    return c;
}

function rollD20(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const diceRollD20 = rollD20(1, 20);
console.log(diceRollD20);