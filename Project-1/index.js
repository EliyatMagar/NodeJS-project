const express=require('express');

const app=express();


app.get('/products',(req,res)=>{
    res.send("product is updated")
})

app.listen(5000);