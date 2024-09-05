/**
 * Description placeholder
 * @param {number} min
 * @param {number} max
 */
function rollD20(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const diceRollD20 = rollD20(1, 20);
console.log(diceRollD20);