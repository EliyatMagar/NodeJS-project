const express=require('express');
const reqFilter=require('./middleware.js');


const app=express();


app.get('',reqFilter,(req,res)=>{
    res.send("this is home page");
});


app.get('/about',(req,res)=>{
    res.send("this is about page");
});

app.get('/user',reqFilter,(req,res)=>{
    res.send("this is User page");
});



app.listen(3000);