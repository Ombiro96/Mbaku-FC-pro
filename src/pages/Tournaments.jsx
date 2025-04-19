import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { tournamentService } from '../services/api';
import { useApi } from '../hooks/useApi';

const Tournaments = () => {
  const {
    data: tournaments,
    loading,
    error,
    execute: fetchTournaments
  } = useApi(tournamentService.getAllTournaments);

  useEffect(() => {
    fetchTournaments();
  }, [fetchTournaments]);

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          Error loading tournaments: {error.message}
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="mb-4">Tournaments</h1>
      <Row>
        {tournaments?.map((tournament) => (
          <Col key={tournament.id} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{tournament.name}</Card.Title>
                <Card.Text>
                  <strong>Date:</strong> {tournament.start_date} - {tournament.end_date}
                  <br />
                  <strong>Location:</strong> {tournament.location}
                  <br />
                  <strong>Rounds:</strong> {tournament.total_rounds}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Tournaments;