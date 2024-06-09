const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  youtubeLink: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String, // Ensure this matches the field name used in your code
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
