import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import React ,{useState}from 'react';
import { Link} from 'react-router-dom';
// import axios from 'axios';
import { Button, Card, Flex, Form, Input,  Typography } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import loginImage from '../assets/cartoon-t-shirt-drawing-photography-shrimps-png-clipart.jpg'

function Login() {
  const [data, setData] = useState(({
    email: '',
    password: ''
  }))

  const handleLogin = async (e: { preventDefault: () => string; }) => {
    e.preventDefault();
   
  };

  return (
    <Card className='form-container col-12 ' align-items-center >
      <Flex gap="large">
        <Flex vertical flex={1}>
          <Typography.Title level={3}  className='title'>Sign In</Typography.Title>
          <Typography.Text type='secondary' strong className='slogan'>Unlock your account!</Typography.Text>

          <Form layout='vertical' onFinish={handleLogin}>
              
              <FormItem 
                label='Email'
                name='email'
                rules={[{ required: true, message: 'Please input your email!' }
                  ,{
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  }
                ]}
              >
                <Input placeholder='Enter your Email' size='large' value={data.email} onChange={(e)=> setData({...data,email:e.target.value})}></Input>
              </FormItem>
              
              <FormItem 
                label='Password'
                name='password'
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password placeholder='Enter your Password' size='large' value={data.password} onChange={(e)=> setData({...data,password:e.target.value})}></Input.Password>
              </FormItem>
              

                {/* {
                  error && (
                    <Alert description={errorMessage} type="error" showIcon closable className='alert'/>
                  )
                } */}

              <FormItem>
                <Button 
                // type={`${loading} ? '' : primary`} 
                htmlType='submit' size='large' className='btn'>
                  {/* {loading ? 
                  <Spin/> : 'Sign In'} */}
                  
                  </Button>
              </FormItem>
              <FormItem>
                <Link to="/SSABS/user/signup">
                <Button  className='btn' size='large'>Create an Account</Button>
                </Link>
              </FormItem>
          </Form>
        </Flex>
        <Flex flex={1.5}>
          <img src={loginImage} alt="Register Img" className='auth-img'/>
        </Flex>
      </Flex>
    </Card>
  );
}

export default Login;