const router=require('express').Router();
const User=require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
//Register new user

router.post('/register',async(req,res)=>{
    try {
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(req.body.password,salt);

        const newUser=new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword,
        });

        const savedUser=await newUser.save();
        res.status(201).json(savedUser);

    } catch (error) {
        res.status(500).json(error);
    }
});


//login user

router.post('/login',async(req,res)=>{
    try {
        const user=await User.findOne({email:req.body.email});
        if(!user){
           return res.status(404).json("User not found")
        }

        const validPassword=await bcrypt.compare(req.body.password,user.password);
        if(!validPassword) return res.status(400).json("Invalid password.");

        const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1hr'});

        res.header('Authorization',`Bearer ${token}`).json({token});
    } catch (error) {
        res.status(500).json(error);
    }
})


module.exports=router;