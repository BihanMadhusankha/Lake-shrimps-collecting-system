const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Course = require('../models/courseSchema');
const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose'); 



const InstructerPage = async (req, res) => {
    try {
      const instructer = await User.find({ role: 'content_creater' });
      res.json({ data: instructer });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching sellers');
    }
  }


  const UploadVideoContent = asyncHandler(async (req, res) => {
    try {
      const file = req.file;
      const { title, category, description, youtubeLink } = req.body;
  
      if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
  
      console.log('req.user:', req.user); 
      const userId = req.user.id;
        const result = await cloudinary.uploader.upload(file.path, {
        folder: 'thumbnails',
      });
  
      const newCourse = new Course({
        title,
        category,
        description,
        youtubeLink,
        thumbnail: result.secure_url,
        user: userId, 
      });
  
      await newCourse.save();
  
      res.status(201).json({ message: 'Course uploaded successfully', imageUrl: result.secure_url });
    } catch (error) {
      console.error('Error uploading course:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  const getUploadedPost = async (req, res) => {
    try {
      const user= req.user.id 
      const courses = await Course.find({user });
      console.log(courses)
      res.json(courses);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }

  const deleteContent =  async (req, res) => {
    try {
        const courseId = req.params.courseId;
        console.log(courseId)
        await Course.findByIdAndDelete(courseId);
        res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(500).json({ message: 'Server Error' });
    }
}

  const updateCourse = async (req, res) => {
    try {
      const courseId = req.params.updatingCourseId;
      const { title, category, description, youtubeLink, thumbnail } = req.body;
      
  
      let course = await Course.findById(courseId);
  
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      course.title = title || course.title;
      course.category = category || course.category;
      course.description = description || course.description;
      course.youtubeLink = youtubeLink || course.youtubeLink;
      course.thumbnail = thumbnail || course.thumbnail;
  
      await course.save();
  
      res.json({ message: 'Course updated successfully', course });
    } catch (error) {
      console.error('Error updating course:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  }

  const getCourse = async (req, res) => {
    try {
        console.log(`Fetching courses for instructor ID: ${req.params.instructorId}`);
        const courses = await Course.find({ user: req.params.instructorId });
        if (courses.length === 0) {
            console.log(`No courses found for instructor ID: ${req.params.user}`);
        }
        res.json({ data: courses });
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ message: error.message });
    }
}


  module.exports = {
    InstructerPage: InstructerPage,
    UploadVideoContent:UploadVideoContent,
  getUploadedPost:getUploadedPost,
  deleteContent:deleteContent,
  updateCourse:updateCourse,
  getCourse:getCourse
  }
