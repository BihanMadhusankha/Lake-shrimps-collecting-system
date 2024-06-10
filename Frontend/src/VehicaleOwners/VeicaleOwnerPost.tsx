import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import VehicleNav from './vehicleNav';

const validationSchema = yup.object({
  contactNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Contact number must be exactly 10 digits')
    .required('Contact number is required'),
  vehicleType: yup
    .string()
    .oneOf(['car', 'motorcycle', 'bicycle', 'truck'], 'Select a valid vehicle type')
    .required('Vehicle type is required'),
  licensePlate: yup
    .string()
    .matches(/^[A-Z]{2,3}-\d{4}$/, 'License plate must be in the format AAA-1234')
    .required('License plate is required'),
  additionalInfo: yup
    .string()
    .matches(/^[A-Z][a-zA-Z\s]*$/, 'Additional info must start with an uppercase letter and only contain letters and spaces')
    .max(100, 'Additional info must be at most 100 characters long'),
  photo: yup
    .mixed()
    .required('A vehicle photo is required')
    .test('fileType', 'Unsupported file format', (value) => {
      return value && ['image/jpg', 'image/jpeg', 'image/png'].includes((value as File).type);    }),
});

const RegisterVehicle: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      contactNumber: '',
      vehicleType: '',
      licensePlate: '',
      additionalInfo: '',
      photo: null as File | null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const data = new FormData();
      data.append('photo', values.photo as File);
      data.append('contactNumber', values.contactNumber);
      data.append('vehicleType', values.vehicleType);
      data.append('licensePlate', values.licensePlate);
      data.append('additionalInfo', values.additionalInfo);

      try {
         await axios.post('http://localhost:5001/SSABS/vehicaleOwn/products', data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        alert('Vehicle registered successfully');
        navigate('/SSABS/vehicale_owner/dashboard');
      } catch (error) {
        console.error('Error registering vehicle:', error);
        alert('Failed to register vehicle');
      }
    },
  });

  return (
    <div>
      <VehicleNav />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '20px', backgroundColor: '#f8f9fa' }}>
        <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', marginTop: '20px', width: '400px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>Register Your Vehicle</h3>
          <form onSubmit={formik.handleSubmit}>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="contactNumber" style={{ display: 'block', fontSize: '16px', color: '#333' }}>Contact Number</label>
              <input
                type="text"
                id="contactNumber"
                name="contactNumber"
                value={formik.values.contactNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                required
              />
              {formik.touched.contactNumber && formik.errors.contactNumber ? (
                <div style={{ color: 'red' }}>{formik.errors.contactNumber}</div>
              ) : null}
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="vehicleType" style={{ display: 'block', fontSize: '16px', color: '#333' }}>Vehicle Type</label>
              <select
                id="vehicleType"
                name="vehicleType"
                value={formik.values.vehicleType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                required
              >
                <option value="">Select a vehicle type</option>
                <option value="car">Car</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="bicycle">Bicycle</option>
                <option value="truck">Truck</option>
              </select>
              {formik.touched.vehicleType && formik.errors.vehicleType ? (
                <div style={{ color: 'red' }}>{formik.errors.vehicleType}</div>
              ) : null}
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="licensePlate" style={{ display: 'block', fontSize: '16px', color: '#333' }}>License Plate</label>
              <input
                type="text"
                id="licensePlate"
                name="licensePlate"
                value={formik.values.licensePlate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                required
              />
              {formik.touched.licensePlate && formik.errors.licensePlate ? (
                <div style={{ color: 'red' }}>{formik.errors.licensePlate}</div>
              ) : null}
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="additionalInfo" style={{ display: 'block', fontSize: '16px', color: '#333' }}>Additional Info</label>
              <input
                type="text"
                id="additionalInfo"
                name="additionalInfo"
                value={formik.values.additionalInfo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
              />
              {formik.touched.additionalInfo && formik.errors.additionalInfo ? (
                <div style={{ color: 'red' }}>{formik.errors.additionalInfo}</div>
              ) : null}
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="photo" style={{ display: 'block', fontSize: '16px', color: '#333' }}>Upload Vehicle Photo</label>
              <input
                type="file"
                id="photo"
                name="photo"
                onChange={(event) => {
                  if (event.currentTarget.files) {
                    formik.setFieldValue('photo', event.currentTarget.files[0]);
                  }
                }}
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                required
              />
              {formik.touched.photo && formik.errors.photo ? (
                <div style={{ color: 'red' }}>{formik.errors.photo}</div>
              ) : null}
            </div>
            <button type="submit" style={{ padding: '10px 20px', border: 'none', borderRadius: '5px', backgroundColor: '#28a745', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterVehicle;
