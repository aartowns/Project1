// Variables (can be changed)
var model = '2013 F150';
let make = 'Ford';

// Constants (can not be changed)
const vehicleType = 'Truck';

// Primitive Type Number
let age = 25;

// Primitive Type String
let firstName = 'Aaron';
let middleName = "Howard";
let lastName = `Townsend`;

// Primitive Type Bigint
let verybigNumber = 930471093471947n;

// Primitive Type Boolean
let isAwesome = false;

// Primitive Type Undefined
let nickName;

// Primitive Type Null
let favoriteAnimal = null;

// Primitive Type Symbol
const uniqueSymbol = Symbol();

// Reference Type Object 
let dog = {
    // Keys
    name: 'Luma',
    gender: 'Female',
    goodgirl: true,
};

// Reassigning Keys in Objects
dog.goodgirl = false;
dog['gender'] = 'Male';

// Arrays
let goodDogNames = ['Luma', 'Cat'];
// first spot is 0
console.log(goodDogNames[0]);
// checking length use .length
console.log(goodDogNames.length);

// Functions (perform an action or calculate a value)
// name is the parameter variable
function sayHello(name) {
    console.log('Hello ' + name);
}

sayHello('Aaron');

// Function used to calculate
function multiplyTwoNumbers(num1, num2) {
    return num1 * num2;
}
console.log(multiplyTwoNumbers(5, 5));

// Arithmetic Operators: +, -, *, /, %
// Examples
let a = 10;
// Incrementing
a = a + 1;
a = a +=1;
a++;
++a;

// Assignment Operator: Does not mean equal to. It is assigning a value.
let catName = 'Arlo';

// Comparison Operators: > Greater than, >= Greater than or equal to, < Less than, <= Less than or equal to
// Will return Boolean
let number1 = 18;
let number2 = 16;

const isNumber1Greater = number1 > number2;

console.log(isNumber1Greater);

// Equality Operators
let c = 5;
let d = '5';
// Loose equality: doesn't check if the data types are the same
// Truthy
console.log(c == d);

// Strict equality: does check if the data types are the same
console.log(c === d);

// Ternary Operator: conditionally assign a value to a variable
let myAge = 32;
const canDrive = myAge >= 16 ? true : false;
console.log(canDrive);

let points = 200;
const customerType = points > 100 ? 'Platinum' : 'Gold';
console.log(customerType);

// Logical Operators: || (or operator), && (and operator), ! (not operator), ?? (null coalescing)
// || 4 possible combinations with the two operands
console.log(true || true); //true
console.log(false || true); // true
console.log(true || false); // true
console.log(false || false); // false

let hasDog = true;
let hasCat = false;

const isDogOwner = hasDog || hasCat;

console.log(isDogOwner);

// && operator looks for 2 trues and if it is, it returns true
console.log(true && true); // true
console.log(false && true); // false
console.log(true && false); // false
console.log(false && false); // false

let myAgeInYears = 14;
let hasCar = true;

const canDriveCar = myAgeInYears >= 16 && hasCar;
console.log(canDriveCar);

// ! not operator returns inverse
console.log(!true);
let isCool = true;
const areYouReallyCool = !isCool;
console.log(areYouReallyCool);

// ?? null coalescing 
let h = null;
const result = h ?? false;

console.log(result);

// falsy: undefined, null, 0, false, "", NaN
let usersChosenColor = '';
let defaultColor = 'blue';

const currentWebsiteColor = usersChosenColor || defaultColor;

console.log(currentWebsiteColor); // returns blue

// 

function rollD20(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const diceRollD20 = rollD20(1, 20);
console.log(diceRollD20);




