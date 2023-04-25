const express=require("express");
const {connection}=require("./config/db.js");
require("dotenv").config();

const { UserModel } = require("./models/user.model.js");

const cors=require("cors");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const { flightRouter } = require("./routes/flight.router.js");
const { bookingRouter } = require("./routes/booking.router.js");
const { BookingModel } = require("./models/booking.model.js");

const app=express();

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome to Air Ticket Booking Backend");
});

app.post("/register",async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        const check=await UserModel.find({email});
        if(check.length>0){
            res.send({"msg":"Please Login"});
        }else{
            bcrypt.hash(password,7, async(err,hash)=>{
                if(err){
                    console.log("bcrypt hash error");
                }else{
                    const user=new UserModel({name,email,password:hash});
                    await user.save();
                    res.status(201).send({"msg":"Successfully registered"});
                }
            })
        }
    }catch(err){
        res.status(404).send({"msg":"Error in registering"});
    }
});

app.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    // console.log(req.body)
    try{
        const user=await UserModel.find({email});
        if(user.length==0){
            res.send({"msg":"Wrong email or not registered"});
        }else{
            bcrypt.compare(password,user[0].password, async(err,result)=>{
                if(err){
                    console.log("bcrypt compare error");
                }else{
                    const token=jwt.sign({userID:user[0]._id},process.env.key);
                    res.status(201).send({"msg":"Login Successfull","token":token});
                }
            })
        }
    }catch(err){
        res.status(404).send({"msg":"Error in Logging in"});
    }
});

app.use("/flights",flightRouter);
app.use("/booking",bookingRouter);

app.get("/dashboard", async(req,res)=>{
    try{
        const bookings=await BookingModel.find();
        res.status(200).send(bookings);
    }catch(err){
        res.status(404).send({"msg":"Error in fetching all bookings data"});
    }
})


app.listen(process.env.port,async ()=>{
    try{
        await connection;
        console.log("Connected to DB");
    }catch(err){
        console.log("Error connecting to DB");
    }
    console.log(`Listening on port ${process.env.port}`);
})