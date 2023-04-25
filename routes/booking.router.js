const express=require("express");
const {BookingModel}=require("../models/booking.model.js");
const {authenticate}=require("../middlewares/authenticate.mw.js");
const { UserModel } = require("../models/user.model.js");
const { FlightModel } = require("../models/flight.model.js");

const bookingRouter=express.Router();

bookingRouter.post("/", authenticate, async (req,res)=>{
    const payload=req.body;
    try{
        const user=await UserModel.findById(payload.userID);
        const flight=await FlightModel.findById(payload.flightID);

        const booking=new BookingModel({user,flight});
        await booking.save();
        res.status(201).send({"msg":"booking successfull"});
    }catch(err){
        res.status(404).send({"msg":"Error in booking flight"});
    }
})

module.exports={bookingRouter};