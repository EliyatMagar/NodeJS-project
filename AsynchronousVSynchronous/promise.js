//promise is used to handle the asynchronous data


let a=20;
let b=0;

let waitingData=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(30);
    },4000)
})

waitingData.then((data)=>{
    console.log(a+data);
});