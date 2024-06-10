const mongoose=require("mongoose");
require("dotenv").config();

mongoose.connect("mongodb://localhost:27017/athena").then(
    ()=>{
        console.log("connected successfully");
    }
).catch((err)=>{
    console.log("error"+err);
})