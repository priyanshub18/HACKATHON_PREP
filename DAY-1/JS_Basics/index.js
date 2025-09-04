// console.log("Hello World");
// Client Side on the browser 
// Server side on the nodejs  -> IT IS A JS runtime environment  -> BACKEND CODE:

// how to do a comment 

/* 
This is a multi line comment
*/

// ;

// console.log("Hello World")

let a = 4;
const b = 7;

a  = a + 5;
// b = b + 5;

console.log(a);
console.log(b);


//identifiers  -> LEARN 

//  var 
let c = 10000000000000000000;
console.log(typeof c);



let name = "John";
console.log(typeof name);

let isLoggedIn = true;
console.log(typeof isLoggedIn);


let arr = [1, 2, 3, 4, 5 , "Gheeshan" , 3.42];
console.log(typeof arr);

let obj = {name: "John", age: 20, salary: 10000000000000000000};
console.log(typeof obj);


// Data Types 
// 1. Number
// 2. String
// 3. Boolean
// 4. Null
// 5. Undefined
// 6. Object
// 7. Array
// 8. Function



operators 
// + , - , * , / , % , ** , ++ , -- , == , === , != , !== , > , < , >= , <= , && , || , !

let x = 10;
let y = "10";

// console.log(x + y);
// console.log(x - y);
// console.log(x * y);
// console.log(x / y);
// console.log(x % y);
// console.log(x ** y);
// console.log(x++);
// console.log(x--);
// console.log(x > y);
// console.log(x < y);
// console.log(x >= y);
// console.log(x <= y);




console.log(x == y); // LOOSE EQUALITY compares the value
console.log(x === y); // STRICT EQUALITY compares the value and the type
console.log(x != y);
console.log(x !== y);



console.log(x && y);  // AND 
console.log(x || y);  // OR OPERATOR

console.log(!x); // NOT OPERATOR



if(x > y){
    console.log("x is greater than y");
}else{
    console.log("x is less than y");
}

// 2 ways to declare a function

//NORMAL WAY

function add(a, b){
    return a + b;
}

console.log(add(10, 20));   


// ARROW FUNCTION

const add = (a, b) => {
    return a + b;
}

console.log(add(10, 20));


// FOR LOOP

for(let i = 0; i < 10; i++){
    console.log(i);
}


// WHILE LOOP   

let i = 0;
while(i < 10){
    console.log(i);
    i++;
}


// DO WHILE LOOP

do{   
    console.log(i);
    i++;
}while(i < 10);


// FOR OF LOOP

for(let i of arr){
    console.log(i);
}


for(let i in arr){
    console.log(i);
}



// FOR EACH LOOP

arr.forEach(i => {
    console.log(i);
});   


// MAP LOOP

const newArr = arr.map(i => {
    return i * 2;
});

console.log(newArr);

// push , pop , shift , unshift 




