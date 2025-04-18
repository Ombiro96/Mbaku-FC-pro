import React, { useState } from 'react';
import { Container, Table, Form, Nav, Row, Col, Card, Tabs, Tab } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import PageTransition from '../components/PageTransition';
import { leagueData, getTeamStats, getBoardStats } from '../data/leagueData/index';

const League = () => {
  const { isDark } = useTheme();
  const [selectedLeague, setSelectedLeague] = useState('premierLeague');
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [activeTab, setActiveTab] = useState('standings');

  const currentLeagueData = leagueData[selectedLeague];
  const filteredTeams = selectedTeam === 'all'
    ? currentLeagueData.teams
    : currentLeagueData.teams.filter(team => team.id === parseInt(selectedTeam));

  const tableVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <PageTransition>
      <Container className="py-5">
        <motion.h1
          className="text-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          National Chess League
        </motion.h1>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Nav variant="pills" className="mb-4">
            <Nav.Item>
              <Nav.Link
                active={selectedLeague === 'premierLeague'}
                onClick={() => setSelectedLeague('premierLeague')}
              >
                Premier League
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                active={selectedLeague === 'superLeagueA'}
                onClick={() => setSelectedLeague('superLeagueA')}
              >
                Super League A
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                active={selectedLeague === 'superLeagueB'}
                onClick={() => setSelectedLeague('superLeagueB')}
              >
                Super League B
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </motion.div>

        <Form.Group className="mb-4">
          <Form.Label>Filter by Team</Form.Label>
          <Form.Select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
          >
            <option value="all">All Teams</option>
            {currentLeagueData.teams.map(team => (
              <option key={team.id} value={team.id}>{team.name}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-4"
        >
          <Tab eventKey="standings" title="Standings">
            <motion.div
              variants={tableVariants}
              initial="hidden"
              animate="visible"
            >
              <Table striped bordered hover responsive className={isDark ? 'table-dark' : ''}>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Team</th>
                    <th>Rating Avg</th>
                    <th>Match Points</th>
                    <th>Board Points</th>
                    <th>Game Points</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeams.map((team, index) => (
                    <motion.tr
                      key={team.id}
                      variants={rowVariants}
                    >
                      <td>{index + 1}</td>
                      <td>{team.name}</td>
                      <td>{team.ratingAverage}</td>
                      <td>{team.matchPoints}</td>
                      <td>{team.boardPoints}</td>
                      <td>{team.gamePoints}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </Table>
            </motion.div>
          </Tab>

          <Tab eventKey="teamDetails" title="Team Details">
            {filteredTeams.map(team => (
              <Card key={team.id} className={`mb-4 ${isDark ? 'bg-dark text-light' : ''}`}>
                <Card.Header>
                  <h4>{team.name}</h4>
                  <div className="text-muted">
                    Rating Average: {team.ratingAverage} |
                    Match Points: {team.matchPoints} |
                    Board Points: {team.boardPoints}
                  </div>
                </Card.Header>
                <Card.Body>
                  <Table striped bordered hover variant={isDark ? 'dark' : ''}>
                    <thead>
                      <tr>
                        <th>Board</th>
                        <th>Name</th>
                        <th>Rating</th>
                        <th>Title</th>
                        <th>Federation</th>
                        <th>Games</th>
                        <th>Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      {team.roster.map((player, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{player.name}</td>
                          <td>{player.rating || '-'}</td>
                          <td>{player.title || '-'}</td>
                          <td>{player.federation}</td>
                          <td>{player.gamesPlayed}</td>
                          <td>{player.points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            ))}
          </Tab>

          <Tab eventKey="boardPerformances" title="Board Performances">
            <Row className="g-4">
              {[1, 2, 3, 4, 5].map(boardNumber => (
                <Col md={4} key={boardNumber}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: boardNumber * 0.1 }}
                  >
                    <Card className={isDark ? 'bg-dark text-light' : ''}>
                      <Card.Header>Board {boardNumber}</Card.Header>
                      <Card.Body>
                        {currentLeagueData.boardPerformances[`board${boardNumber}`]?.topPerformers.map((player, idx) => (
                          <div key={idx} className="mb-2">
                            <strong>{player.name}</strong>
                            <br />
                            <small>{player.team} ({player.performance})</small>
                          </div>
                        ))}
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </Tab>
        </Tabs>
      </Container>
    </PageTransition>
  );
};

export default League;