import React from 'react';
import { useParams } from 'react-router-dom';

const TournamentDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Tournament Details</h1>
      <p>Tournament ID: {id}</p>
      {/* Add tournament details here */}
    </div>
  );
};

export default TournamentDetails;