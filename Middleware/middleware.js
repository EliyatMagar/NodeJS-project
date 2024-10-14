module.exports=reqFilter=(req,res,next)=>{
    let Query=req.query.age;
    if(!Query){
        res.send("Please provide your age");
    }
    else if(Query<18){
        res.send("You are under aged");
    }
    else{
        next();
    }
}