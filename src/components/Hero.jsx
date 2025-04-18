import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Hero = () => {
  const { isDark } = useTheme();

  return (
    <div className={`hero-section ${isDark ? 'bg-dark text-light' : 'bg-light'}`}>
      <Container>
        <Row className="py-5 align-items-center">
          <Col lg={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="display-4 fw-bold mb-4">Gazelle Masters</h1>
              <p className="lead mb-4">
                Experience chess excellence at its finest. Join the premier chess league
                where masters are made and legends begin their journey.
              </p>
              <div className="d-flex gap-3">
                <Button
                  as={Link}
                  to="/tournaments"
                  variant={isDark ? 'light' : 'primary'}
                  size="lg"
                >
                  View Tournaments
                </Button>
                <Button
                  as={Link}
                  to="/register"
                  variant={isDark ? 'outline-light' : 'outline-primary'}
                  size="lg"
                >
                  Join Now
                </Button>
              </div>
            </motion.div>
          </Col>
          <Col lg={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <img
                src="/images/chess-hero.png"
                alt="Chess Excellence"
                className="img-fluid rounded shadow-lg"
              />
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Hero;