import React, { useState } from 'react';
import axios from 'axios';
import { Button, Card, Flex, Form, Input, Typography } from 'antd';
import loginImage from '../assets/cartoon-t-shirt-drawing-photography-shrimps-png-clipart.jpg';
import toast from 'react-hot-toast';

interface LoginData {
  email: string;
}

const ForgetPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/SSABS/user/forgetpassword', { email });
      if (response.data.status === 'success') {
        toast.success('Password reset email sent successfully');
      } else {
        toast.error(response.data.error || 'An error occurred. Please try again later.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
      console.error('Error sending email:', error);
    }
  };

  return (
    <Card className='form-container col-12 ' align-items-center>
      <Flex gap="large">
        <Flex vertical flex={1}>
          <Typography.Title level={3} className='title'>Forgot Password</Typography.Title>
          <Typography.Text type='secondary' strong className='slogan'>Reset your account password</Typography.Text>

          <Form layout='vertical'>
            <Form.Item
              label='Email'
              name='email'
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'The input is not valid E-mail!' }
              ]}
            >
              <Input placeholder='Enter your Email' size='large' value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>

            <Form.Item>
              
              <Button onClick={handleForgotPassword} className='btn' size='large'>Send Reset Email</Button>
              
            </Form.Item>
          </Form>
        </Flex>
        <Flex flex={1.5}>
          <img src={loginImage} alt="Register Img" className='auth-img' />
        </Flex>
      </Flex>
    </Card>
  );
};

export default ForgetPassword;
