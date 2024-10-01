const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(cors());

require("./db")
require("./models/Newuser")
const authRoutes=require("./routes/auth");
app.use(authRoutes);

require("./models/Courses")
const courseRoutes=require("./routes/courseAuth");
app.use(courseRoutes);

require("./models/Tests")
const testRoutes=require("./routes/testAuth");
app.use(testRoutes);

app.get("/",(req,res)=>{
  res.send("This Signup page kaam kar rha hai")
})
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
