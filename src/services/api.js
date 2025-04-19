import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tournament related endpoints
export const tournamentService = {
  getAllTournaments: async () => {
    try {
      const response = await api.get('/tournaments');
      return response.data;
    } catch (error) {
      console.error('Error fetching tournaments:', error);
      throw error;
    }
  },

  getTournamentById: async (id) => {
    try {
      const response = await api.get(`/tournaments/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching tournament ${id}:`, error);
      throw error;
    }
  },

  scrapeTournament: async (tournamentId) => {
    try {
      const response = await api.post('/scrape/tournament', { tournament_id: tournamentId });
      return response.data;
    } catch (error) {
      console.error('Error scraping tournament:', error);
      throw error;
    }
  }
};

// League related endpoints
export const leagueService = {
  getAllTeams: async () => {
    try {
      const response = await api.get('/league/teams');
      return response.data;
    } catch (error) {
      console.error('Error fetching teams:', error);
      throw error;
    }
  },

  getAllRounds: async () => {
    try {
      const response = await api.get('/league/rounds');
      return response.data;
    } catch (error) {
      console.error('Error fetching rounds:', error);
      throw error;
    }
  }
};

// Player related endpoints
export const playerService = {
  getPlayerById: async (id) => {
    try {
      const response = await api.get(`/players/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching player ${id}:`, error);
      throw error;
    }
  },

  searchPlayers: async (query) => {
    try {
      const response = await api.get(`/players/search`, { params: { q: query } });
      return response.data;
    } catch (error) {
      console.error('Error searching players:', error);
      throw error;
    }
  }
};

// Error handler middleware
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.data);
      throw error.response.data;
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.request);
      throw new Error('Network error occurred');
    } else {
      // Something else happened
      console.error('Error:', error.message);
      throw error;
    }
  }
);

export default api;