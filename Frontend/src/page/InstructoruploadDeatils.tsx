import React, { useState } from 'react';
import axios from 'axios';


const InstructorProfile: React.FC = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [youtubeLink, setYoutubeLink] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setVideo(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('description', description);
    if (image) formData.append('image', image);
    if (video) formData.append('video', video);
    if (youtubeLink) formData.append('youtubeLink', youtubeLink);

    try {
      await axios.post('/api/courses', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Course uploaded successfully!');
    } catch (error) {
      console.error('Error uploading course', error);
      alert('Failed to upload course.');
    }
  };

  return (
    <div className="container">
      <style>
        {`
        /* src/CSS/InstructorProfile.css */

        .container {
            width: 80%;
            margin: 0 auto;
            font-family: Arial, sans-serif;
            text-align: center;
          }
          
          h2 {
            margin-top: 20px;
            margin-bottom: 20px;
          }
          
          .upload-form {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          
          .upload-photo {
            width: 200px;
            height: 200px;
            background-color: #e0e0e0;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 20px;
            position: relative;
            overflow: hidden;
          }
          
          .upload-photo .file-upload {
            display: block;
            width: 100%;
            height: 100%;
            background-color: #fff;
            border: 2px solid #ccc;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
          
          .upload-photo input {
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
          }
          
          .form-fields {
            display: flex;
            flex-direction: column;
          }
          
          .form-fields input,
          .form-fields textarea {
            margin-bottom: 10px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
          }
          
          textarea {
            resize: none;
            height: 100px;
          }
          
          button {
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            border: none;
            cursor: pointer;
            border-radius: 4px;
          }
          
          button:hover {
            background-color: #0056b3;
          }
          
        
        `}
      </style>
      <h2>Upload Your Content</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="upload-photo">
          <label className="file-upload">
            <input type="file" accept="image/*" onChange={handleImageChange} />
            Choose Image
          </label>
        </div>
        <div className="form-fields">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <textarea
            placeholder="Description about your course"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
          />
          <input
            type="text"
            placeholder="YouTube Link (optional)"
            value={youtubeLink}
            onChange={(e) => setYoutubeLink(e.target.value)}
          />
          <button type="submit">Upload</button>
        </div>
      </form>
    </div>
  );
};

export default InstructorProfile;
