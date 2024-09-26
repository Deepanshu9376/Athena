const express=require('express');
const router=express.Router();

const mongoose = require("mongoose");
const Courses=mongoose.model('Course');
const jwt = require("jsonwebtoken");

router.post("/courseName",async(req,res)=>{
    try {
        const {courseName} = req.body;
        // const courseName = req.params.courseName;
        const courseData = await Courses.findOne({courseName});
        if (!courseData) return res.status(404).send('Course not found');
        res.send(courseData);
        console.log(courseData);
      } catch (err) {
        res.status(500).send('Server error');
      }
})

module.exports = router;
