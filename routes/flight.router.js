const express=require("express");
const {FlightModel}=require("../models/flight.model.js");
const {authenticate}=require("../middlewares/authenticate.mw.js");

const flightRouter=express.Router();

flightRouter.get("/", async(req,res)=>{
    try{
        let flights=await FlightModel.find();
        res.status(200).send(flights);
    }catch(err){
        res.status(404).send({"msg":"Error in getting all flights data"});
    }
});

flightRouter.get("/:id", async(req,res)=>{
    const ID=req.params.id;
    try{
        let flight=await FlightModel.findById(ID);
        res.status(200).send(flight);
    }catch(err){
        res.status(404).send({"msg":"Error in getting specific flight data"});
    }
});

flightRouter.post("/", authenticate, async(req,res)=>{
    const payload=req.body;
    const flightNo=payload.flightNo;
    try{
        const check=await FlightModel.find({flightNo});
        if(check.length>0){
            res.send({"msg":"Flight already exists"});
        }else{
            const flight=new FlightModel(payload);
            await flight.save();
            res.status(201).send({"msg":"New flight added"});
        }
    }catch(err){
        res.status(404).send({"msg":"Error in adding new flight"});
    }
});

flightRouter.patch("/:id", authenticate, async(req,res)=>{
    const ID=req.params.id;
    const payload=req.body;
    //console.log(payload);
    try{
        const flight= await FlightModel.findByIdAndUpdate({_id:ID},payload);
        res.status(204).send({"msg":"Flight data updated"});
    }catch(err){
        res.status(404).send({"msg":"Error in updating flight data"});
    }
});

flightRouter.delete("/:id", authenticate, async(req,res)=>{
    const ID=req.params.id;
    try{
        const flight=await FlightModel.findByIdAndDelete(ID);
        res.status(202).send({"msg":"Flight data deleted"});
    }catch(err){
        res.status(404).send({"msg":"Error in deleting flight data"});
    }
});

module.exports={flightRouter};


