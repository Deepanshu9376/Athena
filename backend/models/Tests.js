const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  testName: String,
  sections: [
    {
      id: String,
      questions: String,
      options: [String],
      correct: Number,
    },
  ],
});

mongoose.model('Test', testSchema);