import React from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import PlayerImage from '../components/PlayerImage';
import ChessHeroImage from '../components/ChessHeroImage';
import ScrollReveal from '../components/ScrollReveal';
import PageTransition from '../components/PageTransition';
import { motion } from "framer-motion";

const featuredPlayers = [
  {
    name: "FM David Kamau",
    rating: 2285,
    title: "FIDE Master",
    achievements: "3x Kenya National Champion",
    bio: "Known for his aggressive playing style and tactical brilliance, David has dominated the local chess scene for the past five years.",
    image: "/players/player1.jpg"
  },
  {
    name: "WCM Sarah Wanjiku",
    rating: 2105,
    title: "Woman Candidate Master",
    achievements: "2023 East African Champion",
    bio: "Rising star of Kenyan chess, Sarah has shown exceptional skill in positional play and endgame technique.",
    image: "/players/player2.jpg"
  },
  {
    name: "CM Peter Ochieng",
    rating: 2198,
    title: "Candidate Master",
    achievements: "2022 Rapid Chess Champion",
    bio: "A tactical wizard known for his creative sacrifices and dynamic play style, Peter has inspired many young players.",
    image: "/players/player3.jpg"
  }
];

const Home = () => {
  const { isDark } = useTheme();

  return (
    <PageTransition>
      <div className="section-dark">
        <div className="hero-section py-5">
          <Container>
            <Row className="align-items-center">
              <Col md={6} className="text-md-start text-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h1 className="display-4 fw-bold mb-4">
                    Welcome to Kenya Chess Grand Prix
                  </h1>
                  <p className="lead mb-4">
                    Join the most prestigious chess tournament series in Kenya.
                    Compete against the best players, earn Grand Prix points,
                    and track your progress throughout the season.
                  </p>
                  <div className="d-flex gap-3 justify-content-md-start justify-content-center">
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Button
                        as={Link}
                        to="/tournaments"
                        variant={isDark ? 'light' : 'primary'}
                        size="lg"
                      >
                        View Tournaments
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Button
                        as={Link}
                        to="/register"
                        variant={isDark ? 'outline-light' : 'outline-primary'}
                        size="lg"
                      >
                        Register Now
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              </Col>
              <Col md={6} className="text-center mt-4 mt-md-0">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <ChessHeroImage />
                </motion.div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      <div className="section-light">
        <Container>
          <motion.h2
            className="text-center mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Featured Players
          </motion.h2>
          <Row className="g-4">
            {featuredPlayers.map((player, index) => (
              <Col key={index} md={4}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card
                    className={`h-100 ${isDark ? 'bg-dark text-light' : ''}`}
                    border={isDark ? 'light' : 'dark'}
                  >
                    <div style={{ height: '250px' }}>
                      <PlayerImage name={player.name} title={player.title} />
                    </div>
                    <Card.Body>
                      <Card.Title>{player.name}</Card.Title>
                      <div className="mb-2">
                        <small className="text-muted">
                          {player.title} • Rating: {player.rating}
                        </small>
                      </div>
                      <Card.Text>{player.bio}</Card.Text>
                      <div className="achievements mt-3">
                        <small className="text-success">
                          {player.achievements}
                        </small>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
          <motion.div
            className="text-center mt-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Button
              as={Link}
              to="/standings"
              variant={isDark ? 'outline-light' : 'outline-primary'}
              size="lg"
            >
              View Full Rankings
            </Button>
          </motion.div>
        </Container>
      </div>

      <div className="section-medium">
        <Container>
          <motion.h2
            className="text-center mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Upcoming Tournaments
          </motion.h2>
          <Row className="g-4">
            <Col md={4}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className={isDark ? 'bg-dark text-light' : ''}>
                  <Card.Body>
                    <Card.Title>Nairobi Open</Card.Title>
                    <Card.Text>
                      Join us for the premier chess event in Nairobi.
                      FIDE rated tournament with attractive prizes.
                    </Card.Text>
                    <div className="text-muted mb-3">
                      Date: March 15-17, 2024
                    </div>
                    <Button variant={isDark ? 'light' : 'primary'}>
                      Learn More
                    </Button>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="section-light">
        <Container className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4">Join the Community</h2>
            <p className="lead mb-4">
              Connect with fellow chess players, participate in tournaments,
              and improve your game.
            </p>
            <Button
              as={Link}
              to="/register"
              variant={isDark ? 'outline-dark' : 'primary'}
              size="lg"
            >
              Get Started Today
            </Button>
          </motion.div>
        </Container>
      </div>
    </PageTransition>
  );
};

export default Home;