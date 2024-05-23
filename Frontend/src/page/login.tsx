import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, Flex, Form, Input, Typography } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import loginImage from '../assets/cartoon-t-shirt-drawing-photography-shrimps-png-clipart.jpg';
import toast from 'react-hot-toast';
import { AuthContext } from './AuthenticationContext';

interface LoginData {
  email: string;
  password: string;
}

function Login() {
  const [data, setData] = useState<LoginData>({ email: '', password: '' });
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = data;

    try {
      const response = await axios.post('http://localhost:5001/SSABS/user/login', {
        email,
        password,
      });

      if (response.data.status === 'success') {
        localStorage.setItem('accessToken', response.data.accessToken);
        setToken(response.data.accessToken);
        setData(response.data);
        toast.success('Login successful');

        if (response.data.user.role === 'admin') {
          navigate('/SSABS/admin/dashboard');
        } else {
          navigate('/SSABS/user/userhome');
        }
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again later.');
    }
  };


  return (
    <Card className='form-container col-12 ' align-items-center >
      <Flex gap="large">
        <Flex vertical flex={1}>
          <Typography.Title level={3} className='title'>Sign In</Typography.Title>
          <Typography.Text type='secondary' strong className='slogan'>Unlock your account!</Typography.Text>

          <Form layout='vertical' onSubmitCapture={handleLogin}>

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
              label='Password'
              name='password'
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password placeholder='Enter your Password' size='large' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })}></Input.Password>
            </FormItem>

            <FormItem>
              <Button
                type="primary"
                htmlType='submit' size='large' className='btn'>
                Sign In

              </Button>
            </FormItem>
            <FormItem>
              <Link to="/SSABS/user/signup">
                <Button className='btn' size='large'>Create an Account</Button>
              </Link>
            </FormItem>

            <FormItem>
              <Link to={'/SSABS/user/forgetpassword'}>
              <Button  className='btn' size='large'>Forgot Password</Button>
              </Link>
            </FormItem>
          </Form>
        </Flex>
        <Flex flex={1.5}>
          <img src={loginImage} alt="Register Img" className='auth-img' />
        </Flex>
      </Flex>
    </Card>
  );
}

export default Login;



