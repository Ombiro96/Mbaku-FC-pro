import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import PageTransition from '../components/PageTransition';

const Champions = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  const champions = [
    {
      year: 2023,
      name: "GM Ben Magana",
      rating: 2450,
      title: "Grandmaster",
      achievements: ["Kenya National Champion", "African Zonal Champion"],
      image: "/champions/magana.jpg"
    },
    // Add more champions
  ];

  return (
    <PageTransition>
      <div className="section-dark">
        <Container className="py-5">
          <motion.h1
            className="text-center mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {t('champions.title')}
          </motion.h1>
          <Row className="g-4">
            {champions.map((champion, index) => (
              <Col key={index} md={6} lg={4}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card className={`h-100 ${isDark ? 'bg-dark text-light' : ''}`}>
                    <Card.Body>
                      <Card.Title className="d-flex justify-content-between">
                        <span>{champion.name}</span>
                        <span className="text-muted">{champion.year}</span>
                      </Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {champion.title} • {champion.rating}
                      </Card.Subtitle>
                      <ul className="list-unstyled mt-3">
                        {champion.achievements.map((achievement, i) => (
                          <li key={i} className="mb-1">
                            ♔ {achievement}
                          </li>
                        ))}
                      </ul>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </PageTransition>
  );
};

export default Champions;