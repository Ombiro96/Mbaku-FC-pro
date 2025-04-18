import React, { useState, useMemo } from 'react';
import { Container, Card, Table, Form, Row, Col, Badge, Button, Modal, Alert } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { fixtures } from '../data/leagueData/fixtures';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const LeagueFixtures = () => {
  const { isDark } = useTheme();
  const [selectedDate, setSelectedDate] = useState('all');
  const [selectedVenue, setSelectedVenue] = useState('all');
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [showCalendar, setShowCalendar] = useState(false);
  const [showMatchDetails, setShowMatchDetails] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list', 'calendar', 'team'

  // Memoized computations
  const { uniqueDates, uniqueVenues, uniqueTeams, teamStats } = useMemo(() => {
    const dates = [...new Set(fixtures.map(f => f.date))];
    const venues = [...new Set(fixtures.map(f => f.venue))];
    const teams = [...new Set(fixtures.flatMap(f =>
      f.sessions.flatMap(s =>
        s.matches.flatMap(m => [m.homeTeam, m.awayTeam])
      )
    ))];

    // Calculate team statistics
    const stats = {};
    teams.forEach(team => {
      stats[team] = {
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        upcomingMatches: []
      };
    });

    fixtures.forEach(fixture => {
      fixture.sessions.forEach(session => {
        session.matches.forEach(match => {
          if (match.result) {
            const [homeScore, awayScore] = match.result.split('-').map(Number);
            stats[match.homeTeam].played++;
            stats[match.awayTeam].played++;

            if (homeScore > awayScore) {
              stats[match.homeTeam].won++;
              stats[match.awayTeam].lost++;
            } else if (homeScore < awayScore) {
              stats[match.homeTeam].lost++;
              stats[match.awayTeam].won++;
            } else {
              stats[match.homeTeam].drawn++;
              stats[match.awayTeam].drawn++;
            }
          } else {
            stats[match.homeTeam].upcomingMatches.push({
              opponent: match.awayTeam,
              date: fixture.date,
              time: session.time
            });
            stats[match.awayTeam].upcomingMatches.push({
              opponent: match.homeTeam,
              date: fixture.date,
              time: session.time
            });
          }
        });
      });
    });

    return { uniqueDates: dates, uniqueVenues: venues, uniqueTeams: teams, teamStats: stats };
  }, []);

  // Filter fixtures based on selected criteria
  const filteredFixtures = useMemo(() => {
    return fixtures.filter(fixture => {
      const dateMatch = selectedDate === 'all' || fixture.date === selectedDate;
      const venueMatch = selectedVenue === 'all' || fixture.venue === selectedVenue;

      if (selectedTeam === 'all') {
        return dateMatch && venueMatch;
      }

      return dateMatch && venueMatch && fixture.sessions.some(session =>
        session.matches.some(match =>
          match.homeTeam === selectedTeam || match.awayTeam === selectedTeam
        )
      );
    });
  }, [selectedDate, selectedVenue, selectedTeam]);

  // Match details modal
  const MatchDetailsModal = ({ match, fixture, session }) => (
    <Modal
      show={showMatchDetails}
      onHide={() => setShowMatchDetails(false)}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Match Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6} className="text-center">
            <h4>{match.homeTeam}</h4>
            <div className="stats-summary">
              <p>Played: {teamStats[match.homeTeam].played}</p>
              <p>Won: {teamStats[match.homeTeam].won}</p>
              <p>Drawn: {teamStats[match.homeTeam].drawn}</p>
              <p>Lost: {teamStats[match.homeTeam].lost}</p>
            </div>
          </Col>
          <Col md={6} className="text-center">
            <h4>{match.awayTeam}</h4>
            <div className="stats-summary">
              <p>Played: {teamStats[match.awayTeam].played}</p>
              <p>Won: {teamStats[match.awayTeam].won}</p>
              <p>Drawn: {teamStats[match.awayTeam].drawn}</p>
              <p>Lost: {teamStats[match.awayTeam].lost}</p>
            </div>
          </Col>
        </Row>
        <hr />
        <div className="match-info">
          <p><strong>Date:</strong> {new Date(fixture.date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> {session.time}hrs</p>
          <p><strong>Venue:</strong> {fixture.venue}</p>
          {match.result && (
            <Alert variant="info">
              Final Score: {match.result}
            </Alert>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );

  return (
    <Container className="py-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>League Fixtures</h2>
          <div className="btn-group">
            <Button
              variant={viewMode === 'list' ? 'primary' : 'outline-primary'}
              onClick={() => setViewMode('list')}
            >
              <i className="bi bi-list-ul"></i> List
            </Button>
            <Button
              variant={viewMode === 'calendar' ? 'primary' : 'outline-primary'}
              onClick={() => setViewMode('calendar')}
            >
              <i className="bi bi-calendar3"></i> Calendar
            </Button>
            <Button
              variant={viewMode === 'team' ? 'primary' : 'outline-primary'}
              onClick={() => setViewMode('team')}
            >
              <i className="bi bi-people"></i> Team View
            </Button>
          </div>
        </div>

        <Row className="mb-4 g-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>
                <i className="bi bi-calendar-event"></i> Date
              </Form.Label>
              <Form.Select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className={isDark ? 'bg-dark text-light' : ''}
              >
                <option value="all">All Dates</option>
                {uniqueDates.map(date => (
                  <option key={date} value={date}>
                    {new Date(date).toLocaleDateString('en-GB', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>
                <i className="bi bi-geo-alt"></i> Venue
              </Form.Label>
              <Form.Select
                value={selectedVenue}
                onChange={(e) => setSelectedVenue(e.target.value)}
                className={isDark ? 'bg-dark text-light' : ''}
              >
                <option value="all">All Venues</option>
                {uniqueVenues.map(venue => (
                  <option key={venue} value={venue}>{venue}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>
                <i className="bi bi-people"></i> Team
              </Form.Label>
              <Form.Select
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                className={isDark ? 'bg-dark text-light' : ''}
              >
                <option value="all">All Teams</option>
                {uniqueTeams.map(team => (
                  <option key={team} value={team}>{team}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <AnimatePresence mode="wait">
          {viewMode === 'list' && (
            filteredFixtures.map(fixture => (
              <motion.div
                key={fixture.date}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className={`mb-4 ${isDark ? 'bg-dark text-light' : ''}`}>
                  <Card.Header className="d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">
                      {new Date(fixture.date).toLocaleDateString('en-GB', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </h4>
                    <Badge bg="primary">{fixture.venue}</Badge>
                  </Card.Header>
                  {fixture.sessions.map(session => (
                    <Card.Body key={session.time} className="p-0">
                      <div className="p-3 border-bottom">
                        <h5 className="mb-0">
                          <i className="bi bi-clock"></i> {session.time}hrs
                        </h5>
                      </div>
                      <Table
                        responsive
                        striped
                        bordered
                        hover
                        className={`mb-0 ${isDark ? 'table-dark' : ''}`}
                      >
                        <thead>
                          <tr>
                            <th className="text-center" style={{width: '5%'}}>#</th>
                            <th style={{width: '35%'}}>Home Team</th>
                            <th className="text-center" style={{width: '20%'}}>Result</th>
                            <th style={{width: '35%'}}>Away Team</th>
                          </tr>
                        </thead>
                        <tbody>
                          {session.matches.map(match => (
                            <tr key={match.matchNumber}>
                              <td className="text-center">{match.matchNumber}</td>
                              <td className={match.homeTeam === selectedTeam ? 'fw-bold' : ''}>
                                {match.homeTeam}
                              </td>
                              <td
                                className="text-center"
                                style={getResultStyle(match.result)}
                              >
                                {match.result || 'Pending'}
                              </td>
                              <td className={match.awayTeam === selectedTeam ? 'fw-bold' : ''}>
                                {match.awayTeam}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Card.Body>
                  ))}
                </Card>
              </motion.div>
            ))
          )}

          {viewMode === 'calendar' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Calendar
                value={selectedDate !== 'all' ? new Date(selectedDate) : null}
                onChange={date => setSelectedDate(date.toISOString().split('T')[0])}
                tileContent={({ date }) => {
                  const dateStr = date.toISOString().split('T')[0];
                  const hasMatches = fixtures.some(f => f.date === dateStr);
                  return hasMatches ? <div className="match-indicator"></div> : null;
                }}
              />
            </motion.div>
          )}

          {viewMode === 'team' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Row>
                {uniqueTeams.map(team => (
                  <Col md={6} lg={4} key={team} className="mb-4">
                    <Card className={isDark ? 'bg-dark text-light' : ''}>
                      <Card.Header>
                        <h5 className="mb-0">{team}</h5>
                      </Card.Header>
                      <Card.Body>
                        <div className="team-stats mb-3">
                          <p>Played: {teamStats[team].played}</p>
                          <p>Won: {teamStats[team].won}</p>
                          <p>Drawn: {teamStats[team].drawn}</p>
                          <p>Lost: {teamStats[team].lost}</p>
                        </div>
                        <h6>Upcoming Matches</h6>
                        <ul className="upcoming-matches">
                          {teamStats[team].upcomingMatches.slice(0, 3).map((match, idx) => (
                            <li key={idx}>
                              vs {match.opponent} - {new Date(match.date).toLocaleDateString()}
                            </li>
                          ))}
                        </ul>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </motion.div>
          )}
        </AnimatePresence>

        {selectedMatch && (
          <MatchDetailsModal
            match={selectedMatch.match}
            fixture={selectedMatch.fixture}
            session={selectedMatch.session}
          />
        )}
      </motion.div>
    </Container>
  );
};

export default LeagueFixtures;