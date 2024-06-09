import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import ContentNav from '../ContentCreater/contentNav';
import { useNavigate } from 'react-router-dom';

const categories = [
  'Shrimp Biology',
  'Shrimp Farming',
  'Shrimp Recipes',
  'Shrimp Conservation',
  'Shrimp Diseases and Treatment',
];

const validationSchema = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .matches(/^[A-Z][a-zA-Z\s]*$/, 'Title must start with a capital letter and contain only letters and spaces'),
  category: yup
    .string()
    .oneOf(categories, 'Invalid category')
    .required('Category is required'),
  description: yup
    .string()
    .required('Description is required')
    .max(100, 'Description must be at most 100 characters long')
    .matches(/^[A-Z].*$/, 'Description must start with a capital letter'),
  youtubeLink: yup
    .string()
    .url('Invalid YouTube link')
    .required('YouTube link is required'),
  thumbnail: yup
    .mixed()
    .required('Thumbnail is required')
    .test('fileType', 'Unsupported File Format', (value) => {
      return value && ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type);
    }),
});

const InstructorProfile: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: '',
      category: categories[0],
      description: '',
      youtubeLink: '',
      thumbnail: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('category', values.category);
      formData.append('description', values.description);
      formData.append('youtubeLink', values.youtubeLink);
      if (values.thumbnail) formData.append('thumbnail', values.thumbnail);

      try {
        await axios.post('http://localhost:5001/SSABS/instructer/uploadfile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Include the token in the request headers
          },
        });
        alert('Course uploaded successfully!');
        navigate('/SSABS/content_creater/dashboard');
      } catch (error) {
        console.error('Error uploading course', error);
        alert('Failed to upload course.');
      }
    },
  });

  return (
    <div>
      <ContentNav />
      <div style={{ width: '80%', margin: '0 auto', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
        <style>
          {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          .fadeIn {
            animation: fadeIn 2s;
          }

          @keyframes buttonHover {
            from { background-color: #007bff; }
            to { background-color: #0056b3; }
          }

          button:hover {
            animation: buttonHover 0.5s forwards;
          }
          `}
        </style>
        <h2 style={{ marginTop: '20px', marginBottom: '20px' }} className="fadeIn">Upload Your Content</h2>
        <form onSubmit={formik.handleSubmit} className="upload-form" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="form-fields" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <label style={{ marginBottom: '5px' }}>Title</label>
            <input
              type="text"
              placeholder="Title"
              {...formik.getFieldProps('title')}
              style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            {formik.touched.title && formik.errors.title ? <div style={{ color: 'red', marginBottom: '10px' }}>{formik.errors.title}</div> : null}
            
            <label style={{ marginBottom: '5px' }}>Category</label>
            <select
              {...formik.getFieldProps('category')}
              style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {formik.touched.category && formik.errors.category ? <div style={{ color: 'red', marginBottom: '10px' }}>{formik.errors.category}</div> : null}
            
            <label style={{ marginBottom: '5px' }}>Description</label>
            <textarea
              placeholder="Description about your course"
              {...formik.getFieldProps('description')}
              style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', resize: 'none', height: '100px' }}
            />
            {formik.touched.description && formik.errors.description ? <div style={{ color: 'red', marginBottom: '10px' }}>{formik.errors.description}</div> : null}
            
            <label style={{ marginBottom: '5px' }}>Upload Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => {
                if (event.target.files && event.target.files.length > 0) {
                  formik.setFieldValue('thumbnail', event.target.files[0]);
                }
              }}
              style={{ marginBottom: '10px' }}
            />
            {formik.touched.thumbnail && formik.errors.thumbnail ? <div style={{ color: 'red', marginBottom: '10px' }}>{formik.errors.thumbnail}</div> : null}
            
            <label style={{ marginBottom: '5px' }}>YouTube Link</label>
            <input
              type="text"
              placeholder="YouTube Link"
              {...formik.getFieldProps('youtubeLink')}
              style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            {formik.touched.youtubeLink && formik.errors.youtubeLink ? <div style={{ color: 'red', marginBottom: '10px' }}>{formik.errors.youtubeLink}</div> : null}
            
            <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InstructorProfile;
