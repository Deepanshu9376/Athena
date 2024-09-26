const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseName: String,
  sections: [
    {
      id: String,
      title: String,
      videos: [
        {
          image: String,
          name: String,
          description: String,
          videoUrl: String,
        },
      ],
    },
  ],
});

mongoose.model('Course', courseSchema);