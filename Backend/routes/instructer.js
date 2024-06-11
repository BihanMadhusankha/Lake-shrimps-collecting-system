const express = require('express');
const validateToken = require('../midleware/validationTokenHandler');
const upload = require('../midleware/uploadMiddleware');
const {InstructerPage,UploadVideoContent,
    getUploadedPost,deleteContent,
    updateCourse,getCourse}= require('../contollers/instructerController')

const router = express.Router();

router.get('/', InstructerPage);
router.post('/uploadfile',validateToken, upload.single('thumbnail'), UploadVideoContent);
router.get('/uploadedpost',validateToken, getUploadedPost);
router.delete('/uploadedpost/:courseId',validateToken, deleteContent);
router.put('/uploadedpost/:updatingCourseId',validateToken, updateCourse);
router.get('/:instructorId/courses', getCourse);


module.exports = router;