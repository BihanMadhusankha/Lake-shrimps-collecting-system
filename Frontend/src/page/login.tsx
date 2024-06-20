import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, Form, Input, Typography } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import loginImage from '../assets/cartoon-t-shirt-drawing-photography-shrimps-png-clipart.jpg';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';

interface LoginData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [data, setData] = useState<LoginData>({ email: '', password: '' });
  const navigate = useNavigate();
  const { setToken, setUser } = useAuth();

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
        localStorage.setItem('id', response.data.user._id);
        setToken(response.data.accessToken);
        setUser(response.data.user); 
        toast.success('Login successful');

        const role = response.data.user.role;
        if (role === 'admin') {
          navigate('/SSABS/admin/dashboard');
        } else if (role === 'content_creater') {
          navigate('/SSABS/content_creater/dashboard');
        } else if (role === 'vehicale_owner') {
          navigate('/SSABS/vehicale_owner/dashboard');
        } else if (role === 'seler') {
          navigate('/SSABS/seler/dashboard');
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
    <Card className="form-container container" align="center">
      <div className="row">
        <div className="col-md-6">
          <Typography.Title level={3} className="title">Sign In</Typography.Title>
          <Typography.Text type="secondary" strong className="slogan">Unlock your account!</Typography.Text>

          <Form layout="vertical" onSubmitCapture={handleLogin}>
            <FormItem
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'The input is not valid E-mail!' }
              ]}
            >
              <Input
                placeholder="Enter your Email"
                size="large"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </FormItem>

            <FormItem
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
                placeholder="Enter your Password"
                size="large"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </FormItem>

            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="btn"
                block
              >
                Sign In
              </Button>
            </FormItem>
            <FormItem>
              <Link to="/SSABS/user/signup">
                <Button className="btn" size="large" block>Create an Account</Button>
              </Link>
            </FormItem>
            <FormItem>
              <Link to={'/SSABS/user/forgetpassword'}>
                <Button className="btn" size="large" block>Forgot Password</Button>
              </Link>
            </FormItem>
          </Form>
        </div>
        <div className="col-md-6">
          <img src={loginImage} alt="Register Img" className="auth-img" />
        </div>
      </div>
    </Card>
  );
};

export default Login;
