import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ContentNav from './contentNav';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface Course {
  _id: string;
  title: string;
  category: string;
  description: string;
  youtubeLink: string;
  thumbnail: string;
}

const UploadedContent: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [updatingCourseId, setUpdatingCourseId] = useState<string | null>(null);
  const [updatedCourse, setUpdatedCourse] = useState<Course | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError('No access token found. Please log in.');
        return;
      }
      try {
        const response = await axios.get<Course[]>('http://localhost:5001/allInstructer/uploadedpost', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setCourses(response.data);
      } catch (error) {
        setError('Error fetching courses');
        console.error('Error fetching courses', error);
      }
    };

    fetchCourses();
  }, []);

  const handleDelete = async (courseId: string) => {
    console.log(courseId);
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setError('No access token found. Please log in.');
      return;
    }
    try {
      await axios.delete(`http://localhost:5001/allInstructer/uploadedpost/${courseId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setCourses(courses.filter(course => course._id !== courseId));
    } catch (error) {
      console.error('Error deleting course', error);
    }
  };

  const handleUpdate = (courseId: string) => {
    const courseToUpdate = courses.find(course => course._id === courseId);
    if (courseToUpdate) {
      setUpdatingCourseId(courseId);
      setUpdatedCourse(courseToUpdate);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (updatedCourse) {
      setUpdatedCourse({ ...updatedCourse, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    if (updatedCourse) {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          setError('No access token found. Please log in.');
          return;
        }
        await axios.put(`http://localhost:5001/allInstructer/uploadedpost/${updatingCourseId}`, updatedCourse, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setCourses(courses.map(course => {
          if (course._id === updatingCourseId) {
            return updatedCourse;
          }
          return course;
        }));
        setUpdatingCourseId(null);
        setUpdatedCourse(null);
      } catch (error) {
        console.error('Error updating course', error);
      }
    }
  };

  const downloadPDF = async () => {
    const input = document.getElementById('table-to-pdf');
    if (input) {
      // Hide columns
      const actions = document.querySelectorAll('.actions');
      const thumbnails = document.querySelectorAll('.thumbnail');
      actions.forEach(el => (el as HTMLElement).style.display = 'none');
      thumbnails.forEach(el => (el as HTMLElement).style.display = 'none');

      // Generate PDF
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('courses.pdf');

      // Show columns again
      actions.forEach(el => (el as HTMLElement).style.display = 'table-cell');
      thumbnails.forEach(el => (el as HTMLElement).style.display = 'table-cell');
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <ContentNav/>
      <div style={{ padding: '20px' }}>
        <h2>My Courses</h2>
        <input
          type="text"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={searchInputStyle}
        />
        <button onClick={downloadPDF} style={downloadButtonStyle}>Download PDF</button>
        {error ? <p style={{ color: 'red' }}>{error}</p> : (
          <table id="table-to-pdf" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Title</th>
                <th style={tableHeaderStyle}>Category</th>
                <th style={tableHeaderStyle}>Description</th>
                <th style={tableHeaderStyle} className="thumbnail">Thumbnail</th>
                <th style={tableHeaderStyle}>YouTube Link</th>
                <th style={tableHeaderStyle} className="actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map(course => (
                <tr key={course._id}>
                  <td style={tableCellStyle}>{course.title}</td>
                  <td style={tableCellStyle}>{course.category}</td>
                  <td style={tableCellStyle}>{course.description}</td>
                  <td style={tableCellStyle} className="thumbnail">
                    <img src={course.thumbnail} alt={course.title} style={{ width: '100px' }} />
                  </td>
                  <td style={tableCellStyle}>
                    <a href={course.youtubeLink} target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
                  </td>
                  <td style={tableCellStyle} className="actions">
                    {updatingCourseId === course._id ? (
                      <>
                        <input placeholder='title' type="text" name="title" value={updatedCourse?.title} onChange={handleChange} style={inputStyle} />
                        <input placeholder='category' type="text" name="category" value={updatedCourse?.category}                           onChange={handleChange} style={inputStyle} />
                           <input placeholder='discription' type="text" name="description" value={updatedCourse?.description} onChange={handleChange} style={inputStyle} />
                           <input placeholder='youtubelink' type="text" name="youtubeLink" value={updatedCourse?.youtubeLink} onChange={handleChange} style={inputStyle} />
                           <button style={submitButtonStyle} onClick={handleSubmit}>Submit</button>
                         </>
                       ) : (
                         <>
                           <button style={updateButtonStyle} onClick={() => handleUpdate(course._id)}>Update</button>
                           <button style={deleteButtonStyle} onClick={() => handleDelete(course._id)}>Delete</button>
                         </>
                       )}
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           )}
         </div>
       </div>
     );
   };

   export default UploadedContent;

   const tableHeaderStyle: React.CSSProperties = {
     padding: '8px',
     backgroundColor: '#f2f2f2',
     border: '1px solid #ddd'
   };

   const tableCellStyle: React.CSSProperties = {
     padding: '8px',
     border: '1px solid #ddd'
   };

   const updateButtonStyle: React.CSSProperties = {
     backgroundColor: '#007bff',
     color: 'white',
     padding: '8px 12px',
     border: 'none',
     cursor: 'pointer',
     marginRight: '5px'
   };

   const deleteButtonStyle: React.CSSProperties = {
     backgroundColor: '#dc3545',
     color: 'white',
     padding: '8px 12px',
     border: 'none',
     cursor: 'pointer'
   };

   const submitButtonStyle: React.CSSProperties = {
     backgroundColor: '#28a745',
     color: 'white',
     padding: '8px 12px',
     border: 'none',
     cursor: 'pointer',
     marginRight: '5px'
   };

   const inputStyle: React.CSSProperties = {
     padding: '5px',
     marginBottom: '5px',
     width: '100%'
   };

   const downloadButtonStyle: React.CSSProperties = {
     backgroundColor: '#007bff',
     color: 'white',
     padding: '8px 12px',
     border: 'none',
     cursor: 'pointer',
     marginBottom: '20px'
   };

   const searchInputStyle: React.CSSProperties = {
     padding: '8px',
     marginBottom: '20px',
     width: '100%',
     boxSizing: 'border-box'
   };

