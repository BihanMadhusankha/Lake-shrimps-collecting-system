import React, { useEffect } from 'react';
import { Row, Col, Card } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import UserNavigation from '../Navigations/userNav';

// Initialize AOS
AOS.init();

const AboutUs: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration
      once: true, // only once animation
    });
  }, []);

  return (
    <div>
      <UserNavigation/>
      <div className="container mt-5" style={{ backgroundColor: '#f9f9f9', padding: '40px', borderRadius: '8px' }}>
      <h1 className="text-center mb-4" style={{ fontWeight: 'bold' }}>About Us</h1>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} data-aos="fade-right">
          <Card title="Our Mission" bordered={false} style={{ backgroundColor: '#fff', border: 'none', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <p style={{ fontSize: '16px' }}>
              At ShrimpHub, our mission is to connect shrimp buyers and sellers seamlessly, ensuring quality, transparency, and efficiency in the market. We strive to support sustainable shrimp farming practices and bring the best products to our customers.
            </p>
          </Card>
        </Col>
        <Col xs={24} md={12} data-aos="fade-left">
          <Card title="Who We Are" bordered={false} style={{ backgroundColor: '#fff', border: 'none', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <p style={{ fontSize: '16px' }}>
              ShrimpHub is a dedicated platform created by a team of seafood enthusiasts and tech professionals. With years of experience in the seafood industry, we understand the unique challenges and opportunities within the shrimp market.
            </p>
          </Card>
        </Col>
        <Col xs={24} md={12} data-aos="fade-right">
          <Card title="Our Values" bordered={false} style={{ backgroundColor: '#fff', border: 'none', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <p style={{ fontSize: '16px' }}>
              - Quality: We ensure the highest standards for all products listed on our platform.
              <br />
              - Transparency: Clear and open communication between buyers and sellers.
              <br />
              - Sustainability: Promoting eco-friendly and responsible shrimp farming practices.
              <br />
              - Customer Satisfaction: Providing exceptional service and support to our users.
            </p>
          </Card>
        </Col>
        {/* <Col xs={24} md={12} data-aos="fade-left">
          <Card title="Contact Us" bordered={false} style={{ backgroundColor: '#fff', border: 'none', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <p style={{ fontSize: '16px' }}>
              Have questions or need support? Reach out to us at:
              <br />
              <strong>Email:</strong> support@shrimphub.com
              <br />
              <strong>Phone:</strong> +1 (800) 123-4567
            </p>
          </Card>
        </Col> */}
      </Row>
    </div>
    </div>
  );
};

export default AboutUs;
