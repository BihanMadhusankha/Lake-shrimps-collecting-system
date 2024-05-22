import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, Flex, Form, Input, Typography } from 'antd';
import toast from 'react-hot-toast';

const ResetPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleResetPassword = async () => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    if (!token) {
      toast.error('Invalid or expired token');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/SSABS/user/resetPassword', {
        token,
        newPassword,
      });

      if (response.data.status === 'success') {
        toast.success('Password reset successfully');
        navigate('/SSABS/user/login');
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error('Error:', error.response?.data?.error || error.message);
      toast.error('An error occurred. Please try again later.');
    }
  };

  return (
    <Card className='form-container col-12 ' align-items-center >
      <Flex gap="large">
        <Flex vertical flex={1}>
          <Typography.Title level={3} className='title'>Reset Password</Typography.Title>
          <Typography.Text type='secondary' strong className='slogan'>Enter your new password</Typography.Text>

          <Form layout='vertical'>
            <Form.Item
              label='New Password'
              name='password'
              rules={[{ required: true, message: 'Please input your new password!' }]}
            >
              <Input.Password placeholder='Enter your new password' size='large' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </Form.Item>

            <Form.Item>
              <Button onClick={handleResetPassword} type="primary" size='large' className='btn'>Reset Password</Button>
            </Form.Item>
          </Form>
        </Flex>
      </Flex>
    </Card>
  );
};

export default ResetPassword;
