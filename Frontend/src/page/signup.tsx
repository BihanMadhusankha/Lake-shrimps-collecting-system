import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Card, Typography, Input, Button, Flex } from 'antd';
// import Alert from 'antd/es/alert/Alert'; // Optional for error display
import FormItem from 'antd/es/form/FormItem';
import registerImage from '../assets/pngegg (7).png';
import { toast } from 'react-hot-toast';

const Signup = () => {
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    role: '',
    email: '',
    birthday: '',
    gender: '',
    phone: '',
    nic: '',
    state: '',
    password: '',
    cpassword: '',
  });

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const { firstname, lastname, role, email, birthday, gender, phone, nic, state, password, cpassword } = data;

    try {
      const response = await axios.post('http://localhost:5001/SSABS/user/signup', {
        firstname,
        lastname,
        role,
        email,
        birthday,
        gender,
        phone,
        nic,
        state,
        password,
        cpassword,
      });
      if (response.data) { // Assuming successful signup
        setData(response.data);
        toast.success('Signup successful');
        navigate('/SSABS/user/login'); // Navigate to login page
      } else {
        toast.error(response.data.error); // Handle server-side errors
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again later.'); // User-friendly error message
    }
  };

  return (

    <Card className='form-container col-12 ' align-items-center >
      <Flex gap="large">
        <Flex vertical flex={1}>
          <Typography.Title level={3} className='title'>Create an Account</Typography.Title>
          <Typography.Text type='secondary' strong className='slogan'>Join for exclusive access!</Typography.Text>

          <Form layout='vertical' onSubmitCapture={handleRegister}>
            <FormItem
              label='First Name'
              name='firstname'
              rules={[{ required: true, message: 'Please input your first name!' }

              ]}

            >
              <Input placeholder='Enter your Full Name' size='large' value={data.firstname} onChange={(e) => setData({ ...data, firstname: e.target.value })}></Input>
            </FormItem>
            <FormItem
              label='Last Name'
              name='lastname'
              rules={[{ required: true, message: 'Please input your last name!' }]}

            >
              <Input placeholder='Enter your Last Name' size='large' value={data.lastname} onChange={(e) => setData({ ...data, lastname: e.target.value })}></Input>
            </FormItem>
            <FormItem
              label='User Role'
              name='role'
              rules={[{ required: true, message: 'Please input your User Role!' }

              ]}

            >
              <Input placeholder='Enter your User Role' size='large' value={data.role} onChange={(e) => setData({ ...data, role: e.target.value })}></Input>
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
              label='Birthday'
              name='birthday'
              rules={[{ required: true, message: 'Please input your birthday!' }]}
            >
              <Input placeholder='Enter your Birthday' size='large' value={data.birthday} onChange={(e) => setData({ ...data, birthday: e.target.value })}></Input>
            </FormItem>
            <FormItem
              label='Gender'
              name='gender'
              rules={[{ required: true, message: 'Please input your gender!' }]}
            >
              <Input placeholder='Enter your Gender' size='large' value={data.gender} onChange={(e) => setData({ ...data, gender: e.target.value })}></Input>
            </FormItem>
            <FormItem
              label='Phone'
              name='phone'
              rules={[{ required: true, message: 'Please input your phone!' }]}
            >
              <Input placeholder='Enter your Phone' size='large' value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })}></Input>
            </FormItem>
            <FormItem
              label='NIC'
              name='nic'
              rules={[{ required: true, message: 'Please input your NIC!' }]}
            >
              <Input placeholder='Enter your NIC' size='large' value={data.nic} onChange={(e) => setData({ ...data, nic: e.target.value })}></Input>
            </FormItem>
            <FormItem
              label='State'
              name='state'
              rules={[{ required: true, message: 'Please input your state!' }]}
            >
              <Input placeholder='Enter your State' size='large' value={data.state} onChange={(e) => setData({ ...data, state: e.target.value })}></Input>
            </FormItem>
            <FormItem
              label='Password'
              name='password'
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password placeholder='Enter your Password' size='large' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })}></Input.Password>
            </FormItem>
            <FormItem
              label='Confirm Password'
              name='cpassword'
              rules={[{ required: true, message: 'Please confirm your password!' }]}
            >
              <Input.Password placeholder='Confirm your Password' size='large' value={data.cpassword} onChange={(e) => setData({ ...data, cpassword: e.target.value })}></Input.Password>
            </FormItem>

            {/* {
                  error && (
                    <Alert description={errorMessage} type="error" showIcon closable className='alert'/>
                  )
                } */}

            <FormItem>
              <Button
                type='primary'
                htmlType='submit' size='large' className='btn'>
                {/* {loading ? <Spin/> : 'Create Account'} */}Create Account
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

  );
}

export default Signup;
