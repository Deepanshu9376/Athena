const express=require('express');
const router=express.Router();

const mongoose = require("mongoose");
const Tests=mongoose.model('Test');
// const jwt = require("jsonwebtoken");

router.post("/testName",async(req,res)=>{
    try {
        const {testName} = req.body;
        // const testName = req.params.testName;
        const testData = await Tests.findOne({testName});
        if (!testData) return res.status(404).send('Course not found');
        res.send(testData);
        console.log(testData);
      } catch (err) {
        res.status(500).send('Server error');
      }
})

module.exports = router;
