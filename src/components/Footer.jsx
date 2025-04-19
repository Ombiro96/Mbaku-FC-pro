import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { isDark } = useTheme();

  return (
    <footer className={`footer mt-auto py-4 bg-${isDark ? 'dark' : 'light'}`}>
      <div className="footer-divider"></div>
      <Container>
        <Row>
          <Col md={4}>
            <h5>Gazelle Masters</h5>
            <p className="mb-3">Promoting chess excellence through tracking competitive tournaments and rankings.</p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/tournaments">Tournaments</Link></li>
              <li><Link to="/standings">Standings</Link></li>
              <li><Link to="/register">Register</Link></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact</h5>
            <ul className="list-unstyled">
              <li>Email: bakutarb@gmail.com</li>
              <li>Phone: +254 704156418</li>
              <li>Location: Nairobi, Kenya</li>
            </ul>
          </Col>
        </Row>
        <Row className="mt-3 pt-3 border-top">
          <Col className="text-center">
            <small>&copy; {new Date().getFullYear()} Gazelle Masters. All rights reserved.</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;