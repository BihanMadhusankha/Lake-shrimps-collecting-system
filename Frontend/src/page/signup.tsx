import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Card, Typography, Input, Button, Flex } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import registerImage from '../assets/pngegg (7).png';
import { toast } from 'react-hot-toast';
const sriLankaNICRegex = /^[0-9]{9}[vVxX]$/;
import './signup.css'
import Navigation from '../Navigations/userNav';

const Signup = () => {
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    role: '',
    email: '',
    phone: '',
    nic: '',
    password: '',
    cpassword: '',
  });

  const navigate = useNavigate();

  const handleRegister = async (e: { preventDefault: () => void; }) => {
    e.preventDefault(); // Prevent default form submission

    const { firstname, lastname, role, email, phone, nic, password, cpassword } = data;

    try {
      const response = await axios.post('http://localhost:5001/SSABS/user/signup', {
        firstname,
        lastname,
        role,
        email,
        phone,
        nic,
        password,
        cpassword,
      });

      if (response.data) { 
        setData(response.data);
        toast.success('Signup successful');
        navigate('/SSABS/user/login'); 
      } else {
        toast.error(response.data.error); 
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again later.'); 
    }
  };

  const validatePassword = async (_: any, value: string) => {
    const minimumPasswordLength = 8;

    if (value.length < minimumPasswordLength) {
      return Promise.reject(`Password must be at least ${minimumPasswordLength} characters long.`);
    }

    const hasLowercase = /[a-z]/.test(value);
    const hasUppercase = /[A-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSymbol = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(value);

    const complexityRequirementsMet = [hasLowercase, hasUppercase, hasNumber, hasSymbol].filter(Boolean).length >= 3;

    if (!complexityRequirementsMet) {
      return Promise.reject('Password must contain a combination of lowercase letters, uppercase letters, numbers, and symbols.');
    }

    return Promise.resolve();
  };

  return (
    <div className=' '>
      <Navigation />
      <Card className='form-container col-12 d-flex justify-content-center ' align-items-center >
        <Flex gap="large">
          <Flex vertical flex={1}>
            <Typography.Title level={3} className='title'>Create an Account</Typography.Title>
            <Typography.Text type='secondary' strong className='slogan'>Join for exclusive access!</Typography.Text>

            <Form layout='vertical' onSubmitCapture={handleRegister}>
              <FormItem
                label='First Name'
                name='firstname'
                rules={[
                  { required: true, message: 'Please input your first name!' },
                  {
                    pattern: /^[A-Za-z]+$/, 
                    message: 'Please enter only letters for your first name.',
                  }
                ]}
              >
                <Input placeholder='Enter your Full Name' size='large' value={data.firstname} onChange={(e) => setData({ ...data, firstname: e.target.value })}></Input>
              </FormItem>
              <FormItem
                label='Last Name'
                name='lastname'
                rules={[
                  { required: true, message: 'Please input your last name!' },
                  {
                    pattern: /^[A-Za-z]+$/, 
                    message: 'Please enter only letters for your first name.',
                  }
                ]}
              >
                <Input placeholder='Enter your Last Name' size='large' value={data.lastname} onChange={(e) => setData({ ...data, lastname: e.target.value })}></Input>
              </FormItem>
              <FormItem
                label='User Role'
                name='role'
                rules={[{ required: true, message: 'Please input your User Role!' }]}
              >
                <select 
                  name="selecteduserrole" 
                  style={{ width: '100%', height: '40px', fontSize: '14px',borderRadius:'8px', padding:'5px'}} 
                  value={data.role} title="Select your role"
                  onChange={(e) => setData({ ...data, role: e.target.value })}
                >
                  <option value="user">User</option>
                  <option value="user">User</option>
                  <option value="seler">Seler</option>
                  <option value="vehicale_owner">Vehicale Owner</option>
                  <option value="content_creater">Content Creater</option>
                </select>
              </FormItem>
              <FormItem
                label='Email'
                name='email'
                rules={[{ required: true, message: 'Please input your email!' }
                  , {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                }
                ]}
              >
                <Input placeholder='Enter your Email' size='large' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })}></Input>
              </FormItem>
              <FormItem
                label='Phone'
                name='phone'
                rules={[
                  { required: true, message: 'Please input your phone!' },
                  { pattern: /^07\d{8}$/,
                    message: 'The input is not valid phone number (starts with 07 and has 8 digits)!',},
                ]}
              >
                <Input placeholder='Enter your Phone' size='large' value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })}></Input>
              </FormItem>
              <FormItem
                label='NIC'
                name='nic'
                rules={[
                  { required: true, message: 'Please input your NIC!' },
                  {
                    validator: (_, value) => {
                      if (!sriLankaNICRegex.test(value) || value.length !== 10) {
                        return Promise.reject('The input is not a valid Sri Lankan NIC (starts with 9 digits and ends with v, V, x, or X).');
                      }
                      return Promise.resolve(); 
                    },
                  },
                ]}
              >
                <Input placeholder='Enter your NIC' size='large' value={data.nic} onChange={(e) => setData({ ...data, nic: e.target.value })}></Input>
              </FormItem>
              <FormItem
                label='Password'
                name='password'
                rules={[
                  { required: true, message: 'Please input your password!' },
                  { validator: validatePassword },
                ]}
              >
                <Input.Password placeholder='Enter your Password' size='large' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })}></Input.Password>
              </FormItem>
              <FormItem
                label='Confirm Password'
                name='cpassword'
                rules={[
                  { required: true, message: 'Please confirm your password!' },
                  ({ getFieldValue }) => ({
                    validator: (_, value) => {
                      if (!value || getFieldValue('password') !== value) {
                        return Promise.reject('Passwords do not match!');
                      }
                      return Promise.resolve(); 
                    },
                  }),
                ]}
              >
                <Input.Password placeholder='Confirm your Password' size='large' value={data.cpassword} onChange={(e) => setData({ ...data, cpassword: e.target.value })}></Input.Password>
              </FormItem>
              <FormItem>
                <Button
                  type='primary'
                  htmlType='submit' size='large' className='btn'>
                  Create Account
                </Button>
              </FormItem>
              <FormItem>
                <Link to="/SSABS/user/login">
                  <Button className='btn' size='large'>Sign In</Button>
                </Link>
              </FormItem>
            </Form>
          </Flex>
          <Flex flex={1.5}>
            <img src={registerImage} alt="Register Img" className='auth-img' />
          </Flex>
        </Flex>
      </Card>
    </div>
  );
}

export default Signup;
