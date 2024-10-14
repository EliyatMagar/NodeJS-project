//example 1

// console.log('first process...');
// console.log('second process...');
// console.log('third process...');


//output
/*
   first process...
second process...
third process...
 */


// console.log("first process...");

// setTimeout(()=>{
//     console.log("2nd process");
// },3000)

// console.log('third process')



// first process...
// third process
// 2nd process



let  a=10;
let b=0;

setTimeout(()=>{
    let b=10;
},2000)

console.log(a+b);


