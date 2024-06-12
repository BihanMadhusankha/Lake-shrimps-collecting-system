import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import AOS from 'aos';
import 'aos/dist/aos.css';
import UserNavigation from '../Navigations/userNav';

const ContactUs: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const onFinish = (values: any) => {
    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
    .then(response => {
      if (response.ok) {
        console.log('Form submitted successfully!');
        // Optionally, reset the form after successful submission
        // form.resetFields();
      } else {
        console.error('Failed to submit form:', response.statusText);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <UserNavigation/>
      <div className="container" data-aos="fade-up">
      <h2>Contact Us</h2>
      <Form
        name="contact-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email address!' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Message"
          name="message"
          rules={[{ required: true, message: 'Please input your message!' }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
    </div>
  );
};

export default ContactUs;
