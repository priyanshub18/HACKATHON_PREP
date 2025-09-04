// //CALLBACKS 

// let a = 4;
// let b = 5;

// function operator(a , b , callback){
//     callback(a,  b);
// }



// function add(a , b){
//  console.log(a + b);

// }

// function subtract(a , b){
//     console.log(a - b);
// }

// function multiply(a , b){
//     console.log(a * b);
// }

// function divide(a , b){
//     console.log(a / b);
// }

// operator(a, b, add);
// operator(a, b, subtract);
// operator(a, b, multiply);
// operator(a, b, divide); 


//CALLBACK HELLS -> promises 



//synchronous and asynchronous code 

//synchronous code 


// console.log("1st Hello");
// console.log("1st World");

// //asynchronous code 

// setTimeout(() => { 
//     console.log("2nd Hello");
//     setTimeout(() => {
//         console.log("3rd Hello");
//         setTimeout(() => {
//             console.log("4th Hello");
//         }, 1000);
//     }, 2000);
//  }, 3000);  // 3000 milliseconds = 3 seconds
// console.log("2nd World");
// console.log("3rd World");
// console.log("4th World");


// //promises 




// async await 

async function getData(){
    let data =  await new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("1st Hello");
            resolve("Hello");
        }, 8000);
    });
    let data2 =  await new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("2nd Hello");
            resolve("Hello");
        }, 1000);
    });
    let data3 =  await new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("3rd Hello");
            setTimeout(() => {
                console.log("4th Hello");
                // resolve("Hello");
            }, 2000);
            resolve("Hello");
        }, 2000);
    });
    console.log(data);
    console.log(data2);
    console.log(data3);
}

getData();


// fetch api 