const mongoose=require("mongoose");

const bookingSchema=mongoose.Schema({
    user:{type:Object, required:true},
    flight:{type:Object, required:true}
},{versionKey:false});

const BookingModel=mongoose.model("booking",bookingSchema);

module.exports={BookingModel};